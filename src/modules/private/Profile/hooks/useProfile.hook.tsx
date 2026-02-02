import { DrawerButtons } from "@sr/common/components/Drawer/DrawerButtons";
import {
  AddressForm,
  ContactsForm,
  UserDetailsForm,
} from "@sr/common/components/Forms";
import { useMultiStepForm } from "@sr/common/hooks";
import { FormController } from "@sr/common/iu/components/Forms";
import { storage } from "@sr/common/storage";
import {
  initialUserDetailsValues,
  stepProfileFields,
} from "@sr/modules/private/Profile/constants";
import { formUserValidationSchema } from "@sr/modules/private/Profile/validation";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import * as Hook from "../hooks";
import { DrawerFormUserProps } from "../types";

export const useProfileHook = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { mutateAsync: upsertUser } = Hook.useUpsertUser();
  const { data: profileData, isPending } = Hook.useFindUserDetails();

  const stepsConfig = useMemo(
    () => [
      {
        key: "details",
        title: "Dados pessoais",
        component: <UserDetailsForm />,
      },
      { key: "address", title: "Endereço", component: <AddressForm /> },
      { key: "contact", title: "Contato", component: <ContactsForm /> },
    ],
    [],
  );

  const handlerOnSubmit = async (values: DrawerFormUserProps) => {
    const payload = {
      data: {
        origin: "PORTAL",
        operation: "UPDATE",
        companyCode: storage.get<string>("companyCode"),
        profileCode: storage.get<string>("profileCode"),
        details: { ...values.details },
        address: { ...values.address },
        contact: {
          ...values.contact,
          type: "MAIN",
          validationEmail: "VALIDATED",
        },
      },
    };

    await upsertUser(payload, {
      onSuccess: () => {
        setIsDrawerOpen(false);
      },
    });
  };

  const formData = useFormik<DrawerFormUserProps>({
    initialValues: initialUserDetailsValues(profileData),
    validationSchema: formUserValidationSchema,
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
    stepFields: stepProfileFields,
    stepsConfig,
  });

  const openDrawer = async (step = 0) => {
    const initialValues = initialUserDetailsValues(profileData);
    formData.resetForm({ values: initialValues });

    await formData.validateForm(initialValues);

    setIsDrawerOpen(true);
    setActiveStep(step);
  };

  const drawerContentProps = {
    header: {
      title: "Alterar Dados",
      headerStep: `Etapa ${activeStep + 1} de ${stepsConfig.length}`,
    },
    steps: stepsConfig.map((s) => s.title),
    activeStep: activeStep,
    isValid: isStepValid(activeStep),
    onStepClick: onStepClick,
    content: (
      <FormController value={formData}>
        {stepsConfig[activeStep].component}
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
      </FormController>
    ),
  };

  return {
    isPending,
    openDrawer,
    profileData,
    isDrawerOpen,
    drawerContentProps,
    closeDrawer: () => setIsDrawerOpen(false),
  };
};
