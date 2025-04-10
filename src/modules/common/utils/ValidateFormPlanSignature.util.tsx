import { ReviewsForm, ReviewsFormErrors } from "../types";

export const ValidateFormPlanSignature= (
  formData: ReviewsForm,
  activeStep: number,
): ReviewsFormErrors => {

  const errors: ReviewsFormErrors = {};

  switch (activeStep) {
    case 1: {
      if (!formData.code) {
        errors.codeError = 'O CNPJ é obrigatório.';
      }

      if (!formData.businessName) {
        errors.businessNameError = 'A razão social é obrigatória.'
      }

      if (!formData.zipCode) {
        errors.zipCodeError = 'O CEP é obrigatório.';
      } else if (String(formData.zipCode).length !== 9) {
        errors.zipCodeError = 'O CEP deve conter 8 dígitos.';
      }

      if (!formData.address) {
        errors.addressError = 'O endereço é obrigatório.';
      }

      if (!formData.number) {
        errors.numberError = 'O número é obrigatório.';
      }

      if (!formData.district) {
        errors.districtError = 'O bairro é obrigatório.';
      }

      if (!formData.city) {
        errors.cityError = 'A cidade é obrigatória.';
      }

      if (!formData.state) {
        errors.stateError = 'O estado é obrigatório.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
