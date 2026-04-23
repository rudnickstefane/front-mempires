/* eslint-disable @typescript-eslint/no-explicit-any */
export type MultiStepFormProps = {
  totalSteps: number;
  formData: any;
  stepFields: Record<number, string[]>;
  stepsConfig: { key: string; title: string }[];
  activeStep: number;
  setActiveStep: (step: number) => void;
};
