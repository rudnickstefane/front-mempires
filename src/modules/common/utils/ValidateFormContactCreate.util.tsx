import { ContactCreateFormData, ContactCreateFormErrors } from "../types";

export const ValidateFormContactCreate = (
  formData: ContactCreateFormData,
  activeStep: number
): ContactCreateFormErrors => {

  const errors: ContactCreateFormErrors = {};

  switch (activeStep) {
    case 1: {

      if (!formData.searchStudent) {
        errors.searchStudentError = "Selecione ao menos um aluno ou visitante.";
      }

      if (!formData.reason) {
        errors.reasonError = 'O motivo é obrigatório.';
      }

      if (formData.contactType === 'E-mail') {
        if (!formData.title) {
          errors.titleError = 'O titulo é obrigatório.';
        }

        if (!formData.email) {
          errors.emailError = 'O e-mail é obrigatório.';
        }
      }

      if (formData.contactType !== 'Ligação' && !formData.message) {
        errors.messageError = 'A mensagem é obrigatória.';
      }

      if (formData.contactType === 'Ligação') {
        if (!formData.phone) {
          errors.phoneError = 'O telefone é obrigatório.';
        }
      }

      break;
    }

    case 2: {
      if (!formData.date) {
        errors.dateError = 'A data é obrigatória.';
      }

      if (!formData.hours) {
        errors.hoursError = 'O horário é obrigatório.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
