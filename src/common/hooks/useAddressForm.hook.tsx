import { useBackend } from "@sr/modules/common/hooks";
import { FindAddressResponse } from "@sr/modules/common/types";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useRef } from "react";
import { QueryFindAddress } from "../graphql";
import { notify } from "../iu/components/notifications";
import { getStateAbbreviation } from "../utils";

const MAX_ATTEMPTS = 5;

export const useAddressForm = () => {
  const { request } = useBackend();
  const attemptCount = useRef(0);

  const handlerOnSubmit = async (
    zipCode: string,
    setFieldValue: (field: string, value: string | number) => void,
  ) => {
    try {
      const response = await request<FindAddressResponse>(QueryFindAddress, {
        zipCode,
      });
      const addressData = response?.findAddress;

      const data = {
        id: addressData.id || -1,
        address: addressData?.address || "",
        district: addressData?.district || "",
        city: addressData?.city || "",
        state: getStateAbbreviation(addressData?.state) || "",
      };

      Object.entries(data).forEach(([key, value]) => {
        setFieldValue(`address.${key}`, value);
      });

      attemptCount.current = 0;

      notify.success(`Endereço para o CEP ${zipCode} carregado com sucesso.`);
      return data;
    } catch (error: unknown) {
      attemptCount.current += 1;

      const msg =
        attemptCount.current >= MAX_ATTEMPTS
          ? "Erro ao consultar o CEP. Entre em contato com nosso suporte."
          : GetErrorMessage(
              error,
              `Ops! Algo deu errado ao consultar o CEP ${zipCode}.`,
            );

      notify.error(msg);
      return null;
    }
  };

  return { handlerOnSubmit };
};
