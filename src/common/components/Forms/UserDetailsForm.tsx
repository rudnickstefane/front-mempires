import { Box } from "@mui/material";
import { listGender } from "@sr/common/constants";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { Alert } from "@sr/common/ui/Alert";
import { DrawerFormUserProps } from "@sr/modules/private/Profile/types";
import { formatDocument, formatText } from "@sr/utils";
import { useFormikContext } from "formik";
import { ChangeEvent } from "react";

export function UserDetailsForm() {
  const { setFieldValue } = useFormikContext<DrawerFormUserProps>();

  const handleFormattedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, formatText(value));
  };

  const handleDocumentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, formatDocument(value));
  };

  return (
    <Box className="flex flex-col gap-6">
      <Alert
        title="Atenção"
        message={
          <>
            Os dados de <strong>CPF</strong> e <strong>Nome Completo</strong>{" "}
            são protegidos por segurança. Para garantir a integridade da sua
            conta, alterações nesses campos só podem ser realizadas mediante
            abertura de chamado junto ao nosso time de suporte.
            <br />
            <br />
            Se precisar atualizar essas informações, nossa equipe está à
            disposição para ajudar.
          </>
        }
      />
      <TextField
        required
        fullWidth
        name="details.code"
        label="CPF"
        mask="000.000.000-00"
        disabled
      />
      <TextField
        required
        fullWidth
        name="details.name"
        label="Nome completo"
        disabled
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
        name="details.identity"
        label="Documento"
        onChange={handleDocumentChange}
      />
      <TextField
        name="details.gender"
        label="Gênero"
        fullWidth
        options={listGender}
      />
    </Box>
  );
}
