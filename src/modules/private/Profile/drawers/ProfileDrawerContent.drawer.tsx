/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerButtons } from "@sr/common/components/Drawer/DrawerButtons";
import {
  AddressForm,
  ContactsForm,
  UserDetailsForm,
} from "@sr/common/components/Forms";
import { useDrawerStore, useMultiStepForm } from "@sr/common/hooks";
import { FormController } from "@sr/common/iu/components/Forms";
import { storage } from "@sr/common/storage";
import { useFormik } from "formik";
import { useMemo } from "react";
import { initialUserDetailsValues, stepProfileFields } from "../constants";
import * as Hook from "../hooks";
import { DrawerFormUserProps } from "../types";
import { formUserValidationSchema } from "../validation";

export function ProfileDrawerContent({ profileData }: { profileData: any }) {
  const { activeStep, setActiveStep, closeDrawer } = useDrawerStore();
  const { mutateAsync: upsertUser } = Hook.useUpsertUser();

  const stepsConfig = useMemo(
    () => [
      { key: "details", title: "Dados pessoais", component: UserDetailsForm },
      { key: "address", title: "Endereço", component: AddressForm },
      {
        key: "contact",
        title: "Contato",
        component: () => <ContactsForm isSimple />,
      },
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

    await upsertUser(payload as any, {
      onSuccess: () => closeDrawer(),
    });
  };

  const formData = useFormik<DrawerFormUserProps>({
    initialValues: initialUserDetailsValues(profileData),
    validationSchema: formUserValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: handlerOnSubmit,
  });

  const multiStep = useMultiStepForm({
    totalSteps: stepsConfig.length,
    formData,
    stepFields: stepProfileFields,
    stepsConfig,
  });

  const CurrentStep = stepsConfig[activeStep].component;

  return (
    <FormController value={formData}>
      <CurrentStep />

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
    </FormController>
  );
}
