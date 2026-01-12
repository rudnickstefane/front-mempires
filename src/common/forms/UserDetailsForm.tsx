import { Box } from "@mui/material";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { DrawerFormUserProps } from "@sr/modules/private/Profile/types";
import { formatIdentity, formatText } from "@sr/utils";
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

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 14) return;
    setFieldValue("details.code", formatIdentity(value));
  };

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
        onClear={() => setFieldValue("details.name", "")}
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
        onChange={handleCodeChange}
        onClear={() => setFieldValue("details.code", "")}
        slotProps={{
          htmlInput: { maxLength: 14 },
        }}
      />
      <Show hidden={isBeneficiary}>
        <TextField
          required
          name="details.identity"
          label="Documento"
          onClear={() => setFieldValue("details.identity", "")}
        />
      </Show>
    </Box>
  );
}
