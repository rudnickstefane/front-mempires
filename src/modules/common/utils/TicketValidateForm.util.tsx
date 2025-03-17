import { ReviewsForm, ReviewsFormErrors } from "../types";

export const TicketValidateForm = (
  formData: ReviewsForm,
  activeStep: number,
): ReviewsFormErrors => {

  const errors: ReviewsFormErrors = {};

  switch (activeStep) {
    case 0: {
      if (!formData.queue) {
        errors.queueError = 'Por favor, selecione a área para a qual o protocolo será direcionado.';
      }

      if (!formData.message || String(formData.message).trim() === '') {
        errors.messageError = 'A mensagem é obrigatória.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
