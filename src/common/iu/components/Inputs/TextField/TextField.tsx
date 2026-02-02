/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField as MuiTextField,
  Tooltip,
} from "@mui/material";
import { MaskField } from "@sr/common/components/Forms";
import { CustomTextFieldProps } from "@sr/common/types";
import { useField, useFormikContext } from "formik";
import { ArrowDown2, Eye, EyeSlash } from "iconsax-react";
import { FocusEvent, useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "../../Typography";
import { DatePickerField } from "../DatePicker/DatePickerField";

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
  tooltip,
  ...props
}: CustomTextFieldProps) {
  const intl = useIntl();
  const [field, meta] = useField(props.name!);
  const { setFieldValue } = useFormikContext();
  const [isFocused, setIsFocused] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  disabled = disabled ?? internalLoading;

  const hasError = !!(meta.touched && meta.error);
  const isRequiredError = meta.error === "required";
  const remaining = maxLength ? maxLength - (field.value?.length || 0) : null;

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsFocused(false);
    field.onBlur(e);
    if (props.onBlur) props.onBlur(e);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      e.key === "Enter" &&
      showButton &&
      field.value &&
      !hasError &&
      !disabled
    ) {
      e.preventDefault();
      handleHookAction();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (mask) {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text");
      // Remove tudo que não é número (ajuste a Regex se a máscara permitir letras)
      const cleanValue = pastedData.replace(/\D/g, "");
      setFieldValue(props.name, cleanValue);
    }
  };

  if (datePicker)
    return (
      <DatePickerField
        field={field}
        meta={meta}
        onChangeDate={onChangeDate!}
        {...props}
      />
    );

  return (
    <FormControl
      fullWidth={props.fullWidth}
      margin={props.margin}
      className={`${tooltip ? "flex !flex-row items-center" : ""}`}
    >
      <MuiTextField
        {...field}
        {...props}
        label={intl.formatMessage({ id: props.label as string })}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        disabled={disabled}
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
            inputComponent: mask ? (MaskField as any) : undefined,
            inputProps: { mask, definitions, maxLength, lazy: true },
            startAdornment: startIcon ? (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ) : null,
            endAdornment: (
              <InputAdornment position="end">
                {showButton && isFocused && !hasError && field.value && (
                  <Button
                    variant="text"
                    disabled={disabled}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={handleHookAction}
                    className="!font-manrope !text-base !font-semibold !normal-case !text-primary !rounded-md"
                    sx={{
                      "&.Mui-disabled": {
                        backgroundColor: "transparent !important",
                      },
                    }}
                  >
                    {disabled ? (
                      <CircularProgress size={20} className="!text-primary" />
                    ) : (
                      labelButton
                    )}
                  </Button>
                )}

                {!options && field.value && !disabled && (
                  <IconButton
                    onClick={() => setFieldValue(props.name, "")}
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

      {tooltip && (
        <Tooltip title={tooltip} placement="left" arrow>
          <IconButton size="small" className="!ml-2">
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {/* Contador de Caracteres da Sugestão */}
      {maxLength && viewCountCharacter && (
        <Typography className="!font-manrope !text-neutral700 !text-sm !mt-1">
          {`Restam ${Math.max(0, remaining || 0)} caracteres`}
        </Typography>
      )}
    </FormControl>
  );
}
