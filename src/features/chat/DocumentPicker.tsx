"use client";

import { useMemo } from "react";
import { ChevronDown, FileStack } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDocuments } from "@/hooks/useDocuments";
import { useChatStore } from "@/store/useChatStore";

export function DocumentPicker() {
  const { documents = [] } = useDocuments();
  const selectedDocumentIds = useChatStore((s) => s.selectedDocumentIds);
  const setSelectedDocumentIds = useChatStore((s) => s.setSelectedDocumentIds);

  const readyDocuments = useMemo(
    () => documents.filter((document) => document.status === "ready").sort((a, b) => a.name.localeCompare(b.name)),
    [documents]
  );

  const selectedCount = selectedDocumentIds.length;
  const triggerLabel =
    selectedCount === 0 ? "All documents" : `${selectedCount} document${selectedCount === 1 ? "" : "s"}`;

  const toggleDocument = (documentId: string, checked: boolean) => {
    setSelectedDocumentIds(
      checked
        ? [...selectedDocumentIds, documentId]
        : selectedDocumentIds.filter((id) => id !== documentId)
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          <FileStack className="h-3.5 w-3.5 text-primary" />
          Scope
          <Badge variant="secondary" className="ml-1 h-5 rounded-full px-2 text-[10px] font-medium">
            {triggerLabel}
          </Badge>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          Select one or more ready documents
        </div>
        {readyDocuments.map((document) => (
          <DropdownMenuCheckboxItem
            key={document.id}
            checked={selectedDocumentIds.includes(document.id)}
            onCheckedChange={(checked) => toggleDocument(document.id, Boolean(checked))}
            onSelect={(event) => event.preventDefault()}
            className="flex items-center justify-between gap-2 py-2"
          >
            <span className="min-w-0 truncate text-sm font-medium">{document.name}</span>
          </DropdownMenuCheckboxItem>
        ))}
        {readyDocuments.length === 0 && (
          <p className="px-2 py-2 text-xs text-muted-foreground">No ready documents yet.</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
