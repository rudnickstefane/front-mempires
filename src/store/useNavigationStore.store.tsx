/* eslint-disable @typescript-eslint/no-explicit-any */
import { GymManagementType } from "@sr/modules/private/Portal/pages/home/types/gym-management.types";
import { create } from "zustand";

interface NavigationState {
  stack: GymManagementType[];
  params: any;
  // Ações
  push: (module: GymManagementType, params?: any) => void;
  pop: () => void;
  reset: (module: GymManagementType) => void;
  // Getters
  getActiveModule: () => GymManagementType;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  stack: ["Home"], // Começa na Home
  params: {},

  getActiveModule: () => get().stack[get().stack.length - 1],

  push: (module, params = {}) =>
    set((state) => ({
      stack: [...state.stack, module],
      params: { ...state.params, ...params },
    })),

  pop: () =>
    set((state) => ({
      stack: state.stack.length > 1 ? state.stack.slice(0, -1) : state.stack,
    })),

  reset: (module) =>
    set({
      stack: [module],
      params: {},
    }),
}));
