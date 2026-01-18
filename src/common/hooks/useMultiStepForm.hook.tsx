/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { notify } from "../iu/components/notifications";
import { MultiStepFormProps } from "../types";

export const useMultiStepForm = ({
  totalSteps,
  formData,
  stepFields,
  stepsConfig,
}: MultiStepFormProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const getFieldError = useCallback(
    (field: string, source: any) =>
      field.split(".").reduce((obj, key) => obj?.[key], source),
    []
  );

  const isStepValid = useCallback(
    (stepIdx: number) => {
      const fields = stepFields[stepIdx] || [];
      return fields.every((field) => {
        const error = getFieldError(field, formData.errors);
        const value = getFieldError(field, formData.values);
        const isRequiredError = !!error;
        return (
          !isRequiredError &&
          value !== undefined &&
          value !== null &&
          value !== ""
        );
      });
    },
    [formData.errors, formData.values, stepFields, getFieldError]
  );

  useEffect(() => {
    const shouldRedirect = formData.submitCount > 0 && !formData.isValid;
    if (!shouldRedirect) return;

    const firstStepWithError = stepsConfig.findIndex(
      (s) => !!(formData.errors as any)[s.key]
    );

    if (firstStepWithError !== -1 && firstStepWithError !== activeStep) {
      setActiveStep(firstStepWithError);
      notify.warning(
        `Ops! Algumas informações em "${stepsConfig[firstStepWithError].title}" precisam de sua atenção.`
      );
    }
  }, [
    formData.submitCount,
    formData.isValid,
    formData.errors,
    stepsConfig,
    activeStep,
    setActiveStep,
  ]);

  const onStepClick = (step: number) => {
    if (activeStep === 0) {
      return;
    }

    setActiveStep(step);
  };

  const handleNext = async () => {
    const errors = await formData.validateForm();
    const fieldsInCurrentStep = stepFields[activeStep] || [];
    const hasError = fieldsInCurrentStep.some(
      (f) => !!getFieldError(f, errors)
    );

    fieldsInCurrentStep.forEach((f) => formData.setFieldTouched(f, true));

    if (!hasError && activeStep < totalSteps - 1)
      setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return {
    activeStep,
    setActiveStep,
    isStepValid,
    handleNext,
    handleBack,
    getFieldError,
    onStepClick,
  };
};
