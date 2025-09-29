
import { EmailValidator, ValidateName, ValidatePhone } from "../../../common/utils";
import { CreateAccessFormData } from "../components/types";
import { CreateAccessFormErrors } from "../components/types/CreateAccessFormErrors.type";
import { ValidatePassword } from "./ValidatePassword.util";

export const ValidateFormCreateAccess = (
  formData: CreateAccessFormData,
  activeStep: number,
  type: string,
): CreateAccessFormErrors => {

  const errors: CreateAccessFormErrors = {};

  switch (activeStep) {
    case 0: {
      const nameError = ValidateName(formData.name);
      if (nameError) {
        errors.nameError = nameError;
      }

      const isEmail = EmailValidator(formData.email);
      if (!formData.email) {
        errors.emailError = 'O e-mail é obrigatório.';
      } else if (isEmail) {
        errors.emailError = isEmail;
      }

      break;
    }

    case 1: {
      if (type === 'GYM' && !formData.fantasyName) {
        errors.fantasyNameError = 'O nome da academia, studio, clube ou outro é obrigatório.';
      }

      if (type === 'SUP' && !formData.code) {
        errors.codeError = 'O CPF ou CNPJ é obrigatório.';
      }

      if (type === 'NUT' && !formData.code) {
        errors.codeError = 'O CPF é obrigatório.';
      }

      if (type === 'PER' && !formData.code) {
        errors.codeError = 'O CPF é obrigatório.';
      }

      if (!formData.phone) {
        errors.phoneError = 'O telefone é obrigatório.';
      } else if (!ValidatePhone(formData.phone)) {
        errors.phoneError = 'O telefone deve estar no formato (xx) xxxx xxxx ou (xx) x xxxx xxxx.';
      }

      if (!formData.password) {
        errors.passwordError = 'A senha é obrigatória.';
      } else {
        const passwordValidationResult = ValidatePassword(formData.password);
        if (passwordValidationResult) {
          errors.passwordError = passwordValidationResult;
        }
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
