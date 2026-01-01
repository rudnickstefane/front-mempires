import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { useField } from "formik";
import { Eye, EyeSlash } from "iconsax-react";

export type CustomTextFieldProps = MuiTextFieldProps & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  errorMessage?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  requiredMessage?: string;
};

export function TextField({
  startIcon,
  endIcon,
  showPasswordToggle,
  onTogglePassword,
  requiredMessage = "Este campo tem o preenchimento obrigatório.",
  ...props
}: CustomTextFieldProps) {
  const [field, meta] = useField(props.name!);

  const isRequiredError = meta.error === "required";
  const hasError = !!(meta.touched && meta.error);

  return (
    <FormControl fullWidth={props.fullWidth} margin={props.margin}>
      <MuiTextField
        {...field}
        {...props}
        error={hasError}
        helperText={
          hasError ? (isRequiredError ? requiredMessage : meta.error) : ""
        }
        variant="outlined"
        autoComplete="off"
        slotProps={{
          input: {
            startAdornment: startIcon ? (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ) : null,
            endAdornment: (
              <>
                {showPasswordToggle && onTogglePassword ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={onTogglePassword}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      className="!mr-0"
                    >
                      {props.type === "password" ? <Eye /> : <EyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ) : null}
                {endIcon && !showPasswordToggle ? (
                  <InputAdornment position="end">{endIcon}</InputAdornment>
                ) : null}
              </>
            ),
          },
        }}
      />
    </FormControl>
  );
}
