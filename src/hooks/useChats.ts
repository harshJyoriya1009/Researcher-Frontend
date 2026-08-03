"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { chatService } from "@/services/chatService";
import { useUserStore } from "@/store/useUserStore";
import type { ModelId } from "@/types";

export function useChats() {
  const userId = useUserStore((s) => s.user?.id);
  const query = useInfiniteQuery({
    queryKey: ["chats", userId],
    queryFn: ({ pageParam = 1 }) => chatService.listChats({ page: pageParam, pageSize: 20 }),
    enabled: !!userId,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.has_more ? lastPage.page + 1 : undefined),
  });
  return {
    ...query,
    chats: query.data?.pages.flatMap((page) => page.items) ?? [],
    totalChats: query.data?.pages[0]?.total ?? 0,
  };
}

export function useCreateChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (model?: ModelId) => chatService.createChat({ model }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function useRenameChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ chatId, title }: { chatId: string; title: string }) =>
      chatService.renameChat(chatId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Chat renamed.");
    },
  });
}

export function useDeleteChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatId: string) => chatService.deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Chat deleted.");
    },
  });
}
