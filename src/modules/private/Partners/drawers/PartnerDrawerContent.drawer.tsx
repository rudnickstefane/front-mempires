/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerButtons } from "@sr/common/components/Drawer/DrawerButtons";
import { CompanyForm, ContactsForm } from "@sr/common/components/Forms";
import { Show } from "@sr/common/components/Show";
import { useDrawerStore, useMultiStepForm } from "@sr/common/hooks";
import { FormController } from "@sr/common/iu/components/Forms";
import { useFormik } from "formik";
import { useMemo } from "react";
import { initialPartnerValues, stepPartnerFields } from "../constants";
import * as Hook from "../hooks";
import { DrawerFormPartnerProps } from "../types";
import { formPartnerValidationSchema } from "../validation";

export function PartnerDrawerContent({
  initialData,
}: {
  initialData?: DrawerFormPartnerProps;
}) {
  const { activeStep, setActiveStep, closeDrawer } = useDrawerStore();
  const { mutateAsync: upsertPartner } = Hook.useUpsertPartner();

  const stepsConfig = useMemo(
    () => [
      { key: "company", title: "Dados do parceiro", Component: CompanyForm },
      { key: "contacts", title: "Contato", Component: ContactsForm },
    ],
    [],
  );

  const handlerOnSubmit = async (values: DrawerFormPartnerProps) => {
    const payload = {
      data: {
        // ...values,
        // origin: "PORTAL",
        // operation: values.partnerCode ? "UPDATE" : "CREATE",
        // fee: parseFloat(String(values.fee)),
        // rewardsRate: parseFloat(String(values.rewardsRate)),
        origin: "PORTAL",
        operation: "CREATE",
        fee: parseFloat(String(values.fee)),
        rewardsRate: parseFloat(String(values.rewardsRate)),
        segment: values.segment,
        entity: values.entity,
        company: { ...values.company },
        address: { ...values.address },
        details: { ...values.details, status: "ACTIVE" },
        contacts: Object.values(values.contacts || {}).map((contact: any) => ({
          ...contact,
          phone: String(contact.phone),
        })),
      },
    };

    await upsertPartner(payload as any, {
      onSuccess: () => closeDrawer(),
    });
  };

  const formData = useFormik<DrawerFormPartnerProps>({
    initialValues: initialPartnerValues(initialData),
    validationSchema: formPartnerValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: handlerOnSubmit,
  });

  const multiStep = useMultiStepForm({
    totalSteps: stepsConfig.length,
    formData,
    stepFields: stepPartnerFields,
    stepsConfig,
  });

  const CurrentStep = stepsConfig[activeStep].Component;
  const isCompanyLoaded =
    !!formData.values.company.businessName && !!formData.values.address.address;

  return (
    <FormController value={formData}>
      <CurrentStep />
      <Show hidden={activeStep === 0 && !isCompanyLoaded}>
        <DrawerButtons
          activeStep={activeStep}
          title={stepsConfig.map((s) => s.title)}
          onClose={closeDrawer}
          handleBack={() => {
            multiStep.handleBack();
            setActiveStep(activeStep - 1);
          }}
          handleNext={async () => {
            multiStep.handleNext();
            setActiveStep(activeStep + 1);
          }}
          isValid={multiStep.isStepValid(activeStep)}
          isLoading={formData.isSubmitting}
          isDirty={formData.dirty}
        />
      </Show>
    </FormController>
  );
}
