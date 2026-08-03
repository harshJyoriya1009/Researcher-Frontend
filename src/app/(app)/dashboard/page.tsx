import { AppShell } from "@/components/shared/AppShell";
import { StatsCards } from "@/features/dashboard/StatsCards";
import { RecentChats } from "@/features/dashboard/RecentChats";
import { RecentDocuments } from "@/features/dashboard/RecentDocuments";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <div className="mx-auto max-w-5xl space-y-6 p-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening across your research sessions.
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentChats />
          <RecentDocuments />
        </div>
      </div>
    </AppShell>
  );
}
