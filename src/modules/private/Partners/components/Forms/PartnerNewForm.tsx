import { Box } from "@mui/material";
import { useCompanyForm } from "@sr/common/hooks";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { notify } from "@sr/common/iu/components/notifications";
import { Typography } from "@sr/common/iu/components/Typography";
import { formatText } from "@sr/utils";
import { useFormikContext } from "formik";
import { Location } from "iconsax-react";
import { ChangeEvent, useState } from "react";
import { DrawerFormPartnerProps } from "../../types";

export function PartnerNewForm() {
  const { handlerOnSubmit } = useCompanyForm();
  const [showError, setShowError] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const { values, setFieldValue, getFieldMeta, validateForm } =
    useFormikContext<DrawerFormPartnerProps>();

  const [forceManual, setForceManual] = useState({
    address: false,
    district: false,
    city: false,
    state: false,
  });

  const { code, businessName } = values.company;
  const { zipCode, address, number, complement, district, city, state } =
    values.address;

  const handleFormattedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, formatText(value));
  };

  const handleZipCodeConsult = async (code: string) => {
    if (!code || code.replace(/\D/g, "").length < 14) {
      notify.warning("Minimo 14 digitos para seguir com a consulta!");
      return;
    }

    setShowError(false);
    setIsFetched(false);
    setForceManual({
      address: false,
      district: false,
      city: false,
      state: false,
    });

    const result = await handlerOnSubmit(code, setFieldValue);

    setShowError(!result);
    setIsFetched(!!result);

    result &&
      setForceManual({
        address: !result?.address?.address,
        district: !result?.address?.district,
        city: !result?.address?.city,
        state: !result?.address?.state,
      });

    validateForm();
  };

  const handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setFieldValue("company.code", value);

    if (showError) setShowError(false);

    setForceManual({
      address: false,
      district: false,
      city: false,
      state: false,
    });
  };

  return (
    <Box className="flex flex-col gap-6">
      <Box className="p-4 rounded-lg bg-neutral-200">
        <Box className="flex flex-col items-start gap-3">
          <Box>
            <Typography
              className="font-manrope font-bold text-neutral-900"
              translateId={businessName}
            />
            <Typography className="font-manrope text-sm font-semibold text-neutral-700">
              {code}
            </Typography>
          </Box>
          <Typography className="font-manrope text-sm text-neutral-600 flex items-center gap-1">
            <Location variant="Linear" size={16} /> {address}, nº {number} -{" "}
            {complement} - {district}, {city} - {state}, {zipCode}
          </Typography>
        </Box>
      </Box>
      <TextField
        required
        name="company.code"
        label="company.code"
        mask="00.000.000/0000-00"
        showButton
        labelButton="Consultar"
        hook={handleZipCodeConsult}
        onChange={handleZipCodeChange}
      />
      <TextField
        required
        fullWidth
        name="details.name"
        label="Abreviação"
        disabled
        onChange={handleFormattedTextChange}
      />
      <TextField
        required
        datePicker
        name="details.birthDate"
        label="Início da vigência"
        onChangeDate={(newDate) => setFieldValue("details.birthDate", newDate)}
      />
      <TextField
        required
        datePicker
        name="details.identity"
        label="Fim da vigência"
        onChangeDate={(newDate) => setFieldValue("details.birthDate", newDate)}
      />
      <TextField
        required
        name="details.gender"
        label="Taxa administrativa"
        fullWidth
      />
      <TextField
        required
        name="details.gender"
        label="Taxa rewards"
        fullWidth
      />
    </Box>
  );
}
