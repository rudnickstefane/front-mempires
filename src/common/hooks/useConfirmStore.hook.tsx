/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type ConfirmOptions = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonCancel?: string;
  buttonColor?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  alertVariant?: any;

  onConfirm?: (signal: AbortSignal) => Promise<void> | void;
};

interface ConfirmState {
  isOpen: boolean;
  isLoading: boolean;
  options?: ConfirmOptions;

  resolve?: (value: boolean) => void;
  abortController?: AbortController;

  open: (options: ConfirmOptions) => Promise<boolean>;
  close: () => void;
  confirm: () => Promise<void>;
  cancel: () => void;
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  isOpen: false,
  isLoading: false,

  open: (options) => {
    return new Promise<boolean>((resolve) => {
      const abortController = new AbortController();

      set({
        isOpen: true,
        options,
        resolve,
        abortController,
      });
    });
  },

  close: () =>
    set({
      isOpen: false,
      isLoading: false,
      options: undefined,
    }),

  cancel: () => {
    const { resolve, abortController } = get();

    abortController?.abort();

    resolve?.(false);

    set({
      isOpen: false,
      isLoading: false,
    });
  },

  confirm: async () => {
    const { options, resolve, abortController } = get();

    try {
      set({ isLoading: true });

      await options?.onConfirm?.(abortController!.signal);

      resolve?.(true);

      set({
        isOpen: false,
        isLoading: false,
      });
    } catch (err: any) {
      set({ isLoading: false });
    }
  },
}));
