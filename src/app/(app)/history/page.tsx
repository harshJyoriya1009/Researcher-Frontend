"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { History, MoreHorizontal, Pencil, Search, Trash2 } from "lucide-react";
import { AppShell } from "@/components/shared/AppShell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/shared/EmptyState";
import { ChatListSkeleton } from "@/components/shared/LoadingSkeleton";
import { useChats, useDeleteChat } from "@/hooks/useChats";
import { RenameChatDialog } from "@/features/history/RenameChatDialog";
import { formatRelativeTime } from "@/lib/format";
import type { Chat } from "@/types";

export default function HistoryPage() {
  const { chats, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useChats();
  const deleteChat = useDeleteChat();
  const [search, setSearch] = useState("");
  const [renameTarget, setRenameTarget] = useState<Chat | null>(null);

  const filtered = useMemo(() => {
    return chats.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));
  }, [chats, search]);

  return (
    <AppShell title="History">
      <div className="mx-auto max-w-3xl space-y-6 p-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Chat history</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse, rename, or remove previous research conversations.
          </p>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {isLoading && <ChatListSkeleton />}

        {!isLoading && filtered.length === 0 && (
          <EmptyState
            icon={History}
            title={search ? "No matches" : "No conversations yet"}
            description={
              search
                ? "Try a different search term."
                : "Chats you start will show up here for easy access later."
            }
          />
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="space-y-3">
            <div className="divide-y divide-border rounded-xl border border-border">
              {filtered.map((chat) => (
                <div key={chat.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <Link href={`/chat/${chat.id}`} className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{chat.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatRelativeTime(chat.updatedAt)} · {chat.messageCount} messages
                    </p>
                  </Link>
                  <Badge variant="secondary" className="hidden shrink-0 sm:inline-flex">
                    {chat.model}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setRenameTarget(chat)} className="gap-2">
                        <Pencil className="h-3.5 w-3.5" /> Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteChat.mutate(chat.id)}
                        className="gap-2 text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
            {hasNextPage && (
              <div className="flex justify-center">
                <Button variant="outline" onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
                  Load more
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <RenameChatDialog chat={renameTarget} onOpenChange={(open) => !open && setRenameTarget(null)} />
    </AppShell>
  );
}
