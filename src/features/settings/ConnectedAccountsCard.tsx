"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Link2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleSignInButton } from "@/features/auth/GoogleSignInButton";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/features/auth/schemas";
import { useLinkedAccounts } from "@/hooks/useLinkedAccounts";

export function ConnectedAccountsCard() {
  const [unlinkOpen, setUnlinkOpen] = useState(false);
  const { data, isLoading, linkGoogleMutation, unlinkGoogleMutation, setInitialPasswordMutation } =
    useLinkedAccounts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const hasGoogle = (data?.linkedAccounts ?? []).some((account) => account.provider === "google");
  const googleAccount = data?.linkedAccounts.find((account) => account.provider === "google");
  const canUnlink = !!data?.hasPassword;

  const onSetPassword = (values: ResetPasswordFormValues) => {
    setInitialPasswordMutation.mutate(values.newPassword, {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Connected accounts</CardTitle>
          <CardDescription>Manage Google sign-in and your account password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading connected accounts…</p>
          ) : (
            <>
              <div className="space-y-3 rounded-lg border border-border/70 bg-secondary/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">Google</p>
                    <p className="text-xs text-muted-foreground">
                      {hasGoogle ? "Linked to your profile" : "Link Google for easier sign-in"}
                    </p>
                  </div>
                  {hasGoogle ? (
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <Check className="h-4 w-4" />
                      Connected
                    </div>
                  ) : null}
                </div>

                {googleAccount ? (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium">{googleAccount.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Linked {new Date(googleAccount.linkedAt).toLocaleString()}
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setUnlinkOpen(true)} className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Unlink
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <GoogleSignInButton
                      onCredential={(credential) => linkGoogleMutation.mutate(credential)}
                    />
                    <p className="text-xs text-muted-foreground">
                      We will only use Google to authenticate your account.
                    </p>
                  </div>
                )}
              </div>

              {!data?.hasPassword && (
                <div className="space-y-4">
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Set a password</p>
                    <p className="text-xs text-muted-foreground">
                      Add a password so you can unlink Google or sign in without it later.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit(onSetPassword)} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="newPassword">Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        autoComplete="new-password"
                        {...register("newPassword")}
                      />
                      {errors.newPassword && (
                        <p className="text-xs text-destructive">{errors.newPassword.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPassword">Confirm password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="gap-2"
                      loading={setInitialPasswordMutation.isPending}
                    >
                      <Link2 className="h-4 w-4" />
                      Save password
                    </Button>
                  </form>
                </div>
              )}

              {data?.linkedAccounts.length ? (
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Linked accounts
                  </p>
                  <div className="space-y-2">
                    {data.linkedAccounts.map((account) => (
                      <div
                        key={`${account.provider}-${account.email}`}
                        className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2 text-sm"
                      >
                        <div>
                          <p className="font-medium capitalize">{account.provider}</p>
                          <p className="text-xs text-muted-foreground">{account.email}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(account.linkedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={unlinkOpen} onOpenChange={setUnlinkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlink Google?</DialogTitle>
            <DialogDescription>
              You can remove Google sign-in from this account after setting a password.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUnlinkOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                unlinkGoogleMutation.mutate(undefined, {
                  onSuccess: () => setUnlinkOpen(false),
                })
              }
              disabled={!canUnlink}
              loading={unlinkGoogleMutation.isPending}
            >
              Unlink
            </Button>
          </DialogFooter>
          {!canUnlink && (
            <p className="text-xs text-muted-foreground">
              Add a password first, then you can unlink Google sign-in.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
