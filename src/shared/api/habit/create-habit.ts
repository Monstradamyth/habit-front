import { apiClient } from "@/shared/api/client";

export function createHabit(title: string, description: string) {
  return apiClient.post("/habits/my", { title, description });
}