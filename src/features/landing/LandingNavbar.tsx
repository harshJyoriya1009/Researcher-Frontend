import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResearcherLogo } from "@/components/shared/ResearcherLogo";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center -my-1">
          <ResearcherLogo className="h-12 w-auto sm:h-[3.25rem]" />
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
