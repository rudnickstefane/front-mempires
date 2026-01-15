/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddressForm, UserDetailsForm } from "@sr/common/components/Forms";
import { FormController } from "@sr/common/iu/components/forms";
import {
  DrawerHeaderProps,
  DrawerStepsProps,
  ProfileProps,
} from "@sr/common/types";
import { stepProfileFields } from "@sr/modules/private/Profile/constants";
import { initialUserDetailsValues } from "@sr/modules/private/Profile/constants/initialUserDetailsValues.const";
import { DrawerFormUserProps } from "@sr/modules/private/Profile/types";
import { formUserValidationSchema } from "@sr/modules/private/Profile/validation";
import { useFormik } from "formik";
import { useState } from "react";

export const useProfileGymManagement = ({ data, refresh }: ProfileProps) => {
  const [activeDrawerStep, setActiveDrawerStep] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const formData = useFormik<DrawerFormUserProps>({
    initialValues: initialUserDetailsValues(data.profile),
    validationSchema: formUserValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleNext = async () => {
    const fieldsInStep = stepProfileFields[activeDrawerStep];

    // Força a validação do Formik
    const errors = await formData.validateForm();

    // Verifica se algum erro retornado pelo Formik pertence aos campos do step atual
    const hasErrorsInCurrentStep = fieldsInStep.some((field) => {
      // Acessa erros aninhados (ex: user.name)
      const parts = field.split(".");
      const fieldError = parts.reduce((obj, key) => obj?.[key], errors as any);
      return !!fieldError;
    });

    // Marca campos como "touched" para que seu TextField exiba o erro
    fieldsInStep.forEach((field) => formData.setFieldTouched(field, true));

    if (!hasErrorsInCurrentStep) {
      if (activeDrawerStep < 2) {
        setActiveDrawerStep((prev) => prev + 1);
      } else {
        formData.handleSubmit();
      }
    }
  };

  const handleBack = () => {
    formData.setTouched({});
    setActiveDrawerStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onStepClick = (step: number) => {
    if (activeDrawerStep === 0) {
      return;
    }

    setActiveDrawerStep(step);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    formData.resetForm();
  };

  const openDrawer = (initialStep: number = 0) => {
    formData.resetForm({ values: initialUserDetailsValues(data?.profile) });
    setIsDrawerOpen(true);
    setActiveDrawerStep(initialStep);
  };

  const drawerSteps: DrawerStepsProps = {
    title: ["Dados pessoais", "Endereço", "Contato"],
    activeStep: activeDrawerStep,
  };

  const drawerHeader: DrawerHeaderProps = {
    title: "Alterar Dados",
    headerStep: `Etapa ${activeDrawerStep + 1} de ${drawerSteps.title?.length}`,
  };

  const renderStepContent = () => {
    return (
      <FormController value={formData}>
        {(() => {
          switch (activeDrawerStep) {
            case 0:
              return <UserDetailsForm />;
            case 1:
              return <AddressForm />;
            case 2:
              return <UserDetailsForm />;
            default:
              return null;
          }
        })()}
      </FormController>
    );
  };

  const drawerContentProps = {
    header: drawerHeader,
    steps: drawerSteps.title,
    activeStep: drawerSteps.activeStep,
    handleNext: handleNext,
    handleBack: handleBack,
    onStepClick: onStepClick,
    content: renderStepContent(),
  };

  // const handlerOnSubmit = async (values: SignInFormValues) => {
  //     try {
  //       const response: CreateAccessTokenResponse = await request(
  //         MutationCreateToken,
  //         values
  //       );

  //       storage.set({
  //         token: response.createAccessToken.token,
  //         profileCode: response.createAccessToken.user.profileCode,
  //         companyCode:
  //           response.createAccessToken.user.profiles.partner[0].companyCode,
  //       });

  //       navigate("/portal");
  //       notify.success("Olá, seja muito bem-vindo!");
  //     } catch (error: unknown) {
  //       setAttemptCount((prev) => prev + 1);
  //       const msg =
  //         attemptCount >= 5
  //           ? "Erro ao autenticar. Entre em contato com nosso suporte."
  //           : GetErrorMessage(error, "Ops! Algo deu errado ao autenticar-se.");

  //       notify.error(msg);
  //     }
  //   };

  return {
    drawerContentProps,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    handleNext,
    handleBack,
  };
};
