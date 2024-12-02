import { SupplierRegisterFormData, SupplierRegisterFormErrors } from "../types";

export const ValidateFormSupplierRegister = (
  formData: SupplierRegisterFormData,
  activeStep: number
): SupplierRegisterFormErrors => {

  const errors: SupplierRegisterFormErrors = {};

  switch (activeStep) {
    case 0: {
      if (!formData.codeAndIdentity) {
        errors.codeAndIdentityError = 'O CPF ou CNPJ é obrigatório.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
