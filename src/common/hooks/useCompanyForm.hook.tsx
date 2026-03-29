/* eslint-disable @typescript-eslint/no-explicit-any */
import { mapCompanyToForm } from "@sr/modules/common/mappers";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useFormikContext } from "formik";
import { useCallback, useRef, useState } from "react";
import { notify } from "../iu/components/notifications";
import { useFindCompany } from "./useFindCompany.hook";

const MAX_ATTEMPTS = 5;

export const useCompanyForm = () => {
  const { values, setFieldValue, validateForm } = useFormikContext<any>();
  const attemptCount = useRef(0);

  const [showError, setShowError] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const [searchParams, setSearchParams] = useState({
    code: "",
    memberType: "",
  });

  const { isFetching, refetch } = useFindCompany({
    code: searchParams.code,
    memberType: searchParams.memberType,
  });

  const handlerOnSubmit = async (
    code: string,
    memberType: string = "PARTNER",
  ) => {
    if (!code || code.replace(/\D/g, "").length < 14) {
      notify.warning("Mínimo 14 dígitos para seguir com a consulta!");
      return;
    }

    setShowError(false);
    setIsDuplicate(false);

    try {
      setSearchParams({ code, memberType });

      const result = await refetch();

      if (result.isError || !result.data) {
        throw result.error || new Error("O CNPJ não foi encontrado.");
      }

      const formattedData = mapCompanyToForm(result.data);
      const { address, ...company } = formattedData;

      Object.entries(company).forEach(([key, value]) =>
        setFieldValue(`company.${key}`, value),
      );
      Object.entries(address).forEach(([key, value]) =>
        setFieldValue(`address.${key}`, value),
      );

      notify.success(`Consulta realizada com sucesso.`);
      attemptCount.current = 0;
      validateForm();
    } catch (error: any) {
      attemptCount.current += 1;
      setShowError(true);

      const errorMessage =
        error?.response?.errors?.[0]?.message || error?.message || "";

      const reachedLimit = attemptCount.current >= MAX_ATTEMPTS;
      const isDuplicateCNPJ = errorMessage.includes("já está cadastrado");

      if (isDuplicateCNPJ) {
        setIsDuplicate(true);
        attemptCount.current = 0;
      }

      const msg = reachedLimit
        ? "Erro ao consultar CNPJ. Entre em contato com nosso suporte."
        : GetErrorMessage(error, "Ops! Algo deu errado ao consultar o CNPJ.");

      isDuplicateCNPJ ? notify.warning(msg) : notify.error(msg);
    }
  };

  const handleCompanyChange = useCallback(
    (value: string) => {
      setFieldValue("company", {
        ...values.company,
        id: -1,
        companyCode: "",
        code: value,
        businessName: "",
        fantasyName: "",
        stateRegistration: "",
      });

      if (showError) setShowError(false);
      if (isDuplicate) setIsDuplicate(false);
    },
    [values.company, setFieldValue, showError, isDuplicate],
  );

  const handleReset = useCallback(() => {
    setShowError(false);
    setIsDuplicate(false);
    setFieldValue("company", {
      ...values.company,
      businessName: "",
      code: "",
    });
    setFieldValue("address", {
      id: -1,
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
    });
  }, [values.company, setFieldValue]);

  return {
    handlerOnSubmit,
    handleCompanyChange,
    handleReset,
    isFetching,
    showError,
    isDuplicate,
    values,
    setFieldValue,
  };
};
