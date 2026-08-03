import Link from "next/link";
import { ResearcherLogo } from "@/components/shared/ResearcherLogo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center"
        >
          <ResearcherLogo className="h-12 w-auto sm:h-[3.75rem]" />
        </Link>
        {children}
      </div>
    </div>
  );
}
