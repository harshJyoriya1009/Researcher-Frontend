import { apiClient } from "./apiClient";
import type { ModelId, ModelOption } from "@/types";

interface ApiModelListResponse {
  models: ModelOption[];
  current_model: string;
}

export interface ModelsResult {
  models: ModelOption[];
  currentModel: string;
}

export const researchService = {
  async listModels(): Promise<ModelsResult> {
    const { data } = await apiClient.get<ApiModelListResponse>("/models");
    return { models: data.models, currentModel: data.current_model };
  },

  async updateModel(model: ModelId): Promise<ModelsResult> {
    const { data } = await apiClient.put<ApiModelListResponse>("/models", { model });
    return { models: data.models, currentModel: data.current_model };
  },
};
