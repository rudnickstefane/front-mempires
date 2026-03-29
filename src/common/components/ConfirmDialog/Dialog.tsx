import { useConfirmStore } from "@sr/common/hooks/useConfirmStore.hook";
import { ConfirmDialog } from "./ConfirmDialog";

export function Dialog() {
  const { isOpen, isLoading, options, confirm, cancel } = useConfirmStore();

  if (!options) return null;

  return (
    <ConfirmDialog
      isOpen={isOpen}
      title={options.title}
      subtitle={options.subtitle}
      buttonText={options.buttonText || "Confirmar"}
      buttonCancel={options.buttonCancel || "Cancelar"}
      buttonColor={options.buttonColor}
      icon={options.icon}
      iconBgColor={options.iconBgColor}
      iconColor={options.iconColor}
      alertVariant={options.alertVariant}
      isLoading={isLoading}
      confirmDialog={confirm}
      closeModal={cancel}
    />
  );
}
