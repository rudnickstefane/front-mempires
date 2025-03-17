import { EditCompanyFormData, EditCompanyFormErrors } from "../types";
import { EmailValidator } from "./EmailValidator.util";
import { ValidatePhone } from "./ValidatePhone.util";

export const ValidateFormEditCompany = (
  formData: EditCompanyFormData,
  activeStep: number
): EditCompanyFormErrors => {

  const errors: EditCompanyFormErrors = {};

  switch (activeStep) {
    case 0: {

      if (!formData.fantasyName) {
        errors.fantasyNameError = 'O nome fantasia é obrigatório.';
      }

      if (!formData.code || formData.code.trim() === '') {
        errors.codeError = 'O CNPJ é obrigatório.';
      }

      break;
    }

    case 1: {
      if (!formData.zipCode) {
        errors.zipCodeError = 'O CEP é obrigatório.';
      } else if (formData.zipCode.length !== 9) {
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

    case 2: {
      if (!formData.description) {
        errors.descriptionError = 'A descrição é obrigatória.';
      }

      if (!formData.phone) {
        errors.phoneError = 'O telefone é obrigatório.';
      } else if (!ValidatePhone(formData.phone)) {
        errors.phoneError = 'O telefone deve estar no formato (xx) xxxx xxxx ou (xx) x xxxx xxxx.';
      }

      const isEmail = EmailValidator(formData.email);
      if (!formData.email) {
        errors.emailError = 'O e-mail é obrigatório.';
      } else if (isEmail) {
        errors.emailError = isEmail;
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
