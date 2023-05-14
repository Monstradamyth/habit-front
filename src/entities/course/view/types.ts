import { TaskType } from "@/entities/task/view/types";

export type CourseType = {
  id: string;
  habitId: string;
  status: string;
  startDate: Date;
  endDate: Date;
  taskFrequency: number;
  successPercentage: number;
  tasks?: TaskType[];
}