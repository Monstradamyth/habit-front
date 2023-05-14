import { isEmailValid, isTextFieldValid } from "@/shared/config/validation"
import { create } from "zustand"

interface ISettingsStore {
  name: string
  email: string
  password: string
  setName: (name: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  reset: () => void
  canSubmit: () => boolean
}
export const useSettingsStore = create<ISettingsStore>((set, get) => ({
  name: '',
  email: '',
  password: '',
  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  reset: () => set({ name: '', email: '', password: '' }),
  canSubmit: () => {
    const { name, email, password } = get()
    return isTextFieldValid(name) && isEmailValid(email) && (isTextFieldValid(password) || password === '')
  }
}))
