"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import { DocumentGridSkeleton } from "@/components/shared/LoadingSkeleton";
import { useDocuments } from "@/hooks/useDocuments";
import { formatBytes, formatRelativeTime } from "@/lib/format";

export function RecentDocuments() {
  const { documents, isLoading } = useDocuments();

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-base font-semibold">Uploaded documents</h2>
        <Link href="/documents" className="text-xs text-primary hover:underline">
          View all
        </Link>
      </div>

      {isLoading && <DocumentGridSkeleton />}

      {!isLoading && documents.length === 0 && (
        <EmptyState
          icon={FileText}
          title="No documents yet"
          description="Upload a PDF, DOCX, or TXT file to ground your research in your own sources."
        />
      )}

      {!isLoading && documents.length > 0 && (
        <div className="space-y-1">
          {documents.slice(0, 5).map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-sm hover:bg-secondary"
            >
              <span className="truncate">{doc.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatBytes(doc.sizeBytes)} · {formatRelativeTime(doc.uploadedAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
