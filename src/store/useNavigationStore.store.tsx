/* eslint-disable @typescript-eslint/no-explicit-any */
import { GymManagementType } from "@sr/modules/private/Portal/pages/home/types/gym-management.types";
import { create } from "zustand";

interface NavigationState {
  stack: GymManagementType[];
  params: any;
  labels: Record<string, string>;
  // Ações
  push: (module: GymManagementType, params?: any, label?: string) => void;
  pop: () => void;
  reset: (module: GymManagementType) => void;
  // Getters
  getActiveModule: () => GymManagementType;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  stack: ["Home"],
  params: {},
  labels: {},

  getActiveModule: () => get().stack[get().stack.length - 1],

  push: (module, params = {}, label) =>
    set((state) => ({
      stack: [...state.stack, module],
      params: { ...state.params, ...params },
      labels: label ? { ...state.labels, [module]: label } : state.labels,
    })),

  pop: () =>
    set((state) => ({
      stack: state.stack.length > 1 ? state.stack.slice(0, -1) : state.stack,
    })),

  reset: (module) =>
    set({
      stack: [module],
      params: {},
      labels: {},
    }),
}));
