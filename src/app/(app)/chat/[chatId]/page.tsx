"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/shared/AppShell";
import { ChatWindow } from "@/features/chat/ChatWindow";
import { DocumentPicker } from "@/features/chat/DocumentPicker";
import { MessageInput } from "@/features/chat/MessageInput";
import { ModelSelector } from "@/features/chat/ModelSelector";
import { useResearchChat } from "@/hooks/useResearchChat";
import { useChatStore } from "@/store/useChatStore";
import { chatService } from "@/services/chatService";

export default function ChatPage() {
  const params = useParams<{ chatId: string }>();
  const chatId = params.chatId;
  const [input, setInput] = useState("");
  const setMessages = useChatStore((s) => s.setMessages);
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);
  const currentChat = useChatStore((s) => s.currentChat);

  const { messages, isStreaming, sendMessage, regenerate, stopStreaming } = useResearchChat(chatId);

  useEffect(() => {
    let cancelled = false;
    chatService
      .getChat(chatId)
      .then(({ chat, messages }) => {
        if (cancelled) return;
        setCurrentChat(chat);
        setMessages(messages);
      })
      .catch(() => {
        // New/unknown chat — start with an empty thread.
      });
    return () => {
      cancelled = true;
    };
  }, [chatId, setCurrentChat, setMessages]);

  const handleSubmit = () => {
    const value = input;
    setInput("");
    sendMessage(value);
  };

  return (
    <AppShell>
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-2.5">
          <h1 className="truncate text-sm font-medium text-muted-foreground">
            {currentChat?.title ?? "New research chat"}
          </h1>
          <div className="flex items-center gap-2">
            <DocumentPicker />
            <ModelSelector />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin [overflow-anchor:none]">
          <ChatWindow messages={messages} onRegenerate={regenerate} isStreaming={isStreaming} />
        </div>

        <MessageInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          isStreaming={isStreaming}
          onStop={stopStreaming}
        />
      </div>
    </AppShell>
  );
}
