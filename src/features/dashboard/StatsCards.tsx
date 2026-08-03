"use client";

import { motion } from "framer-motion";
import { FileStack, MessagesSquare, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatsCardsSkeleton } from "@/components/shared/LoadingSkeleton";
import { useChats } from "@/hooks/useChats";
import { useDocuments } from "@/hooks/useDocuments";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function StatsCards() {
  const { chats, totalChats, isLoading: chatsLoading } = useChats();
  const { documents, totalDocuments, isLoading: docsLoading } = useDocuments();

  if (chatsLoading || docsLoading) return <StatsCardsSkeleton />;

  const totalSessions = totalChats || chats.length;
  const totalMessages = chats.reduce((sum, c) => sum + c.messageCount, 0);
  const sessionsThisWeek =
    chats.filter((c) => Date.now() - new Date(c.createdAt).getTime() < ONE_WEEK_MS).length;

  const items = [
    { label: "Research sessions", value: totalSessions, icon: Sparkles, hint: `+${sessionsThisWeek} this week` },
    {
      label: "Documents uploaded",
      value: totalDocuments || documents.length,
      icon: FileStack,
      hint: "across all sessions",
    },
    { label: "Messages exchanged", value: totalMessages, icon: MessagesSquare, hint: "all time" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
        >
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 font-display text-3xl font-semibold">{item.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
