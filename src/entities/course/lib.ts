import { Colors } from "@/shared/config/constants";

export const correctStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return { color: Colors.accentColor };
    case "finished":
      return { color: Colors.activeColor };
    case "failed":
      return { color: Colors.red };
    default:
      return { color: Colors.accentColor };
  }
}