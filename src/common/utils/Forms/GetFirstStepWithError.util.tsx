/* eslint-disable @typescript-eslint/no-explicit-any */
export const getFirstStepWithError = (errors: any, stepKeys: string[]) => {
  return stepKeys.findIndex((key) => !!errors[key]);
};
