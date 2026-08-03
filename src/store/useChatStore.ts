import { create } from "zustand";
import type { Chat, ChatMessage, ModelId } from "@/types";

interface ChatState {
  currentChat: Chat | null;
  messages: ChatMessage[];
  model: ModelId;
  selectedDocumentIds: string[];
  isStreaming: boolean;
  setCurrentChat: (chat: Chat | null) => void;
  setMessages: (messages: ChatMessage[]) => void;
  appendMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, patch: Partial<ChatMessage>) => void;
  removeMessage: (id: string) => void;
  setModel: (model: ModelId) => void;
  setSelectedDocumentIds: (ids: string[]) => void;
  setStreaming: (streaming: boolean) => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  currentChat: null,
  messages: [],
  model: "",
  selectedDocumentIds: [],
  isStreaming: false,
  setCurrentChat: (chat) => set({ currentChat: chat }),
  setMessages: (messages) => set({ messages }),
  appendMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateMessage: (id, patch) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    })),
  removeMessage: (id) =>
    set((state) => ({ messages: state.messages.filter((m) => m.id !== id) })),
  setModel: (model) => set({ model }),
  setSelectedDocumentIds: (selectedDocumentIds) => set({ selectedDocumentIds }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  reset: () =>
    set({ currentChat: null, messages: [], selectedDocumentIds: [], isStreaming: false }),
}));
