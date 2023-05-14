import { apiClient } from "@/shared/api/client";

export function createCourse({
  habitId,
  title,
  endDate,
  taskFrequency,
  successPercentage,
}: {
  habitId: string;
  title: string;
  endDate: number;
  taskFrequency: number;
  successPercentage: number;
}) {
  return apiClient.post("/habits/my/course", {
    habitId,
    title,
    endDate,
    taskFrequency,
    successPercentage,
  });
}
