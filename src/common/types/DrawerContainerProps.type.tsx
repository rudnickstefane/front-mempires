import { ReactNode } from "react";

export type DrawerContainerProps = {
  isOpen: boolean;
  title: string;
  headerStep: string;
  steps: string[];
  activeStep: number;
  children: ReactNode;
  onClose: () => void;
  handleNext?: () => Promise<void>;
  handleBack?: () => void;
  onStepClick?: (step: number) => void;
};
