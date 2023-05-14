import { apiClient } from "@/shared/api/client";

export function deleteHabit(habitId) {
    return apiClient.delete("/habits/" + habitId);
}