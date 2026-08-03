"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUploadDocument } from "@/hooks/useDocuments";

const ACCEPTED = [".pdf", ".docx", ".txt"];

export function DocumentUploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, isPending } = useUploadDocument();

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      Array.from(files).forEach((file) => {
        const ext = "." + file.name.split(".").pop()?.toLowerCase();
        if (ACCEPTED.includes(ext)) {
          upload(file);
        }
      });
    },
    [upload]
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-border"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
        <UploadCloud className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">
        Drag and drop files, or{" "}
        <button
          type="button"
          className="text-primary underline underline-offset-2"
          onClick={() => inputRef.current?.click()}
        >
          browse
        </button>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Supports PDF, DOCX, and TXT · up to 25MB each</p>
      {isPending && <p className="mt-2 text-xs text-primary">Uploading…</p>}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
