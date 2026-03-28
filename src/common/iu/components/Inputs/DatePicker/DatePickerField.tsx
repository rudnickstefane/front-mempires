/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CustomTextFieldProps } from "@sr/common/types";
import { isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "iconsax-react";
interface DatePickerFieldProps extends CustomTextFieldProps {
  field: any;
  meta: any;
}

export const DatePickerField = ({
  field,
  meta,
  onChangeDate,
  ...props
}: DatePickerFieldProps) => {
  const hasError = !!(meta.touched && meta.error);
  const isRequiredError = meta.error === "required";
  const requiredMessage =
    props.requiredMessage || "Este campo tem o preenchimento obrigatório.";

  const dateValue =
    typeof field.value === "string"
      ? parseISO(field.value.replace(/Z$/, "")) // Remove o sufixo UTC para tratar como local
      : field.value;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <FormControl fullWidth={props.fullWidth} margin={props.margin}>
        <DatePicker
          label={props.label}
          format="dd/MM/yyyy"
          value={isValid(dateValue) ? dateValue : null}
          onChange={onChangeDate}
          slots={{
            openPickerIcon: () => props.endIcon || <Calendar size={20} />,
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
};
