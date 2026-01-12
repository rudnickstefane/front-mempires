/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { maskField } from "@sr/common/components/Forms";
import { ptBR } from "date-fns/locale";
import { useField, useFormikContext } from "formik";
import { ArrowDown2, Calendar, Eye, EyeSlash } from "iconsax-react";
import { ElementType, FocusEvent, ReactNode, useState } from "react";

export interface SelectOption {
  label?: string;
  value: string | number;
}

export type CustomTextFieldProps = Omit<MuiTextFieldProps, "onChange"> & {
  name: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  selectIcon?: ElementType;
  errorMessage?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
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
  onChange?: MuiTextFieldProps["onChange"];
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
  mask,
  definitions,
  maxLength,
  viewCountCharacter,
  showButton,
  labelButton = "Cadastrar",
  hook,
  disabled,
  ...props
}: CustomTextFieldProps) {
  const [field, meta] = useField(props.name!);
  const { setFieldValue } = useFormikContext();
  const [isFocused, setIsFocused] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const hasError = !!(meta.touched && meta.error);
  const isRequiredError = meta.error === "required";
  const remaining = maxLength ? maxLength - (field.value?.length || 0) : null;

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(false);
    field.onBlur(e);
    if (props.onBlur) props.onBlur(e);
  };

  const handleClear = () => {
    setFieldValue(props.name, "");
  };

  const handleHookAction = async () => {
    if (!hook) return;
    setInternalLoading(true);
    try {
      await hook(field.value);
    } finally {
      setInternalLoading(false);
    }
  };

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
                  paddingRight: "8px",
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
        disabled={disabled || internalLoading}
        select={!!options}
        error={hasError}
        helperText={
          hasError ? (isRequiredError ? requiredMessage : meta.error) : ""
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        variant="outlined"
        autoComplete="off"
        slotProps={{
          inputLabel: {
            shrink: Boolean(field.value || isFocused || props.placeholder),
          },
          input: {
            inputComponent: mask ? (maskField as any) : undefined,
            inputProps: { mask, definitions, maxLength, lazy: true },
            startAdornment: startIcon ? (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ) : null,
            endAdornment: (
              <InputAdornment position="end">
                {showButton && isFocused && !hasError && field.value && (
                  <Button
                    variant="text"
                    disabled={internalLoading}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleHookAction}
                    className="font-ubuntu !text-base !font-semibold !normal-case !text-[var(--color-primary)]"
                    sx={{
                      "&.Mui-disabled": {
                        backgroundColor: "transparent !important",
                      },
                    }}
                  >
                    {internalLoading ? (
                      <CircularProgress
                        size={20}
                        className="!text-[var(--color-primary)]"
                      />
                    ) : (
                      labelButton
                    )}
                  </Button>
                )}

                {field.value && (
                  <IconButton
                    onClick={handleClear}
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

      {/* Contador de Caracteres da Sugestão */}
      {maxLength && viewCountCharacter && (
        <Typography className="font-ubuntu !text-neutral700 !text-sm !mt-1">
          {`Restam ${Math.max(0, remaining || 0)} caracteres`}
        </Typography>
      )}
    </FormControl>
  );
}
