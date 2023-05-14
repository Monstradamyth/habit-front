import { apiClient } from "@/shared/api/client";

export function startCourse(id: string) {
    return apiClient.patch("/habits/my/course/start", { id });
}