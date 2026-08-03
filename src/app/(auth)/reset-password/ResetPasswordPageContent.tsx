"use client";

import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "@/features/auth/ResetPasswordForm";

export function ResetPasswordPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  return token ? (
    <ResetPasswordForm token={token} />
  ) : (
    <p className="text-sm text-muted-foreground">This reset link is missing a token.</p>
  );
}
