import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import { useField } from "formik";
import { ArrowDown2, Calendar, Eye, EyeSlash } from "iconsax-react";
import { ElementType, ReactNode } from "react";

export interface SelectOption {
  label?: string;
  value: string | number;
}

export type CustomTextFieldProps = MuiTextFieldProps & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  selectIcon?: ElementType;
  errorMessage?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  requiredMessage?: string;
  datePicker?: boolean;
  onChangeDate?: (value: Date | null) => void;
  onClear?: () => void;
  options?: SelectOption[];
};

export function TextField({
  startIcon,
  endIcon,
  showPasswordToggle,
  onTogglePassword,
  requiredMessage = "Este campo tem o preenchimento obrigatório.",
  selectIcon,
  datePicker,
  onChangeDate,
  onClear,
  options,
  ...props
}: CustomTextFieldProps) {
  const [field, meta] = useField(props.name!);

  const isRequiredError = meta.error === "required";
  const hasError = !!(meta.touched && meta.error);

  if (datePicker)
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <FormControl fullWidth={props.fullWidth} margin={props.margin}>
          <DatePicker
            label={props.label}
            format="dd/MM/yyyy"
            value={field.value ? new Date(field.value) : null}
            onChange={onChangeDate}
            slots={{
              openPickerIcon: () => endIcon || <Calendar size={20} />,
            }}
            slotProps={{
              inputAdornment: {
                position: "end",
                sx: {
                  paddingRight: "8px", // Move o ícone para a esquerda
                },
              },
              textField: {
                ...props,
                name: field.name,
                onBlur: field.onBlur,
                error: hasError,
                helperText: hasError
                  ? isRequiredError
                    ? requiredMessage
                    : meta.error
                  : "",
                variant: "outlined",
                placeholder: "DD/MM/AAAA",
                fullWidth: true,
              },
              field: {
                clearable: true,
                shouldRespectLeadingZeros: true,
              },
            }}
            localeText={{
              fieldYearPlaceholder: () => "AAAA",
              fieldClearLabel: "",
            }}
          />
        </FormControl>
      </LocalizationProvider>
    );

  return (
    <FormControl fullWidth={props.fullWidth} margin={props.margin}>
      <MuiTextField
        {...field}
        {...props}
        select={!!options}
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
              <InputAdornment position="end">
                {onClear && field.value && (
                  <IconButton
                    onClick={onClear}
                    edge="end"
                    className="clear-button !-mr-1"
                    sx={{
                      opacity: 0,
                      transition: "opacity 0.2s ease-in-out",
                      visibility: "hidden",
                    }}
                  >
                    <CloseIcon className="!text-xl" />
                  </IconButton>
                )}

                {showPasswordToggle && onTogglePassword ? (
                  <IconButton
                    onClick={onTogglePassword}
                    edge="end"
                    className={`${onClear ? "!-mr-1 !ml-1" : "!-mr-1"} `}
                  >
                    {props.type === "password" ? <Eye /> : <EyeSlash />}
                  </IconButton>
                ) : (
                  endIcon
                )}
              </InputAdornment>
            ),
          },
          select: {
            IconComponent: selectIcon || ArrowDown2,
            sx: {
              "& .MuiSelect-icon": {
                right: "12px",
                top: "17px",
                transition: "transform 0.2s ease-in-out",
              },
            },
          },
        }}
        sx={{
          "&:hover .clear-button": {
            opacity: 1,
            visibility: "visible",
          },
          ...props.sx,
        }}
      >
        {options?.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiTextField>
    </FormControl>
  );
}
