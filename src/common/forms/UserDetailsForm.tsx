import { Box } from "@mui/material";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { DrawerFormUserProps } from "@sr/modules/private/Profile/types";
import { formatText } from "@sr/utils";
import { useFormikContext } from "formik";
import { ChangeEvent } from "react";
import { Show } from "../components/Show";

interface UserDetailsFormProps {
  isBeneficiary?: boolean;
}

export function UserDetailsForm({
  isBeneficiary = true,
}: UserDetailsFormProps) {
  const { setFieldValue } = useFormikContext<DrawerFormUserProps>();

  const handleFormattedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, formatText(value));
  };

  return (
    <Box className="flex flex-col gap-6">
      <TextField
        required
        name="details.name"
        label="Nome completo"
        onChange={handleFormattedTextChange}
      />
      <TextField
        required
        datePicker
        name="details.birthDate"
        label="Data de nascimento"
        onChangeDate={(newDate) => setFieldValue("details.birthDate", newDate)}
      />
      <TextField
        required
        name="details.code"
        label="CPF"
        mask="000.000.000-00"
      />
      <Show hidden={isBeneficiary}>
        <TextField required name="details.identity" label="Documento" />
      </Show>
    </Box>
  );
}
