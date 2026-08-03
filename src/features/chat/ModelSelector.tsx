"use client";

import { useEffect } from "react";
import { ChevronDown, CircleAlert, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModels } from "@/hooks/useModels";
import { useChatStore } from "@/store/useChatStore";

export function ModelSelector() {
  const model = useChatStore((s) => s.model);
  const setModel = useChatStore((s) => s.setModel);
  const { data } = useModels();

  // Once models load, default the picker to the user's backend-side default model.
  useEffect(() => {
    if (!model && data?.currentModel) setModel(data.currentModel);
  }, [model, data?.currentModel, setModel]);

  const models = data?.models ?? [];
  const current = models.find((m) => m.id === model);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          {current?.label ?? "Select model"}
          {current && !current.configured && (
            <CircleAlert className="h-3.5 w-3.5 text-destructive" />
          )}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80">
        {models.map((m) => (
          <DropdownMenuItem
            key={m.id}
            onClick={() => setModel(m.id)}
            className="flex flex-col items-start gap-0.5 py-2"
          >
            <span className="flex w-full items-center justify-between gap-2">
              <span className="text-sm font-medium">{m.label}</span>
              {!m.configured && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                  <CircleAlert className="h-2.5 w-2.5" />
                  No API key
                </span>
              )}
            </span>
            <span className="text-xs text-muted-foreground">{m.description}</span>
          </DropdownMenuItem>
        ))}
        {models.length === 0 && (
          <p className="px-2 py-2 text-xs text-muted-foreground">No models available.</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
