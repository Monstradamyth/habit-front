import { apiClient } from "@/shared/api/client";

export function getUser () {
  return apiClient.get("/users/me");
}