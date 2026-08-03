"use client";

import { useState } from "react";
import { Menu, LogOut, Settings, User as UserIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";
import { initials } from "@/lib/format";
import Link from "next/link";

interface NavbarProps {
  onMenuClick?: () => void;
  title?: string;
}

export function Navbar({ onMenuClick, title }: NavbarProps) {
  const user = useUserStore((s) => s.user);
  const { logout } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [resending, setResending] = useState(false);

  const showVerificationBanner = !!user && !user.isVerified && !dismissed;

  const handleResendVerification = async () => {
    if (!user || user.isVerified || resending) return;
    setResending(true);
    try {
      await authService.resendVerification();
      toast.success("Verification email sent.");
    } catch {
      toast.error("Couldn't resend the verification email. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div>
      {showVerificationBanner && (
        <div className="flex items-center justify-between gap-3 border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs text-amber-950 dark:text-amber-50">
          <div className="min-w-0">
            <span className="font-medium">Please verify your email.</span>{" "}
            <button
              type="button"
              onClick={handleResendVerification}
              className="font-medium underline underline-offset-4 hover:opacity-80"
            >
              {resending ? "Resending..." : "Resend link"}
            </button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-amber-950 hover:bg-amber-500/20 hover:text-amber-950 dark:text-amber-50 dark:hover:text-amber-50"
            onClick={() => setDismissed(true)}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-4 w-4" />
          </Button>
          {title && <h1 className="font-display text-base font-semibold">{title}</h1>}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group flex items-center gap-2 rounded-full p-1 outline-none transition-all duration-200 hover:bg-muted/70 hover:shadow-sm hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="h-8 w-8 ring-1 ring-transparent transition-all duration-200 group-hover:ring-border">
                <AvatarFallback>{initials(user?.name ?? "Guest")}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">{user?.name ?? "Guest"}</p>
              <p className="text-xs font-normal text-muted-foreground">{user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
}
