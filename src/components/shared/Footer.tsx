import Link from "next/link";
import { ResearcherLogo } from "@/components/shared/ResearcherLogo";

export function Footer() {
  return (
    <footer className="px-6 py-5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-1 border-t border-border pt-3 text-sm text-muted-foreground sm:flex-row">
        <Link href="/" className="flex items-center -my-3">
          <ResearcherLogo className="h-16 w-auto sm:h-[2.75rem]" />
        </Link>
        <p>&copy; {new Date().getFullYear()} Researcher, Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-foreground">Privacy</Link>
          <Link href="#" className="hover:text-foreground">Terms</Link>
          <Link href="#" className="hover:text-foreground">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
