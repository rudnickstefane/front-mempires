/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerButtons } from "@sr/common/components/Drawer/DrawerButtons";
import { CompanyForm, ContactsForm } from "@sr/common/components/Forms";
import { Show } from "@sr/common/components/Show";
import { isAbortError } from "@sr/common/constants";
import { useDrawerStore, useMultiStepForm } from "@sr/common/hooks";
import { FormController } from "@sr/common/iu/components/Forms";
import { notify } from "@sr/common/iu/components/notifications";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useNavigationStore } from "@sr/store";
import { useFormik } from "formik";
import { useMemo } from "react";
import {
  initialEstablishmentValues,
  stepEstablishmentFields,
} from "../constants";
import * as Hook from "../hooks";
import { DrawerFormEstablishmentProps } from "../types";
import { formEstablishmentValidationSchema } from "../validation";

export function EstablishmentDrawerContent({
  initialData,
}: {
  initialData?: DrawerFormEstablishmentProps;
}) {
  const { params } = useNavigationStore();
  const { activeStep, setActiveStep, closeDrawer } = useDrawerStore();
  const { mutateAsync: upsertEstablishment } = Hook.useUpsertEstablishment();

  const stepsConfig = useMemo(
    () => [
      {
        key: "company",
        title: "Dados da loja",
        Component: () => <CompanyForm type="establishment" />,
      },
      { key: "contacts", title: "Contato", Component: ContactsForm },
    ],
    [],
  );

  const handlerOnSubmit = async (values: DrawerFormEstablishmentProps) => {
    const isCreate = !values.establishmentCode;

    const payload = {
      data: {
        origin: "PORTAL",
        operation: isCreate ? "CREATE" : "UPDATE",
        brandCode: values?.brandCode,
        partnerCode: params?.partnerCode ?? "",
        establishmentCode: values.establishmentCode ?? "",
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
      await upsertEstablishment({ payload });
      closeDrawer();

      notify.success(
        `Loja ${isCreate ? "cadastrada" : "alterada"} com sucesso.`,
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

  const formData = useFormik<DrawerFormEstablishmentProps>({
    initialValues: initialEstablishmentValues(initialData),
    validationSchema: formEstablishmentValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: handlerOnSubmit,
  });

  const isEditingContactPending = useMemo(() => {
    return (
      activeStep === 1 &&
      (!!formData.values._tempType ||
        !!formData.values._tempDescription ||
        !!formData.values._tempEmail)
    );
  }, [activeStep, formData.values]);

  const multiStep = useMultiStepForm({
    totalSteps: stepsConfig.length,
    formData,
    stepFields: stepEstablishmentFields,
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
