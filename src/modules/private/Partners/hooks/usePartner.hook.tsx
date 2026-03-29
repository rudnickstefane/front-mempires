import { useDrawerStore } from "@sr/common/hooks";
import { PartnerDrawerContent } from "../drawers";
import { DrawerFormPartnerProps } from "../types";

export const usePartnerHook = () => {
  const open = useDrawerStore((s) => s.openDrawer);

  const openDrawer = (data?: DrawerFormPartnerProps) => {
    open({
      title: "Novo Parceiro",
      steps: ["Dados do parceiro", "Contato"],
      component: PartnerDrawerContent,
      componentProps: { initialData: data },
    });
  };

  return {
    openDrawer,
    closeDrawer: useDrawerStore.getState().closeDrawer,
  };
};
