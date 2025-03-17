import { TransactionFormData, TransactionFormErrors } from "../types";

export const ValidateFormReversedTransaction = (
  formData: TransactionFormData,
  activeStep: number
): TransactionFormErrors => {

  const errors: TransactionFormErrors = {};

  switch (activeStep) {
    case 1: {
      if (!formData.reversed || formData.reversed === "0,00") {
        errors.reversedError = "O valor do reembolso é obrigatório.";
      }

      if (!formData.reversedReason) {
        errors.reversedReasonError = "O motivo do reembolso é obrigatório.";
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
