import { ToastsView } from "@/shared/ui/toast/ToastsView";
import { toastsFactory } from "@/shared/ui/toast/toasts-factory";

export const Toasts = toastsFactory();

export const ToastsContainer = () => <ToastsView model={Toasts} />;
