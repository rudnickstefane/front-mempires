/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerButtons } from "@sr/common/components/Drawer/DrawerButtons";
import {
  AddressForm,
  ContactsForm,
  UserDetailsForm,
} from "@sr/common/components/Forms";
import { useMultiStepForm } from "@sr/common/hooks";
import { FormController } from "@sr/common/iu/components/forms";
import { notify } from "@sr/common/iu/components/notifications";
import { ProfileProps } from "@sr/common/types";
import {
  initialUserDetailsValues,
  stepProfileFields,
} from "@sr/modules/private/Profile/constants";
import { formUserValidationSchema } from "@sr/modules/private/Profile/validation";
import { useFormik } from "formik";
import { useMemo, useState } from "react";

export const useProfileGymManagement = ({ data, refresh }: ProfileProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    []
  );

  const handlerOnSubmit = async (values: any) => {
    try {
      notify.success("teste");
    } catch (error: unknown) {
      notify.error("Ops! Algo deu errado ao autenticar-se.");
    }
  };

  const formData = useFormik({
    initialValues: initialUserDetailsValues(data.profile),
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

  const openDrawer = (step = 0) => {
    formData.resetForm({ values: initialUserDetailsValues(data?.profile) });
    setIsDrawerOpen(true);
    setActiveStep(step);
    formData.validateForm();
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
        />
      </FormController>
    ),
  };

  return {
    drawerContentProps,
    isDrawerOpen,
    openDrawer,
    closeDrawer: () => setIsDrawerOpen(false),
  };
};
