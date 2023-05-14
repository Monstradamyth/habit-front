import { apiClient } from "@/shared/api/client";

export function getHabits() {
    return apiClient.get("/habits/my");
}