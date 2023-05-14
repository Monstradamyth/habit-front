import { apiClient } from "@/shared/api/client";

export function getTask(id) {
    return apiClient.get("/habits/my/task/" + id);
}