import { TaskType } from "@/entities/task/view/types";
import dayjs from "dayjs";
import { create } from "zustand";

interface ICourseModalStore {
  title: string;
  endDate: dayjs.Dayjs | null;
  taskFrequency: number;
  successPercentage: number;
  showCalendarForEnd: boolean;
  status: string;
  tasks: TaskType[];
  setTitle: (title: string) => void;
  setEndDate: (endDate: dayjs.Dayjs | null) => void;
  setTaskFrequency: (taskFrequency: number) => void;
  setSuccessPercentage: (successPercentage: number) => void;
  setShowCalendarForEnd: (showCalendarForEnd: boolean) => void;
  setTasks: (tasks: TaskType[]) => void;
  canSubmit: () => boolean;
  setStatus: (status: string) => void;
  reset: () => void;
}

export const useCourseModal = create<ICourseModalStore>((set, get) => ({
  title: "",
  endDate: dayjs(),
  taskFrequency: null,
  successPercentage: null,
  showCalendarForEnd: false,
  status: "",
  tasks: [],
  setTitle: (title: string) => set({ title: title }),
  setEndDate: (endDate: dayjs.Dayjs | null) => set({ endDate: endDate }),
  setTaskFrequency: (taskFrequency: number) => set({ taskFrequency: taskFrequency }),
  setSuccessPercentage: (successPercentage: number) => set({ successPercentage: successPercentage }),
  setShowCalendarForEnd: (showCalendarForEnd: boolean) => set({ showCalendarForEnd: showCalendarForEnd }),
  setStatus: (status: string) => set({ status: status }),
  setTasks: (tasks: TaskType[]) => set({ tasks: tasks }),
  canSubmit: () => {
    const { title, endDate, taskFrequency, successPercentage } = get();
    return title !== "" && endDate !== null && taskFrequency > 0 && successPercentage > 0;
  },
  reset: () => set({
    title: "",
    endDate: dayjs(),
    taskFrequency: null,
    successPercentage: null,
    showCalendarForEnd: false,
    status: "",
  }),
}))
