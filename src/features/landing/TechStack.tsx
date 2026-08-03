"use client";

import OrbitingSkills from "@/components/ui/orbiting-skills";

export function TechStack() {
  return (
    <section className="relative overflow-hidden px-6 py-16 text-[#e8e8f0] sm:py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00dcc0]">
          Tech Stack
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Built with a modern research stack
        </h2>
        <p className="mx-auto mt-1 max-w-2xl text-sm text-muted-foreground sm:text-base">
          The technologies behind the interface, motion, and product workflows.
        </p>
        <div className="mt-1">
        <OrbitingSkills />
        </div>
      </div>
    </section>
  );
}
