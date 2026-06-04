import { Box } from "@mui/material";
import { useCompanyForm } from "@sr/common/hooks";
import { Button } from "@sr/common/iu/components/Button";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { Typography } from "@sr/common/iu/components/Typography";
import { Alert } from "@sr/common/ui/Alert";
import { FormatCode } from "@sr/modules/common/utils/FormatCodeAndIdentity.util";
import { formatText, formatZipCode } from "@sr/utils";
import { Edit, Location } from "iconsax-react";
import { ChangeEvent } from "react";
import { Show } from "../Show";
import { CompanySpecificForm } from "./CompanySpecificForm";

type CompanyFormType =
  | "partner"
  | "brand"
  | "establishment"
  | "client"
  | "affiliate";

interface CompanyFormProps {
  type: CompanyFormType;
}

export function CompanyForm({ type }: CompanyFormProps) {
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
            hook={(code: string) => handlerOnSubmit(code, type.toUpperCase())}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleCompanyChange(e.target.value)
            }
          />
          {showError && (
            <Alert
              variant={isDuplicate ? "warning" : "error"}
              title={
                isDuplicate
                  ? "O CNPJ informado já está cadastrado."
                  : "O CNPJ informado não foi encontrado."
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
                {code && FormatCode(code)}
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

        <CompanySpecificForm type={type} setFieldValue={setFieldValue} />
      </Show>
    </Box>
  );
}
