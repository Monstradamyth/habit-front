import { apiClient } from "@/shared/api/client";

export function editTask(habitId, title, description) {
    return apiClient.patch("/habits/my/task" + habitId, { title: title, description: description });
}