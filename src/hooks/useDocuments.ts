"use client";

import { useCallback, useEffect } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { documentService } from "@/services/documentService";
import { useDocumentStore } from "@/store/useDocumentStore";
import { useUserStore } from "@/store/useUserStore";
import type { ResearchDocument } from "@/types";

export function useDocuments() {
  const userId = useUserStore((s) => s.user?.id);
  const setDocuments = useDocumentStore((s) => s.setDocuments);
  const documents = useDocumentStore((s) => s.documents);

  const query = useInfiniteQuery({
    queryKey: ["documents", userId],
    queryFn: ({ pageParam = 1 }) => documentService.list({ page: pageParam, pageSize: 20 }),
    enabled: !!userId,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.has_more ? lastPage.page + 1 : undefined),
    // Documents process in the background server-side (parse -> chunk ->
    // embed -> index); poll while anything is still uploading/processing.
    refetchInterval: (q) =>
      q.state.data?.pages
        .flatMap((page) => page.items)
        .some((d) => d.status === "uploading" || d.status === "processing")
        ? 3000
        : false,
  });

  useEffect(() => {
    if (query.data) setDocuments(query.data.pages.flatMap((page) => page.items));
  }, [query.data, setDocuments]);

  return {
    ...query,
    documents: query.data ? documents : [],
    totalDocuments: query.data?.pages[0]?.total ?? 0,
  };
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  const addDocument = useDocumentStore((s) => s.addDocument);
  const updateDocument = useDocumentStore((s) => s.updateDocument);

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const tempId = `temp_${crypto.randomUUID()}`;
      const placeholder: ResearchDocument = {
        id: tempId,
        name: file.name,
        type: file.name.endsWith(".docx") ? "docx" : file.name.endsWith(".txt") ? "txt" : "pdf",
        sizeBytes: file.size,
        status: "uploading",
        uploadedAt: new Date().toISOString(),
        progress: 0,
      };
      addDocument(placeholder);

      const result = await documentService.upload(file, (percent) => {
        updateDocument(tempId, { progress: percent });
      });

      updateDocument(tempId, result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document uploaded — indexing in the background.");
    },
    onError: (error) => {
      const responseData = error instanceof AxiosError ? error.response?.data : undefined;
      const message =
        typeof responseData?.message === "string"
          ? responseData.message
          : typeof responseData?.error === "string" && typeof responseData?.detail === "string"
            ? responseData.detail
            : typeof responseData?.detail === "string"
              ? responseData.detail
              : typeof responseData === "string"
                ? responseData
                : "Upload failed. Please try again.";
      toast.error(message);
    },
  });

  const upload = useCallback((file: File) => mutation.mutate(file), [mutation]);
  return { ...mutation, upload };
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  const removeDocument = useDocumentStore((s) => s.removeDocument);

  return useMutation({
    mutationFn: (documentId: string) => documentService.remove(documentId),
    onSuccess: (_, documentId) => {
      removeDocument(documentId);
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document removed.");
    },
  });
}
