export type DrawerContainerProps = {
  isOpen: boolean;
  title: string;
  headerStep: string;
  steps: string[];
  activeStep: number;
  children: React.ReactNode;
  onClose: () => void;
  onStepClick?: (step: number) => void;
};
