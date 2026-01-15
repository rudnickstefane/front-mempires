import { Box } from "@mui/material";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { DrawerFormUserProps } from "@sr/modules/private/Profile/types";
import { formatText } from "@sr/utils";
import { useFormikContext } from "formik";
import { ChangeEvent } from "react";
import { listUF } from "../../constants";
import { useContentHook } from "../../hooks";
import { CustomizedSwitch } from "../Switch/CustomizedSwitch";

export function AddressForm() {
  const label = useContentHook();
  const { values, setFieldValue, getFieldMeta } =
    useFormikContext<DrawerFormUserProps>();

  const meta = getFieldMeta("address.number");
  const hasError = !!(meta.touched && meta.error);
  const isNoNumber = values.address.number === "S/N";

  const handleToggleNoNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setFieldValue("address.number", checked ? "S/N" : "");
  };

  const handleFormattedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, formatText(value));
  };

  return (
    <Box className="flex flex-col gap-6">
      <TextField
        required
        name="address.zipcode"
        label={label.address.zipCode}
        mask="00000-000"
        showButton
        labelButton="Consultar"
        hook={async (value) => {
          console.log("Iniciando consulta para:", value);

          // Simula um atraso de 2 segundos de uma API
          await new Promise((resolve) => setTimeout(resolve, 2000));

          console.log("Consulta finalizada!");
          // Aqui você poderia usar o setFieldValue para preencher outros campos
        }}
      />
      <TextField
        required
        name="address.address"
        placeholder="Rua/Avenida"
        label={label.address.address}
        onChange={handleFormattedTextChange}
      />
      <Box className="w-full flex flex-row gap-x-4 items-center">
        <TextField
          required
          name="address.number"
          label={label.address.number}
          fullWidth
          disabled={values.address.number === "S/N"}
        />
        <Box className={`w-full ${hasError ? "-mt-[21px]" : "mt-[1.5px]"}`}>
          <CustomizedSwitch
            label="Sem número"
            checked={isNoNumber}
            onChange={handleToggleNoNumber}
          />
        </Box>
      </Box>
      <TextField
        name="address.complement"
        label={label.address.complement}
        onChange={handleFormattedTextChange}
      />
      <TextField
        required
        name="address.district"
        label={label.address.district}
        onChange={handleFormattedTextChange}
      />
      <Box className="w-full flex flex-row gap-x-4 justify-between">
        <TextField
          required
          name="address.city"
          label={label.address.city}
          onChange={handleFormattedTextChange}
          fullWidth
        />
        <TextField
          required
          name="address.state"
          label={label.address.state}
          fullWidth
          options={listUF.brasil}
        />
      </Box>
    </Box>
  );
}
