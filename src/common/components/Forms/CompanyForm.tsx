import { Box } from "@mui/material";
import { listEntity } from "@sr/common/constants";
import { listSegment } from "@sr/common/constants/ListSegment.const";
import { useCompanyForm } from "@sr/common/hooks";
import { Button } from "@sr/common/iu/components/Button";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { Typography } from "@sr/common/iu/components/Typography";
import { Alert } from "@sr/common/ui/Alert";
import { formatText, formatZipCode } from "@sr/utils";
import { Edit, Location } from "iconsax-react";
import { ChangeEvent } from "react";
import { Show } from "../Show";

export function CompanyForm() {
  const {
    handlerOnSubmit,
    handleCompanyChange,
    handleReset,
    showError,
    isDuplicate,
    values,
    setFieldValue,
  } = useCompanyForm();

  const { code, businessName } = values.company;
  const { address, number, district, city, state, zipCode, complement } =
    values.address;

  const isCompanyLoaded = !!businessName && !!address;

  return (
    <Box>
      <Show hidden={isCompanyLoaded}>
        <Box className="flex flex-col gap-4">
          <TextField
            required
            name="company.code"
            label="company.code"
            mask="00.000.000/0000-00"
            showButton
            labelButton="Consultar"
            hook={handlerOnSubmit}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleCompanyChange(e.target.value)
            }
          />
          {showError && (
            <Alert
              variant={isDuplicate ? "warning" : "error"}
              title={
                isDuplicate
                  ? "O CNPJ já está cadastrado"
                  : "O CNPJ não foi encontrado"
              }
              message={
                isDuplicate
                  ? "Digite outro CNPJ ou entre em contato com nosso time de suporte."
                  : "Verifique o número ou digite um novo CNPJ para pesquisar."
              }
            />
          )}
        </Box>
      </Show>

      <Show hidden={!isCompanyLoaded}>
        <Box className="flex flex-row justify-between p-4 rounded-lg bg-neutral-100 w-full">
          <Box className="flex flex-col items-start gap-3">
            <Box>
              <Typography
                className="font-bold text-xl text-neutral-900"
                translateId={businessName}
              />
              <Typography className="font-semibold text-base text-neutral-500">
                {code}
              </Typography>
            </Box>
            <Typography className="text-sm text-neutral-500 flex items-center gap-2">
              <Location variant="Linear" size={24} className="text-black" />
              {`${formatText(address)}, nº ${number} ${complement && ` - ${formatText(complement)}`} - ${formatText(district)}, ${formatText(city)} -
                ${state}, ${formatZipCode(zipCode)}`}
            </Typography>
          </Box>
          <Button
            className="min-w-8 h-8 text-neutral-900 transition-all p-0 hover:bg-neutral-200 hover:scale-105 rounded-lg"
            onClick={handleReset}
          >
            <Edit size={22} variant="Linear" />
          </Button>
        </Box>

        <TextField
          required
          name="segment"
          label="Segmento"
          fullWidth
          options={listSegment.segments}
        />

        <TextField
          required
          name="entity"
          label="Organização"
          fullWidth
          options={listEntity.entities}
        />

        <TextField
          required
          fullWidth
          name="details.abbreviation"
          label="abbreviation"
          maxLength={20}
        />

        <TextField
          required
          datePicker
          name="details.effectiveStart"
          label="Início da vigência"
          onChangeDate={(newDate) =>
            setFieldValue("details.effectiveStart", newDate)
          }
        />

        <TextField
          required
          datePicker
          name="details.effectiveEnd"
          label="Fim da vigência"
          onChangeDate={(newDate) =>
            setFieldValue("details.effectiveEnd", newDate)
          }
        />

        <TextField
          required
          name="fee"
          placeholder="0.00"
          label="Taxa administrativa (%)"
          mask="0.00"
          fullWidth
        />

        <TextField
          required
          name="rewardsRate"
          placeholder="0.00"
          label="Taxa de rewards (%)"
          mask="0.00"
          fullWidth
        />
      </Show>
    </Box>
  );
}
