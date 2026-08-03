"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { authService } from "@/services/authService";

function backendMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
  }
  return fallback;
}

export function useLinkedAccounts() {
  const queryClient = useQueryClient();

  const linkedAccountsQuery = useQuery({
    queryKey: ["linked-accounts"],
    queryFn: authService.getLinkedAccounts,
    staleTime: 30_000,
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["linked-accounts"] });
  };

  const linkGoogleMutation = useMutation({
    mutationFn: (credential: string) => authService.linkGoogle(credential),
    onSuccess: async () => {
      await refresh();
      toast.success("Google account linked.");
    },
    onError: (error) => {
      toast.error(backendMessage(error, "Couldn't link your Google account."));
    },
  });

  const unlinkGoogleMutation = useMutation({
    mutationFn: () => authService.unlinkGoogle(),
    onSuccess: async () => {
      await refresh();
      toast.success("Google account unlinked.");
    },
    onError: (error) => {
      toast.error(backendMessage(error, "Couldn't unlink your Google account."));
    },
  });

  const setInitialPasswordMutation = useMutation({
    mutationFn: (newPassword: string) => authService.setInitialPassword(newPassword),
    onSuccess: async () => {
      await refresh();
      toast.success("Password saved.");
    },
    onError: (error) => {
      toast.error(backendMessage(error, "Couldn't save your password."));
    },
  });

  return {
    ...linkedAccountsQuery,
    linkGoogleMutation,
    unlinkGoogleMutation,
    setInitialPasswordMutation,
  };
}
