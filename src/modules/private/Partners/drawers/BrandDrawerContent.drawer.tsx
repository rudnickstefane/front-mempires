/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerButtons } from "@sr/common/components/Drawer/DrawerButtons";
import {
  ClientsForm,
  CompanyForm,
  ContactsForm,
} from "@sr/common/components/Forms";
import { Show } from "@sr/common/components/Show";
import { isAbortError } from "@sr/common/constants";
import { BrandClientPolicyEnum } from "@sr/common/enums";
import { useDrawerStore, useMultiStepForm } from "@sr/common/hooks";
import { FormController } from "@sr/common/iu/components/Forms";
import { notify } from "@sr/common/iu/components/notifications";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useNavigationStore } from "@sr/store";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { initialBrandValues, stepBrandFields } from "../constants";
import * as Hook from "../hooks";
import { DrawerFormBrandProps } from "../types";
import { formBrandValidationSchema } from "../validation";

export function BrandDrawerContent({
  initialData,
}: {
  initialData?: DrawerFormBrandProps;
}) {
  const { params } = useNavigationStore();
  const { activeStep, setActiveStep, closeDrawer, setSteps } = useDrawerStore();
  const { mutateAsync: upsertBrand } = Hook.useUpsertBrand();

  const handlerOnSubmit = async (values: DrawerFormBrandProps) => {
    const isCreate = !values.brandCode;

    const payload = {
      data: {
        origin: "PORTAL",
        operation: isCreate ? "CREATE" : "UPDATE",
        brandCode: values.brandCode ?? "",
        partnerCode: params?.partnerCode ?? "",
        name: values.name,
        brandClientPolicy: values.brandClientPolicy,
        clients: values.clients?.map((c: any) => ({
          clientCode: c.clientCode,
        })),
        company: { ...values.company },
        address: { ...values.address },
        details: {
          ...values.details,
          status: isCreate ? "ACTIVE" : values.details.status,
        },
        contacts: Object.values(values.contacts || {}).map((contact: any) => ({
          ...contact,
        })),
      },
    };

    try {
      await upsertBrand({ payload });
      closeDrawer();

      notify.success(
        `Bandeira ${isCreate ? "cadastrada" : "alterada"} com sucesso.`,
      );
    } catch (error: any) {
      if (isAbortError(error)) return;

      const msg = GetErrorMessage(
        error,
        `Ops! Algo deu errado ao processar solicitação. Tente novamente!`,
      );

      notify.error(msg);
    }
  };

  const formData = useFormik<DrawerFormBrandProps>({
    initialValues: initialBrandValues(initialData),
    validationSchema: formBrandValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: handlerOnSubmit,
  });

  const isExclusive =
    formData.values.brandClientPolicy === BrandClientPolicyEnum.EXCLUSIVE;

  useEffect(() => {
    const names = isExclusive
      ? ["Dados da bandeira", "Convênios", "Contato"]
      : ["Dados da bandeira", "Contato"];

    setSteps(names);
  }, [isExclusive, setSteps]);

  const stepsConfig = useMemo(() => {
    const allSteps = [
      {
        key: "company",
        title: "Dados da bandeira",
        Component: () => <CompanyForm type="brand" />,
      },
      {
        key: "clients",
        title: "Convênios",
        Component: ClientsForm,
      },
      {
        key: "contacts",
        title: "Contato",
        Component: ContactsForm,
      },
    ];

    if (!isExclusive) {
      return allSteps.filter((step) => step.key !== "clients");
    }

    return allSteps;
  }, [isExclusive]);

  const isEditingContactPending = useMemo(() => {
    return (
      activeStep === 1 &&
      (!!formData.values._tempType ||
        !!formData.values._tempDescription ||
        !!formData.values._tempEmail)
    );
  }, [activeStep, formData.values]);

  const stepFieldsDynamic = useMemo(() => {
    const mapping: Record<number, string[]> = {};
    stepsConfig.forEach((step, index) => {
      if (step.key === "company") mapping[index] = stepBrandFields[0];
      if (step.key === "clients") mapping[index] = ["clients"];
      if (step.key === "contacts") mapping[index] = ["contacts"];
    });
    return mapping;
  }, [stepsConfig]);

  const multiStep = useMultiStepForm({
    totalSteps: stepsConfig.length,
    formData,
    stepFields: stepFieldsDynamic,
    stepsConfig,
    activeStep,
    setActiveStep,
  });

  const CurrentStep = stepsConfig[activeStep].Component;
  const isCompanyLoaded =
    !!formData.values.company.businessName && !!formData.values.address.address;

  return (
    <FormController
      value={formData}
      onKeyDown={(e) => {
        if (e.key === "Enter" && activeStep < stepsConfig.length - 1) {
          e.preventDefault();

          multiStep.handleNext();
        }
      }}
    >
      <CurrentStep />
      <Show hidden={activeStep === 0 && !isCompanyLoaded}>
        <DrawerButtons
          activeStep={activeStep}
          title={stepsConfig.map((s) => s.title)}
          onClose={closeDrawer}
          handleBack={() => {
            multiStep.handleBack();
          }}
          handleNext={async () => {
            await multiStep.handleNext();
          }}
          isValid={
            multiStep.isStepValid(activeStep) && !isEditingContactPending
          }
          isLoading={formData.isSubmitting}
          isDirty={formData.dirty}
        />
      </Show>
    </FormController>
  );
}
