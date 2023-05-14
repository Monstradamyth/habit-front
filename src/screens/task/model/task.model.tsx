import { AttemptType } from "@/entities/attempt/view/types";
import { isTextFieldValid } from "@/shared/config/validation";
import { create } from "zustand";

interface ITaskModel {
  title: string;
  description: string;
  attempts: AttemptType[];
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setAttempts: (attempts: AttemptType[]) => void;
  canSubmit: () => boolean;
  reset: () => void;
}

export const useTaskModel = create<ITaskModel>((set, get) => ({
  title: "",
  description: "",
  attempts: [],
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),
  setAttempts: (attempts: AttemptType[]) => set({ attempts }),
  canSubmit: () => {
    const { title, description } = get()
    return isTextFieldValid(title) && isTextFieldValid(description)
  },
  reset: () => set({ title: "", description: "", attempts: [] }),
}))