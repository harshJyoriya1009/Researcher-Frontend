"use client";

import { AppShell } from "@/components/shared/AppShell";
import { DocumentUploadZone } from "@/features/documents/DocumentUploadZone";
import { DocumentCard } from "@/features/documents/DocumentCard";
import { DocumentGridSkeleton } from "@/components/shared/LoadingSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteDocument, useDocuments } from "@/hooks/useDocuments";

export default function DocumentsPage() {
  const { documents, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useDocuments();
  const deleteDocument = useDeleteDocument();

  return (
    <AppShell title="Documents">
      <div className="mx-auto max-w-5xl space-y-6 p-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload source material for the assistant to reference during research chats.
          </p>
        </div>

        <DocumentUploadZone />

        {isLoading && <DocumentGridSkeleton />}

        {!isLoading && documents.length === 0 && (
          <EmptyState
            icon={FileText}
            title="Nothing uploaded yet"
            description="Add a PDF, DOCX, or TXT file above to get started."
          />
        )}

        {!isLoading && documents.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onDelete={(id) => deleteDocument.mutate(id)}
                />
              ))}
            </div>
            {hasNextPage && (
              <div className="flex justify-center">
                <Button variant="outline" onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
                  Load more
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
