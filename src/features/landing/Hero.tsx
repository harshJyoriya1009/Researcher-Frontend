"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/splite";

const marginNotes = [
  { label: "01", text: "cites primary sources inline" },
  { label: "02", text: "streams reasoning as it thinks" },
  { label: "03", text: "reads your PDFs, not just the web" },
];

const heroScene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function Hero() {
  return (
   <section className="relative isolate overflow-hidden border-b border-border px-6 pb-20 pt-0 sm:pt-0">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_55%)]" />

      <div className="absolute inset-x-0 top-8 -z-10 flex justify-center">
        <div className="h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_65%)] blur-3xl sm:h-[520px] sm:w-[520px]" />
      </div>

      <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center opacity-90">
        <motion.div className="h-[420px] w-[420px] will-change-transform sm:h-[560px] sm:w-[560px] lg:h-[640px] lg:w-[640px]">
          <SplineScene scene={heroScene} className="h-full w-full scale-110" />
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative z-10 max-w-2xl pt-12 text-center sm:pt-16 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            Now streaming reasoning in real time
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl"
          >
            Research that shows
            <br />
            <span className="text-primary">its work.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0"
          >
            Researcher reads your papers, drafts, and the open web, then answers in
            plain language with the sources cited right in the margin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Button size="lg" asChild className="gap-2">
              <Link href="/register">
                Start researching free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </motion.div>
        </div>

        <div className="relative z-10 flex min-h-[360px] items-center justify-center lg:min-h-[560px]" aria-hidden="true" />
      </div>

      {/* Signature: margin annotations, echoing the product's inline-citation feature */}
      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 border-t border-dashed border-border pt-8 sm:grid-cols-3">
        {marginNotes.map((note, i) => (
          <motion.div
            key={note.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            className="flex items-start gap-3 text-left"
          >
            <span className="font-mono text-xs text-primary">{note.label}</span>
            <p className="text-sm text-muted-foreground">{note.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
