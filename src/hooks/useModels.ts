"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { researchService } from "@/services/researchService";
import type { ModelId } from "@/types";

export function useModels() {
  return useQuery({
    queryKey: ["models"],
    queryFn: researchService.listModels,
    staleTime: 5 * 60_000,
  });
}

export function useUpdateModel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (model: ModelId) => researchService.updateModel(model),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      toast.success("Default model updated.");
    },
    onError: () => {
      toast.error("Couldn't update the default model.");
    },
  });
}
