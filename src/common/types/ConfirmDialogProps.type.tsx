import { AlertVariant } from "@sr/common/types";

export type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonCancel?: string;
  buttonColor?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  alertVariant?: AlertVariant;
  isLoading?: boolean;
  confirmDialog: () => void;
  closeModal: () => void;
};
