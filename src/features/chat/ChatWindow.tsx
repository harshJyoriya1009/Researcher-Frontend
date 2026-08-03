"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { EmptyState } from "@/components/shared/EmptyState";
import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatWindowProps {
  messages: ChatMessageType[];
  onRegenerate: (id: string) => void;
  isStreaming: boolean;
}

export function ChatWindow({ messages, onRegenerate, isStreaming }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMessageContent = messages[messages.length - 1]?.content;
  const lastMessageIsStreaming = messages[messages.length - 1]?.isStreaming;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: lastMessageIsStreaming ? "auto" : "smooth",
      block: "end",
    });
  }, [messages.length, lastMessageContent, lastMessageIsStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <EmptyState
          icon={Sparkles}
          title="Start your research"
          description="Ask a question, paste a claim to verify, or request a literature summary. Responses stream in with citations."
          className="max-w-md border-none"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <AnimatePresence initial={false}>
        {messages.map((message, i) => (
          <ChatMessage
            key={message.id}
            message={message}
            onRegenerate={onRegenerate}
            canRegenerate={!isStreaming && i === messages.length - 1}
          />
        ))}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
}
