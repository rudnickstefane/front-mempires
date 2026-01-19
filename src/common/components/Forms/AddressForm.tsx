import { Box, Typography } from "@mui/material";
import { listUF } from "@sr/common/constants";
import { useAddressForm, useContentHook } from "@sr/common/hooks";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { notify } from "@sr/common/iu/components/notifications";
import { Alert } from "@sr/common/ui/Alert";
import { DrawerFormUserProps } from "@sr/modules/private/Profile/types";
import { formatText } from "@sr/utils";
import { useFormikContext } from "formik";
import { Location } from "iconsax-react";
import { ChangeEvent, useMemo, useState } from "react";
import { Show } from "../Show";
import { CustomizedSwitch } from "../Switch";

export function AddressForm() {
  const label = useContentHook();
  const { handlerOnSubmit } = useAddressForm();
  const [showError, setShowError] = useState(false);
  const { values, setFieldValue, getFieldMeta, validateForm } =
    useFormikContext<DrawerFormUserProps>();
  const [isFetched, setIsFetched] = useState(false);

  const [forceManual, setForceManual] = useState({
    address: false,
    district: false,
    city: false,
    state: false,
  });

  const { address, number, district, city, state, zipCode, complement } =
    values.address;

  const visibility = useMemo(
    () => ({
      address: isFetched && (!address || forceManual.address),
      district: isFetched && (!district || forceManual.district),
      city: isFetched && (!city || forceManual.city),
      state: isFetched && (!state || forceManual.state),
    }),
    [address, district, city, state, forceManual, isFetched],
  );

  const handleZipCodeConsult = async (zipCode: string) => {
    if (!zipCode || zipCode.replace(/\D/g, "").length < 8) {
      notify.warning("Minimo 8 digitos para seguir com a consulta!");
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

    const result = await handlerOnSubmit(zipCode, setFieldValue);

    setShowError(!result);
    setIsFetched(!!result);

    result &&
      setForceManual({
        address: !result.address,
        district: !result.district,
        city: !result.city,
        state: !result.state,
      });

    validateForm();
  };

  const isNoNumber = number === "S/N";
  const hasError = !!(
    getFieldMeta("address.number").touched &&
    getFieldMeta("address.number").error
  );

  const handleFormattedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, formatText(value));
  };

  const handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setFieldValue("address", {
      ...values.address,
      id: -1,
      zipCode: value,
      address: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
    });

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
        <Box className="flex items-start gap-2">
          <Location variant="Linear" />
          <Box>
            <Typography className="!font-poppins !font-semibold !text-neutral-800">
              {address}, nº {number} {complement && `- ${complement}`}{" "}
              {district && `- ${district}`}
            </Typography>
            <Typography className="!font-poppins !text-sm !text-neutral-600">
              {city} - {state}, {zipCode}
            </Typography>
          </Box>
        </Box>
      </Box>

      <TextField
        required
        name="address.zipCode"
        label={label.address.zipCode}
        mask="00000-000"
        showButton
        labelButton="Consultar"
        hook={handleZipCodeConsult}
        onChange={handleZipCodeChange}
      />

      {showError ? (
        <Alert
          variant="error"
          title="O CEP informado não foi encontrado."
          message="Digite outro CEP ou entre em contato com nosso time de suporte."
        />
      ) : (
        <>
          <Show hidden={!visibility.address}>
            <TextField
              required
              name="address.address"
              placeholder="Rua/Avenida"
              label={label.address.address}
              onChange={handleFormattedTextChange}
            />
          </Show>

          <Box className="w-full flex flex-row gap-x-4 items-center">
            <TextField
              required
              name="address.number"
              label={label.address.number}
              fullWidth
              disabled={isNoNumber}
            />
            <Box className={`w-full ${hasError ? "-mt-[21px]" : "mt-[1.5px]"}`}>
              <CustomizedSwitch
                label="Sem número"
                checked={isNoNumber}
                onChange={(e) =>
                  setFieldValue("address.number", e.target.checked ? "S/N" : "")
                }
              />
            </Box>
          </Box>

          <TextField
            name="address.complement"
            label={label.address.complement}
            onChange={handleFormattedTextChange}
          />

          <Show hidden={!visibility.district}>
            <TextField
              required
              name="address.district"
              label={label.address.district}
              onChange={handleFormattedTextChange}
            />
          </Show>

          <Show hidden={!visibility.city || !visibility.state}>
            <Box className="w-full flex flex-row gap-x-4">
              <Show hidden={!visibility.city}>
                <TextField
                  required
                  name="address.city"
                  label={label.address.city}
                  fullWidth
                  onChange={handleFormattedTextChange}
                />
              </Show>
              <Show hidden={!visibility.state}>
                <TextField
                  required
                  name="address.state"
                  label={label.address.state}
                  fullWidth
                  options={listUF.brasil}
                />
              </Show>
            </Box>
          </Show>
        </>
      )}
    </Box>
  );
}
