/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerButtons } from "@sr/common/components/Drawer/DrawerButtons";
import { CompanyForm, ContactsForm } from "@sr/common/components/Forms";
import { Show } from "@sr/common/components/Show";
import { useMultiStepForm } from "@sr/common/hooks";
import { FormController } from "@sr/common/iu/components/Forms";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import * as Hook from ".";
import { initialPartnerValues, stepPartnerFields } from "../constants";
import { DrawerFormPartnerProps } from "../types";
import { formPartnerValidationSchema } from "../validation";

export const usePartnerHook = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { mutateAsync: upsertPartner } = Hook.useUpsertPartner();

  const stepsConfig = useMemo(
    () => [
      {
        key: "company",
        title: "Dados do parceiro",
        component: <CompanyForm />,
      },
      { key: "contacts", title: "Contato", component: <ContactsForm /> },
    ],
    [],
  );

  const handlerOnSubmit = async (values: DrawerFormPartnerProps) => {
    const payload = {
      data: {
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
          description: String(contact.description),
          phone: String(contact.phone),
          email: String(contact.email),
          type: contact.type,
        })),
      },
    };

    await upsertPartner(payload, {
      onSuccess: () => {
        setIsDrawerOpen(false);
      },
    });
  };

  const formData = useFormik<DrawerFormPartnerProps>({
    initialValues: initialPartnerValues(),
    validationSchema: formPartnerValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: handlerOnSubmit,
  });

  const {
    activeStep,
    setActiveStep,
    handleNext,
    handleBack,
    isStepValid,
    onStepClick,
  } = useMultiStepForm({
    totalSteps: stepsConfig.length,
    formData,
    stepFields: stepPartnerFields,
    stepsConfig,
  });

  const openDrawer = async (step = 0) => {
    const initialValues = initialPartnerValues();
    formData.resetForm({ values: initialValues });

    await formData.validateForm(initialValues);

    setIsDrawerOpen(true);
    setActiveStep(step);
  };

  const isCompanyLoaded =
    !!formData.values.company.businessName && !!formData.values.address.address;

  const drawerContentProps = {
    header: {
      title: "Novo Parceiro",
      headerStep: `Etapa ${activeStep + 1} de ${stepsConfig.length}`,
    },
    steps: stepsConfig.map((s) => s.title),
    activeStep: activeStep,
    isValid: isStepValid(activeStep),
    onStepClick: onStepClick,
    content: (
      <FormController value={formData}>
        {stepsConfig[activeStep].component}
        <Show hidden={activeStep === 0 && !isCompanyLoaded}>
          <DrawerButtons
            activeStep={activeStep}
            title={stepsConfig.map((s) => s.title)}
            onClose={() => setIsDrawerOpen(false)}
            handleBack={handleBack}
            handleNext={handleNext}
            isValid={isStepValid(activeStep)}
            isLoading={formData.isSubmitting}
            isDirty={formData.dirty}
          />
        </Show>
      </FormController>
    ),
  };

  return {
    isDrawerOpen,
    drawerContentProps,
    openDrawer,
    closeDrawer: () => setIsDrawerOpen(false),
  };
};
