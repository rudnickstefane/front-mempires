export interface DrawerStepsProps {
  activeStep: number;
  title: string[];
  handleNext?: () => Promise<void>;
  handleBack?: () => void;
  onClose?: () => void;
  isValid?: boolean;
  isLoading?: boolean;
  isDirty?: boolean;
}
