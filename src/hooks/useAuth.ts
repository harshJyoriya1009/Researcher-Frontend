"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService, type LoginPayload, type RegisterPayload } from "@/services/authService";
import { useChatStore } from "@/store/useChatStore";
import { useDocumentStore } from "@/store/useDocumentStore";
import { useUserStore } from "@/store/useUserStore";

function backendMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
  }
  return fallback;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useUserStore((s) => s.setUser);
  const clearSession = useUserStore((s) => s.clearSession);
  const user = useUserStore((s) => s.user);
  const resetChat = useChatStore((s) => s.reset);
  const resetDocuments = useDocumentStore((s) => s.reset);

  const switchSession = (nextUser: Parameters<typeof setUser>[0]) => {
    queryClient.clear();
    resetChat();
    resetDocuments();
    setUser(nextUser);
  };

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      switchSession(data.user);
      toast.success(`Welcome back, ${data.user.name.split(" ")[0]}`);
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(backendMessage(error, "Couldn't sign you in. Check your email and password."));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      switchSession(data.user);
      toast.success("Account created — welcome aboard.");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(backendMessage(error, "Couldn't create your account. Please try again."));
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: (credential: string) => authService.loginWithGoogle(credential),
    onSuccess: (data) => {
      switchSession(data.user);
      toast.success(`Welcome back, ${data.user.name.split(" ")[0]}`);
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(backendMessage(error, "Google sign-in failed. Please try again."));
    },
  });

  const logout = async () => {
    await authService.logout();
    queryClient.clear();
    resetChat();
    resetDocuments();
    clearSession();
    toast.success("Signed out.");
    router.push("/login");
  };

  return { user, loginMutation, registerMutation, googleLoginMutation, logout };
}
