/* eslint-disable @typescript-eslint/no-explicit-any */
import { dialogConfirmConfig } from "@sr/common/configs";
import { DialogConfirmType } from "@sr/common/types";
import { useCallback, useState } from "react";

interface ConfirmState {
  isOpen: boolean;
  type: DialogConfirmType;
  title: string;
  subtitle?: string;
  data?: any;
}

export const useConfirmDialog = () => {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    type: "ACTIVE",
    title: "",
  });

  const openConfirm = useCallback(
    (config: {
      type: DialogConfirmType;
      title: string;
      subtitle?: string;
      data?: any;
    }) => {
      setState({
        isOpen: true,
        ...config,
      });
    },
    [],
  );

  const closeConfirm = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Mapeia as cores e ícones baseados no config global que você já tem
  const visualConfig = dialogConfirmConfig[state.type];

  return {
    confirmState: state,
    openConfirm,
    closeConfirm,
    // Props prontas para o componente ConfirmDialog
    confirmProps: {
      isOpen: state.isOpen,
      title: state.title,
      subtitle: state.subtitle,
      buttonText:
        state.type === "DELETE"
          ? "Excluir"
          : state.type === "ACTIVE"
            ? "Ativar"
            : "Desativar",
      buttonColor: visualConfig?.buttonColor,
      icon: visualConfig?.icon,
      iconBgColor: visualConfig?.iconBgColor,
      iconColor: visualConfig?.iconColor,
      alertVariant: visualConfig?.alertVariant,
      closeModal: closeConfirm,
    },
  };
};
