import type { Chat, ChatMessage, Citation, ResearchDocument, User } from "@/types";

// --- Backend DTO shapes (as returned by the FastAPI service) -------------

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  default_model: string;
  created_at: string;
  updated_at: string;
}

export interface ApiCitation {
  id: string;
  title: string;
  url: string;
  snippet?: string | null;
}

export interface ApiSession {
  id: string;
  title: string;
  model: string;
  pinned: boolean;
  message_count: number;
  created_at: string;
  updated_at: string;
}

export interface ApiMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  citations?: ApiCitation[] | null;
  error?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiDocument {
  id: string;
  name: string;
  type: "pdf" | "docx" | "txt";
  status: "uploading" | "processing" | "ready" | "error";
  size_bytes: number;
  page_count?: number | null;
  chunk_count?: number | null;
  error_message?: string | null;
  created_at: string;
  updated_at: string;
}

// --- Mappers ---------------------------------------------------------------

export function mapUser(u: ApiUser): User {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    isVerified: u.is_verified,
    defaultModel: u.default_model,
    createdAt: u.created_at,
  };
}

export function mapCitation(c: ApiCitation): Citation {
  return { id: c.id, title: c.title, url: c.url, snippet: c.snippet ?? undefined };
}

export function mapSession(s: ApiSession): Chat {
  return {
    id: s.id,
    title: s.title,
    createdAt: s.created_at,
    updatedAt: s.updated_at,
    model: s.model,
    messageCount: s.message_count,
    pinned: s.pinned,
  };
}

export function mapMessage(m: ApiMessage): ChatMessage {
  return {
    id: m.id,
    chatId: m.session_id,
    role: m.role,
    content: m.content,
    citations: m.citations?.map(mapCitation),
    createdAt: m.created_at,
    error: m.error ?? undefined,
  };
}

export function mapDocument(d: ApiDocument): ResearchDocument {
  return {
    id: d.id,
    name: d.name,
    type: d.type,
    sizeBytes: d.size_bytes,
    status: d.status,
    uploadedAt: d.created_at,
    pages: d.page_count ?? undefined,
    errorMessage: d.error_message ?? undefined,
  };
}
