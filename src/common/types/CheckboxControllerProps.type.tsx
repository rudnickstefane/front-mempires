export type CheckboxControllerProps = {
  label?: React.ReactNode;
  variant?: "default" | "card";
  error?: boolean;
  errorMessage?: string;
  checked?: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
};
