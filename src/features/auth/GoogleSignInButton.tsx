"use client";

import { GoogleLogin } from "@react-oauth/google";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GoogleSignInButtonProps {
  onCredential: (credential: string) => void;
}

export function GoogleSignInButton({ onCredential }: GoogleSignInButtonProps) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    return (
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-4 w-4 text-amber-600" />
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Google sign-in is not configured</p>
            <p className="text-xs text-muted-foreground">
              Add the same Google Client ID to `server/.env` and `client/.env.local`, then restart
              both apps.
            </p>
            <p className="text-xs text-muted-foreground">
              Required vars: `GOOGLE_CLIENT_ID` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
            </p>
            <Button type="button" variant="outline" className="mt-2 w-full" disabled>
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(response) => {
          if (response.credential) {
            onCredential(response.credential);
          }
        }}
        onError={() => {
          // The mutation layer handles the actual auth error toast.
        }}
        theme="outline"
        size="large"
        shape="rectangular"
      />
    </div>
  );
}
