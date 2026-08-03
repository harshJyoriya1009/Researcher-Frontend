"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authService } from "@/services/authService";

type Status = "loading" | "success" | "error";

export function VerifyEmailPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    let cancelled = false;
    authService
      .verifyEmail(token)
      .then(() => {
        if (!cancelled) setStatus("success");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {status === "loading"
          ? "Verifying your account..."
          : status === "success"
            ? "Your email has been verified."
            : "We couldn't verify this link."}
      </p>
      <p className="mt-5 text-center text-sm text-muted-foreground">
        {status === "success"
          ? "You're all set to keep using the app."
          : "Head back to sign in when you're ready."}
      </p>
    </>
  );
}
