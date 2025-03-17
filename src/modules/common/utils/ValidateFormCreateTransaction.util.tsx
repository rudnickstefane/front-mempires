import { TransactionFormData, TransactionFormErrors } from "../types";

export const ValidateFormCreateTransaction = (
  formData: TransactionFormData,
  activeStep: number,
): TransactionFormErrors => {

  const errors: TransactionFormErrors = {};

  switch (activeStep) {
    case 0: {

      if (!formData.type) {
        errors.typeError = "O tipo de transação é obrigatório.";
      }

      if (!formData.description) {
        errors.descriptionError = "A descrição é obrigatória.";
      }

      if (!formData.amount) {
        errors.amountError = "O valor da transação é obrigatório.";
      }

      if (formData.amount === "0,00") {
        errors.amountError = "Digite um valor maior que zero para a transação.";
      }

      if (formData.dueDate) {
        const [year, month, day] = formData.dueDate.split('-').map(Number);
        const startDate = new Date(year, month - 1, day);
        startDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        // Comparação
        if (startDate < today) {
          errors.dueDateError = 'A data de início não pode ser anterior ao dia atual.';
        }
      }
    
      break;
    }

    default:
      break;
  }

  return errors;
};
