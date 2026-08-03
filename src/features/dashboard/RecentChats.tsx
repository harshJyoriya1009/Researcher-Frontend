"use client";

import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ChatListSkeleton } from "@/components/shared/LoadingSkeleton";
import { useChats } from "@/hooks/useChats";
import { formatRelativeTime } from "@/lib/format";

export function RecentChats() {
  const { chats, isLoading } = useChats();

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-base font-semibold">Recent chats</h2>
        <Link href="/history" className="text-xs text-primary hover:underline">
          View all
        </Link>
      </div>

      {isLoading && <ChatListSkeleton />}

      {!isLoading && chats.length === 0 && (
        <EmptyState
          icon={MessageSquareText}
          title="No chats yet"
          description="Start a new research chat from the sidebar to see it here."
        />
      )}

      {!isLoading && chats.length > 0 && (
        <div className="space-y-1">
          {chats.slice(0, 5).map((chat) => (
            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-secondary"
            >
              <span className="truncate">{chat.title}</span>
              <span className="flex shrink-0 items-center gap-2">
                <Badge variant="outline" className="text-[10px]">{chat.messageCount} msgs</Badge>
                <span className="text-xs text-muted-foreground">{formatRelativeTime(chat.updatedAt)}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
