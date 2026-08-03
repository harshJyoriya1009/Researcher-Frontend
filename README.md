# Researcher — AI Research Assistant

A modern, ChatGPT/Perplexity-style AI research assistant frontend built with Next.js 15 (App Router) and TypeScript.

## Stack

- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**-style components (hand-rolled on Radix primitives)
- **Zustand** for client state
- **TanStack Query** for server state / caching
- **Axios** for HTTP
- **React Hook Form + Zod** for forms and validation
- **React Markdown** (+ remark-gfm, rehype-highlight) for chat rendering
- **Framer Motion** for animation
- **Lucide** for icons

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The app ships with mock API routes under `src/app/api/**`
so every page — auth, chat streaming, document upload, dashboard stats — works out of the
box with no external backend. Swap `NEXT_PUBLIC_API_URL` and the `services/*` files to
point at a real backend when you're ready.

## Structure

```
src/
  app/            # Routes (App Router) + mock API route handlers
    (auth)/       # /login, /register
    (app)/        # /dashboard, /chat/[chatId], /documents, /history, /settings
    api/          # Mock backend (auth, chats, documents, research)
  components/
    ui/           # shadcn-style primitives (Button, Dialog, Input, ...)
    shared/       # App-wide composites (Navbar, Sidebar, AppShell, EmptyState, ...)
  features/       # Feature-scoped UI (auth forms, chat, documents, dashboard, landing, history)
  hooks/          # Custom hooks (useAuth, useResearchChat, useChats, useDocuments)
  services/       # Axios-based API layer (authService, chatService, documentService, researchService)
  store/          # Zustand stores (user, theme, chat, documents)
  types/          # Shared TypeScript types
  lib/            # utils, formatting helpers, mock data
```

## Notes

- Streaming chat uses a Fetch + `ReadableStream` (SSE-style) against
  `/api/chats/[chatId]/messages`, so `sendMessage`/`regenerate` in `useResearchChat`
  render tokens as they arrive.
- Auth state and theme are persisted to `localStorage` via Zustand's `persist` middleware.
- Dark mode is the default theme; toggle it from Settings.
- Login/Register accept any values that pass validation — the mock API always succeeds.
# Researcher-Frontend
