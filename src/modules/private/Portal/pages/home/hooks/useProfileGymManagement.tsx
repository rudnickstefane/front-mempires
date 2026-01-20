/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerButtons } from "@sr/common/components/Drawer/DrawerButtons";
import {
  AddressForm,
  ContactsForm,
  UserDetailsForm,
} from "@sr/common/components/Forms";
import { MutationUpsertUser } from "@sr/common/graphql";
import { useMultiStepForm } from "@sr/common/hooks";
import { FormController } from "@sr/common/iu/components/Forms";
import { notify } from "@sr/common/iu/components/notifications";
import { storage } from "@sr/common/storage";
import { ProfileProps } from "@sr/common/types";
import { useBackend } from "@sr/modules/common/hooks";
import { GetErrorMessage } from "@sr/modules/common/utils";
import {
  initialUserDetailsValues,
  stepProfileFields,
} from "@sr/modules/private/Profile/constants";
import { formUserValidationSchema } from "@sr/modules/private/Profile/validation";
import { useFormik } from "formik";
import { useMemo, useState } from "react";

export const useProfileGymManagement = ({ data, refresh }: ProfileProps) => {
  const { request } = useBackend();
  const [attemptCount, setAttemptCount] = useState(0);
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
    [],
  );

  const handlerOnSubmit = async (values: any) => {
    try {
      const payload = {
        data: {
          origin: "PORTAL",
          operation: "UPDATE",
          companyCode: storage.get<string>("companyCode"),
          profileCode: storage.get<string>("profileCode"),
          details: {
            code: values.details.code,
            name: values.details.name,
            birthDate: values.details.birthDate,
            identity: values.details.identity,
            gender: values.details.gender,
          },
          address: {
            id: values.address.id,
            zipCode: values.address.zipCode,
            address: values.address.address,
            number: values.address.number,
            complement: values.address.complement,
            district: values.address.district,
            city: values.address.city,
            state: values.address.state,
          },
          contact: {
            id: values.contact.id,
            type: "MAIN",
            description: values.contact.description,
            validationEmail: "VALIDATED",
            phone: values.contact.phone,
            email: values.contact.email,
          },
        },
      };

      await request(MutationUpsertUser, payload);

      setIsDrawerOpen(false);
      setAttemptCount(0);
      refresh?.();
      notify.success("Alterações realizadas com sucesso!");
    } catch (error: unknown) {
      setAttemptCount((prev) => prev + 1);
      const msg =
        attemptCount >= 5
          ? `${error}`
          : GetErrorMessage(
              error,
              "Ops! Algo deu errado ao atualizar seus dados. Tente novamente!",
            );

      notify.error(msg);
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

  const openDrawer = async (step = 0) => {
    const initialValues = initialUserDetailsValues(data?.profile);
    console.log(initialValues);
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
    drawerContentProps,
    isDrawerOpen,
    openDrawer,
    closeDrawer: () => setIsDrawerOpen(false),
  };
};
