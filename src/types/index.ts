export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  defaultModel?: string;
  createdAt: string;
}

export type ModelId = string;

export interface ModelOption {
  id: ModelId;
  label: string;
  provider: string;
  description: string;
  configured: boolean;
}

export type MessageRole = "user" | "assistant" | "system";

export interface Citation {
  id: string;
  title: string;
  url: string;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  role: MessageRole;
  content: string;
  citations?: Citation[];
  createdAt: string;
  isStreaming?: boolean;
  error?: string;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  model: ModelId;
  messageCount: number;
  pinned?: boolean;
}

export type DocumentStatus = "uploading" | "processing" | "ready" | "error";
export type DocumentType = "pdf" | "docx" | "txt";

export interface ResearchDocument {
  id: string;
  name: string;
  type: DocumentType;
  sizeBytes: number;
  status: DocumentStatus;
  uploadedAt: string;
  pages?: number;
  progress?: number;
}

export interface DashboardStats {
  totalSessions: number;
  totalDocuments: number;
  totalMessages: number;
  sessionsThisWeek: number;
}
