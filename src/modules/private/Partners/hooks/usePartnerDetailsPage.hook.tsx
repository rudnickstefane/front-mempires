import { useDrawerStore } from "@sr/common/hooks";
import { useNavigationStore } from "@sr/store";
import * as Hook from ".";
import { PartnerDrawerContent } from "../drawers";

export const usePartnerDetailsPageHook = () => {
  const open = useDrawerStore((s) => s.openDrawer);

  const params = useNavigationStore((state) => state.params);
  const { data: partnerData, isPending } = Hook.useFindPartner(
    params?.partnerCode,
  );

  const openDrawer = (step = 0) => {
    open({
      title: "Alterar Parceiro",
      steps: ["Dados do parceiro", "Contato"],
      activeStep: step,
      component: PartnerDrawerContent,
      componentProps: { initialData: partnerData },
    });
  };

  return {
    data: {
      partner: partnerData,
      loading: isPending,
    },
    isPending,
    partnerData,
    openDrawer,
  };
};
