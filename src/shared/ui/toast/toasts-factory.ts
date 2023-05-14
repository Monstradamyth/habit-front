import { create } from "zustand";

export type ToastType = 'SUCCESS' | 'ERROR' | 'WARNING';

const DEFAULT_DELAY = 1500;

type Toast = {
  id: number;
  type: ToastType;
  message: string;
  delay?: number;
  key?: string;
};

type ToastsConfigObject = {
  message: string;
  delay?: number;
  key?: string;
};

type ToastConfig = ToastsConfigObject | string;

interface IToastsStore {
  toasts: Toast[];
  setToasts: (toasts: Toast[]) => void;
}

export const useToastsStore = create<IToastsStore>((set, get) => ({
  toasts: [],
  setToasts: (toasts: Toast[]) => set({ toasts }),
}))

const getToastStoreState = () => useToastsStore.getState();

export const toastsFactory = () => {
  const addToast = (item: { type: ToastType; config: ToastConfig }) => {
    let uniqueKey;
    if (typeof item.config !== 'string' && !!item.config.key) {
      const key = item.config.key;
      const toastIsInTheList = !!getToastStoreState().toasts.find((toast) => toast.key === key);
      if (toastIsInTheList) {
        return;
      }
      uniqueKey = key;
    }

    const toast: Toast = {
      id: getToastStoreState().toasts.length,
      type: item.type,
      key: uniqueKey,
      ...parseToastConfig(item.config),
    };

    getToastStoreState().setToasts([...getToastStoreState().toasts, toast]);

    setTimeout(() => removeToast(toast), toast.delay);
  };

  const removeToast = (item: Toast) => {
    getToastStoreState().setToasts(getToastStoreState().toasts.filter((toast) => item !== toast));
  };

  const removeToastById = (id: Toast['id']) => {
    getToastStoreState().setToasts(getToastStoreState().toasts.filter((toast) => toast.id !== id));
  };

  const addSuccessToast = (config: ToastConfig) =>
    addToast({
      type: 'SUCCESS',
      config,
    });

  const addErrorToast = (config: ToastConfig) => {
    addToast({
      type: 'ERROR',
      config,
    });
  }

  const addWarningToast = (config: ToastConfig) =>
    addToast({
      type: 'WARNING',
      config,
    });

  const parseToastConfig = (config: ToastConfig) => {
    if (typeof config === 'string') {
      return {
        message: config,
        delay: DEFAULT_DELAY,
      };
    }
    return {
      message: config.message,
      delay: config.delay || DEFAULT_DELAY,
    };
  };

  return {
    methods: {
      removeToastById,
      addSuccessToast,
      addErrorToast,
      addWarningToast,
    },
  };
};

export type ToastsFactory = ReturnType<typeof toastsFactory>;
