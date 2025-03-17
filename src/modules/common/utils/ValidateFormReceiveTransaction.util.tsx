import { TransactionFormData, TransactionFormErrors } from "../types";

export const ValidateFormReceiveTransaction = (
  formData: TransactionFormData,
  activeStep: number,
  combinePaymentMethod: boolean,
): TransactionFormErrors => {

  const errors: TransactionFormErrors = {};

  switch (activeStep) {
    case 1: {
      if (!formData.mainAmount || formData.mainAmount === "0,00") {
        errors.mainAmountError = "Digite um valor maior que zero para o valor principal.";
      }
    
      if (combinePaymentMethod && (!formData.mainAmount || formData.mainAmount === "0,00")) {
        errors.mainAmountError = "Digite um valor válido para o valor principal.";
      }
    
      if (combinePaymentMethod && (!formData.secondaryAmount || formData.secondaryAmount === "0,00")) {
        errors.secondaryAmountError = "Digite um valor válido para o valor secundário.";
      }
    
      break;
    }

    default:
      break;
  }

  return errors;
};
