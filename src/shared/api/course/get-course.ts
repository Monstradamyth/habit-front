import { CourseType } from "@/entities/course/view/types";
import { apiClient } from "@/shared/api/client";

export function getCourse(id) {
    return apiClient.get<{ course: CourseType }>("/habits/my/course/" + id);
}