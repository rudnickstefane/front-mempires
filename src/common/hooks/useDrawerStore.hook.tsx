/* eslint-disable @typescript-eslint/no-explicit-any */
// store/useDrawerStore.ts
import { create } from "zustand";

type DrawerComponent = React.ComponentType<any>;

interface DrawerState {
  isOpen: boolean;
  title?: string;
  headerStep?: string;

  steps: string[];
  setSteps: (steps: string[]) => void;
  activeStep: number;

  component: DrawerComponent | null;
  componentProps?: any;

  openDrawer: (params: {
    title: string;
    steps: string[];
    component: DrawerComponent;
    componentProps?: any;
    activeStep?: number;
  }) => void;

  closeDrawer: () => void;
  setActiveStep: (step: number) => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  component: null,
  steps: [],
  setSteps: (steps) => set({ steps }),
  activeStep: 0,

  openDrawer: ({ title, steps, component, componentProps, activeStep = 0 }) =>
    set({
      isOpen: true,
      title,
      steps,
      component,
      componentProps,
      activeStep,
    }),

  closeDrawer: () =>
    set({
      isOpen: false,
      component: null,
    }),

  setActiveStep: (step) => set({ activeStep: step }),
}));
