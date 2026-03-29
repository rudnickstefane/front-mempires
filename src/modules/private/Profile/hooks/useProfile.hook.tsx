import { useDrawerStore } from "@sr/common/hooks";
import { ProfileDrawerContent } from "../drawers";
import * as Hook from "../hooks";

export const useProfileHook = () => {
  const open = useDrawerStore((s) => s.openDrawer);
  const { data: profileData, isPending } = Hook.useFindUserDetails();

  const openDrawer = (step = 0) => {
    open({
      title: "Alterar Dados",
      steps: ["Dados pessoais", "Endereço", "Contato"],
      activeStep: step,
      component: ProfileDrawerContent,
      componentProps: { profileData },
    });
  };

  return {
    isPending,
    openDrawer,
    profileData,
  };
};
