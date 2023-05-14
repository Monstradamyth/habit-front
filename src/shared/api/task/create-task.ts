import { apiClient } from "@/shared/api/client";

export function createTask({ title, description, courseId }: {
    title: string;
    description: string;
    courseId: string;
    }) {
    return apiClient.post("/habits/my/task", { title, description, courseId });
}