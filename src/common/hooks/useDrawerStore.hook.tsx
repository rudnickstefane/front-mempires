/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export interface DrawerConfig {
  header: {
    title: string;
    headerStep?: string;
  };
  steps?: string[];
  activeStep?: number;
  onStepClick?: (step: number) => void;
  component: React.ComponentType<any>; // O componente em si, não JSX
  props: any; // As variáveis que o componente precisa
}

interface DrawerState {
  isOpen: boolean;
  config: DrawerConfig | null;
  openDrawer: (config: DrawerConfig) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  config: null,
  openDrawer: (config) => set({ isOpen: true, config }),
  closeDrawer: () => set({ isOpen: false, config: null }),
}));
