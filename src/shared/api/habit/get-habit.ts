import { HabitType } from "@/entities/habit/view/types";
import { apiClient } from "@/shared/api/client";

export function getHabit(id) {
    return apiClient.get<{ habit: HabitType}>("/habits/my/" + id);
}