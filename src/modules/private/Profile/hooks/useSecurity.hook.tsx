/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { useModal } from "@sr/common/components/Modal/hooks/useModal";
import { ShieldSecurity } from "iconsax-react";
import { useState } from "react";
import { TwoFAAuthModal } from "../components/Modals";

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
      TwoFA: {
        icon: (
          <ShieldSecurity
            variant="Linear"
            size={24}
            className="!text-primary"
          />
        ),
        title: "twoFaAuth.modal.title",
        description: "twoFaAuth.modal.description",
        component: <TwoFAAuthModal />,
      },
      Password: {
        title: "security.changePassword",
        description: "Atualize sua senha periodicamente",
        component: <Box className="p-5">Componente de Senha</Box>,
      },
      Sessions: {
        title: "security.activeSessions",
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
