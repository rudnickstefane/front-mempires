/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { useModal } from "@sr/common/components/Modal/hooks";
import { Key, ShieldSecurity } from "iconsax-react";
import { useState } from "react";
import { ChangePasswordModal, TwoFAAuthModal } from "../components/Modals";

export const useSecurityHook = () => {
  const { openModal } = useModal();
  const [modalConfig, setModalConfig] = useState<{
    icon?: React.ReactNode;
    title: string;
    description?: string;
    component: React.ReactNode;
  } | null>(null);

  const openSecurityModal = (type: "TwoFA" | "Password" | "Sessions") => {
    const modules = {
      Password: {
        icon: <Key variant="Linear" size={24} className="text-orange-500" />,
        title: "changePassword.title",
        description: "changePassword.modal.description",
        component: <ChangePasswordModal />,
      },
      TwoFA: {
        icon: (
          <ShieldSecurity variant="Linear" size={24} className="text-primary" />
        ),
        title: "twoFaAuth.modal.title",
        description: "twoFaAuth.modal.description",
        component: <TwoFAAuthModal />,
      },
      Sessions: {
        title: "activeSessions.title",
        description: "Gerencie dispositivos conectados",
        component: <Box className="p-5">Sessões Ativas</Box>,
      },
    };

    setModalConfig(modules[type]);
    openModal();
  };

  return {
    openSecurityModal,
    modalConfig,
  };
};
