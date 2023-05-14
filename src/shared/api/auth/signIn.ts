import { apiClient } from "@/shared/api/client";

export function signIn(email: string, password: string) {
  return apiClient.post<{token: string}, {email: string, password: string}>("/auth/signin", { email, password });
}
