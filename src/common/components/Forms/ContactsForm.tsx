/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Box } from "@mui/material";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { DrawerFormUserProps } from "@sr/modules/private/Profile/types";
import { formatPhoneNumber, formatText } from "@sr/utils";
import { useFormikContext } from "formik";
import { ChangeEvent } from "react";

export function ContactsForm() {
  const { setFieldValue } = useFormikContext<DrawerFormUserProps>();

  const handleFormattedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, formatText(value));
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, formatPhoneNumber(value));
  };

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex flex-col gap-4">
        <TextField
          required
          fullWidth
          name="contact.description"
          label="Descrição"
          disabled
          onChange={handleFormattedTextChange}
        />
        <Box className="grid grid-cols-2 gap-4">
          <TextField
            required
            fullWidth
            name="contact.phone"
            label="Telefone"
            onChange={handlePhoneChange}
          />

          <TextField required name="contact.email" label="E-mail" />
        </Box>
      </Box>
    </Box>
  );
}
