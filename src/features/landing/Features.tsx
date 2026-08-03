"use client";

import { motion } from "framer-motion";
import { BookOpenCheck, FileSearch, MessagesSquare, RefreshCw, ShieldCheck, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: MessagesSquare,
    title: "Streaming, sourced answers",
    description: "Watch responses generate token by token, with citations attached to the claims they support.",
  },
  {
    icon: FileSearch,
    title: "Document-aware chat",
    description: "Upload PDFs, DOCX, or TXT files and ask questions grounded in what you've read.",
  },
  {
    icon: BookOpenCheck,
    title: "Markdown & code rendering",
    description: "Tables, math-adjacent notation, and syntax-highlighted code blocks render cleanly in every reply.",
  },
  {
    icon: RefreshCw,
    title: "Regenerate & branch",
    description: "Not quite right? Regenerate any answer, or edit your question and follow a new thread.",
  },
  {
    icon: Zap,
    title: "Model switching",
    description: "Pick a fast model for quick lookups or a deep-reasoning model for multi-step problems.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    description: "Your documents and conversations are scoped to your account and never used to train shared models.",
  },
];

export function Features() {
  return (
    <section className="border-b border-border py-20 overflow-x-clip">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Built for the way research actually happens
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every feature exists to shorten the distance between a question and a well-sourced answer.
          </p>
        </div>
      </div>

      <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-x-clip">
        <div className="group flex overflow-hidden px-6 py-2 [--gap:1rem] [--duration:90s] [gap:var(--gap)]">
          <div className="flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
            <div className="flex shrink-0 px-[calc(var(--gap)/2)] [gap:var(--gap)]">
              {features.map((f, i) => (
                <motion.div
                  key={`first-${f.title}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                >
                  <Card className="h-full w-[280px] p-5 sm:w-[320px] lg:w-[360px]">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <f.icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-display text-base font-semibold">{f.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{f.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex shrink-0 px-[calc(var(--gap)/2)] [gap:var(--gap)]" aria-hidden="true">
              {features.map((f, i) => (
                <motion.div
                  key={`second-${f.title}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                >
                  <Card className="h-full w-[280px] p-5 sm:w-[320px] lg:w-[360px]">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <f.icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-display text-base font-semibold">{f.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{f.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
