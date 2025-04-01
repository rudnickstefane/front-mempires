import { ReviewsForm, ReviewsFormErrors } from "../types";

export const TicketValidateForm = (
  formData: ReviewsForm,
  activeStep: number,
): ReviewsFormErrors => {

  const errors: ReviewsFormErrors = {};

  switch (activeStep) {
    case 0: {
      if (!formData.name) {
        errors.nameError = 'O campo é obrigatório.';
      }

      if (!formData.message || String(formData.message).trim() === '') {
        errors.messageError = 'O campo é obrigatório.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
