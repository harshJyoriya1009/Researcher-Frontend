"use client";

import { useCallback, useRef } from "react";
import { toast } from "sonner";
import { chatService } from "@/services/chatService";
import { useChatStore } from "@/store/useChatStore";
import type { ChatMessage } from "@/types";

function makeId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useResearchChat(chatId: string) {
  const abortRef = useRef<AbortController | null>(null);
  const {
    messages,
    model,
    selectedDocumentIds,
    isStreaming,
    appendMessage,
    updateMessage,
    removeMessage,
    setStreaming,
  } = useChatStore();

  const streamAssistantReply = useCallback(
    async (userContent: string, documentIds: string[] = selectedDocumentIds) => {
      const assistantId = makeId();
      appendMessage({
        id: assistantId,
        chatId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        isStreaming: true,
      });

      setStreaming(true);
      const controller = new AbortController();
      abortRef.current = controller;

      let accumulated = "";
      try {
        const { citations } = await chatService.streamMessage(
          { chatId, content: userContent, model, documentIds },
          (token) => {
            accumulated += token;
            updateMessage(assistantId, { content: accumulated });
          },
          controller.signal
        );
        updateMessage(assistantId, { isStreaming: false, citations });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          updateMessage(assistantId, {
            isStreaming: false,
            error: "The response was interrupted. Try again.",
          });
          toast.error("Something went wrong while generating a response.");
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [chatId, model, selectedDocumentIds, appendMessage, updateMessage, setStreaming]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;
      appendMessage({
        id: makeId(),
        chatId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      });
      await streamAssistantReply(content, selectedDocumentIds);
    },
    [chatId, isStreaming, appendMessage, selectedDocumentIds, streamAssistantReply]
  );

  const regenerate = useCallback(
    async (assistantMessageId: string) => {
      if (isStreaming) return;
      const index = messages.findIndex((m) => m.id === assistantMessageId);
      if (index <= 0) return;
      const lastUserMessage = [...messages.slice(0, index)]
        .reverse()
        .find((m) => m.role === "user");
      if (!lastUserMessage) return;

      removeMessage(assistantMessageId);
      await streamAssistantReply(lastUserMessage.content);
    },
    [messages, isStreaming, removeMessage, streamAssistantReply]
  );

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return {
    messages: messages as ChatMessage[],
    isStreaming,
    sendMessage,
    regenerate,
    stopStreaming,
  };
}
