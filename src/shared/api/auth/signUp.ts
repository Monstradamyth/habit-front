import { apiClient } from "@/shared/api/client";

export function signUp(email: string, password: string, name: string) {
  return apiClient.post("/auth/signUp", { email, password, name });
}
