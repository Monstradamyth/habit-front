import { apiClient } from "@/shared/api/client";

export function editHabit(habitId, title, description) {
    return apiClient.patch("/habits/my/" + habitId, { title: title, description: description });
}