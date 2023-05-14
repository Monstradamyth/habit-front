import { CourseType } from "@/entities/course/view/types";

export type HabitType = {
  id: string;
  userId: string;
  title: string;
  status: boolean;
  description: string;
  courses?: CourseType[];
}