import { create } from "zustand";
import type { ResearchDocument } from "@/types";

interface DocumentState {
  documents: ResearchDocument[];
  setDocuments: (documents: ResearchDocument[]) => void;
  addDocument: (document: ResearchDocument) => void;
  updateDocument: (id: string, patch: Partial<ResearchDocument>) => void;
  removeDocument: (id: string) => void;
  reset: () => void;
}

function upsertById(documents: ResearchDocument[], document: ResearchDocument): ResearchDocument[] {
  const index = documents.findIndex((item) => item.id === document.id);
  if (index === -1) {
    return [document, ...documents];
  }
  const next = [...documents];
  next[index] = document;
  return next;
}

export const useDocumentStore = create<DocumentState>()((set) => ({
  documents: [],
  setDocuments: (documents) => set({ documents: Array.from(new Map(documents.map((d) => [d.id, d])).values()) }),
  addDocument: (document) =>
    set((state) => ({ documents: upsertById(state.documents, document) })),
  updateDocument: (id, patch) =>
    set((state) => ({
      documents: state.documents.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    })),
  removeDocument: (id) =>
    set((state) => ({ documents: state.documents.filter((d) => d.id !== id) })),
  reset: () => set({ documents: [] }),
}));
