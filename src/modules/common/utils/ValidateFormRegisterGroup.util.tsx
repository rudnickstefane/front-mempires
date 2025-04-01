import { ReviewsForm, ReviewsFormErrors } from "../types";

export const ValidateFormRegisterGroup = (
  formData: ReviewsForm,
  activeStep: number,
): ReviewsFormErrors => {

  const errors: ReviewsFormErrors = {};

  switch (activeStep) {
    case 0: {
      if (!formData.name) {
        errors.nameError = 'O nome do grupo é obrigatório.';
      }

      if (!formData.description) {
        errors.descriptionError = 'A descrição do grupo é obrigatória.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
