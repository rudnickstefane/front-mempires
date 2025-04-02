import { ReviewsForm, StudentRegisterFormErrors } from "../types";

export const ValidateFormReviewUpsert = (
  formData: ReviewsForm,
  activeStep: number,
): StudentRegisterFormErrors => {

  const errors: StudentRegisterFormErrors = {};

  switch (activeStep) {
    case 0: {
      if (formData.weight === '') {
        errors.weightError = 'O peso é obrigatório.';
      }

      if (formData.height === '') {
        errors.heightError = 'A altura é obrigatória.';
      }

      if (formData.dueDate) {
        const today = new Date(); // Data atual: 11/03/2025
        today.setHours(0, 0, 0, 0); // Zera o horário para comparar apenas a data

        const dueDate = new Date(String(formData.dueDate)); // Converte formData.dueDate para objeto Date
        dueDate.setHours(0, 0, 0, 0); // Zera o horário da dueDate

        if (dueDate <= today) {
          errors.dueDateError = 'A data deve ser posterior ao dia atual.';
        }
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
