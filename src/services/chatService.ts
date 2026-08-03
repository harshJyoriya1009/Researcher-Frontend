import { API_BASE_URL, apiClient, getStoredToken } from "./apiClient";
import { mapMessage, mapSession, type ApiMessage, type ApiSession } from "@/lib/apiMappers";
import type { Chat, ChatMessage, Citation, ModelId } from "@/types";

export interface PaginatedApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

export interface CreateChatPayload {
  title?: string;
  model?: ModelId;
}

export interface SendMessagePayload {
  chatId: string;
  content: string;
  model?: ModelId;
  documentIds?: string[];
}

export const chatService = {
  async listChats(params: { page: number; pageSize: number }): Promise<PaginatedApiResponse<Chat>> {
    const { data } = await apiClient.get<PaginatedApiResponse<ApiSession>>("/research/history", {
      params: { page: params.page, page_size: params.pageSize },
    });
    return {
      ...data,
      items: data.items.map(mapSession),
    };
  },

  async getChat(chatId: string): Promise<{ chat: Chat; messages: ChatMessage[] }> {
    const { data } = await apiClient.get<{ session: ApiSession; messages: ApiMessage[] }>(
      `/research/session/${chatId}`
    );
    return { chat: mapSession(data.session), messages: data.messages.map(mapMessage) };
  },

  async createChat(payload: CreateChatPayload): Promise<Chat> {
    const { data } = await apiClient.post<ApiSession>("/research/session", {
      title: payload.title,
      model: payload.model || undefined,
    });
    return mapSession(data);
  },

  async renameChat(chatId: string, title: string): Promise<Chat> {
    const { data } = await apiClient.patch<ApiSession>(`/research/session/${chatId}`, { title });
    return mapSession(data);
  },

  async deleteChat(chatId: string): Promise<void> {
    await apiClient.delete(`/research/session/${chatId}`);
  },

  /**
   * Streams an assistant response token-by-token from the FastAPI backend's
   * `/research/chat` SSE endpoint (planner -> retriever -> generator ->
   * guardrail -> evaluator, run server-side).
   */
  async streamMessage(
    payload: SendMessagePayload,
    onToken: (token: string) => void,
    signal?: AbortSignal
  ): Promise<{ citations: Citation[] }> {
    const token = getStoredToken("ara-access-token");

    const res = await fetch(`${API_BASE_URL}/research/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        session_id: payload.chatId,
        content: payload.content,
        model: payload.model || undefined,
        document_ids: payload.documentIds && payload.documentIds.length ? payload.documentIds : undefined,
      }),
      signal,
    });

    if (!res.ok || !res.body) {
      throw new Error("Failed to reach the research assistant.");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let citations: Citation[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const raw = line.replace(/^data:\s*/, "");
        if (raw === "[DONE]") continue;
        try {
          const parsed = JSON.parse(raw);
          if (parsed.token) onToken(parsed.token);
          if (parsed.citations) citations = parsed.citations;
        } catch {
          // ignore malformed chunk
        }
      }
    }

    return { citations };
  },
};
