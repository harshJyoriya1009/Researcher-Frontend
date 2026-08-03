"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRenameChat } from "@/hooks/useChats";
import type { Chat } from "@/types";

interface RenameChatDialogProps {
  chat: Chat | null;
  onOpenChange: (open: boolean) => void;
}

export function RenameChatDialog({ chat, onOpenChange }: RenameChatDialogProps) {
  const [title, setTitle] = useState("");
  const renameChat = useRenameChat();

  useEffect(() => {
    if (chat) setTitle(chat.title);
  }, [chat]);

  const handleSubmit = () => {
    if (!chat || !title.trim()) return;
    renameChat.mutate(
      { chatId: chat.id, title: title.trim() },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <Dialog open={!!chat} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename chat</DialogTitle>
        </DialogHeader>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={renameChat.isPending}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
