"use client";

import { motion } from "framer-motion";
import { File, FileText, Loader2, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBytes, formatRelativeTime } from "@/lib/format";
import type { ResearchDocument } from "@/types";
import { cn } from "@/lib/utils";

const typeStyles: Record<ResearchDocument["type"], { label: string; className: string }> = {
  pdf: { label: "PDF", className: "bg-destructive/15 text-destructive" },
  docx: { label: "DOCX", className: "bg-accent/15 text-accent" },
  txt: { label: "TXT", className: "bg-success/15 text-success" },
};

const statusStyles: Record<ResearchDocument["status"], { label: string; variant: "success" | "secondary" | "destructive" }> = {
  ready: { label: "Ready", variant: "success" },
  processing: { label: "Processing", variant: "secondary" },
  uploading: { label: "Uploading", variant: "secondary" },
  error: { label: "Failed", variant: "destructive" },
};

interface DocumentCardProps {
  document: ResearchDocument;
  onDelete?: (id: string) => void;
}

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const type = typeStyles[document.type];
  const status = statusStyles[document.status];

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="group flex flex-col gap-3 p-4 transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", type.className)}>
            {document.type === "txt" ? <FileText className="h-5 w-5" /> : <File className="h-5 w-5" />}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onDelete?.(document.id)}
          >
            <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
          </Button>
        </div>

        <div>
          <p className="truncate text-sm font-medium text-foreground" title={document.name}>
            {document.name}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatBytes(document.sizeBytes)}
            {document.pages ? ` · ${document.pages} pages` : ""} · {formatRelativeTime(document.uploadedAt)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-[10px]">{type.label}</Badge>
          {document.status === "uploading" || document.status === "processing" ? (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              {document.status === "uploading" && document.progress != null
                ? `${document.progress}%`
                : status.label}
            </span>
          ) : (
            <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
