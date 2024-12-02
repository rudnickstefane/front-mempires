import { ClassCreateFormData, ClassCreateFormErrors } from "../types";

export const ValidateFormClassCreate = (
  formData: ClassCreateFormData,
  activeStep: number
): ClassCreateFormErrors => {

  const errors: ClassCreateFormErrors = {};

  switch (activeStep) {
    case 0: {
      if (!formData.class) {
        errors.classError = 'O campo turma é obrigatório';
      }

      if (!formData.modalities) {
        errors.modalitiesError = 'Selecione ao menos uma modalidade.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
