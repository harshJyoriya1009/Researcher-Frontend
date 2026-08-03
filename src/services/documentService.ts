import { apiClient } from "./apiClient";
import { mapDocument, type ApiDocument } from "@/lib/apiMappers";
import type { ResearchDocument } from "@/types";
import type { PaginatedApiResponse } from "./chatService";

export const documentService = {
  async list(params: { page: number; pageSize: number }): Promise<PaginatedApiResponse<ResearchDocument>> {
    const { data } = await apiClient.get<PaginatedApiResponse<ApiDocument>>("/documents", {
      params: { page: params.page, page_size: params.pageSize },
    });
    return {
      ...data,
      items: data.items.map(mapDocument),
    };
  },

  async upload(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<ResearchDocument> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await apiClient.post<ApiDocument>("/documents/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total));
        }
      },
    });
    return mapDocument(data);
  },

  async remove(documentId: string): Promise<void> {
    await apiClient.delete(`/documents/${documentId}`);
  },
};
