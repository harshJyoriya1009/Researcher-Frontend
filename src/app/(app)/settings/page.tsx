"use client";

import { LogOut, Moon, Sun } from "lucide-react";
import { AppShell } from "@/components/shared/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useThemeStore } from "@/store/useThemeStore";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "@/hooks/useAuth";
import { useModels, useUpdateModel } from "@/hooks/useModels";
import { ConnectedAccountsCard } from "@/features/settings/ConnectedAccountsCard";
import { initials } from "@/lib/format";

export default function SettingsPage() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const user = useUserStore((s) => s.user);
  const { logout } = useAuth();

  const { data, isLoading } = useModels();
  const updateModel = useUpdateModel();

  return (
    <AppShell title="Settings">
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your account and preferences.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account details.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{initials(user?.name ?? "Guest")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name ?? "Guest"}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Choose how Researcher looks on this device.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">Dark mode</span>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>

        <ConnectedAccountsCard />

        <Card>
          <CardHeader>
            <CardTitle>Model</CardTitle>
            <CardDescription>Default model used for new research chats.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={data?.currentModel ?? ""}
              disabled={isLoading}
              onValueChange={(v) => updateModel.mutate(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder={isLoading ? "Loading…" : "Select a model"} />
              </SelectTrigger>
              <SelectContent>
                {(data?.models ?? []).map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.label}
                    {!m.configured ? " — no API key set" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session</CardTitle>
            <CardDescription>Sign out of your account on this device.</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            <Button variant="destructive" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
