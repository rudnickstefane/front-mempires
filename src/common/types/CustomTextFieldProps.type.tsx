import { TextFieldProps } from "@mui/material";

export type SelectOption = {
  label?: string;
  value: string | number;
};

export type CustomTextFieldProps = Omit<TextFieldProps, "onChange"> & {
  name: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  selectIcon?: React.ElementType;
  errorMessage?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  information?: string;
  requiredMessage?: string;
  datePicker?: boolean;
  onChangeDate?: (value: Date | null) => void;
  onClear?: boolean;
  options?: SelectOption[];
  mask?: string | Array<string | RegExp>;
  definitions?: Record<string, RegExp>;
  maxLength?: number;
  viewCountCharacter?: boolean;
  showButton?: boolean;
  labelButton?: string;
  hook?: (value: string) => void | Promise<void>;
  onChange?: TextFieldProps["onChange"];
  tooltip?: React.ReactNode;
};
