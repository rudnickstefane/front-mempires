import { useModal } from "@sr/common/components/Modal/hooks";
import { useNavigationStore } from "./useNavigationStore.store";

export const resetAllStores = () => {
  useNavigationStore.getState().reset("Home");
  useModal.getState().closeModal();
};
