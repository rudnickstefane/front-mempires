import { ReviewsForm, ReviewsFormErrors } from "../types";
import { EmailValidator } from "./EmailValidator.util";
import { ValidateDate } from "./ValidateDate.util";
import { ValidateName } from "./ValidateName.util";
import { ValidatePhone } from "./ValidatePhone.util";

export const ValidateFormRegisterContributor= (
  formData: ReviewsForm,
  activeStep: number,
): ReviewsFormErrors => {

  const errors: ReviewsFormErrors = {};

  switch (activeStep) {
    case 0: {
      const nameError = ValidateName(String(formData.name));
      if (nameError) {
        errors.nameError = nameError;
      }

      if (!formData.birthDate || String(formData.birthDate).trim() === '') {
        errors.birthDateError = 'A data de nascimento é obrigatória.';
      } else if (!ValidateDate(String(formData.birthDate))) {
        errors.birthDateError = 'A data de nascimento deve estar no formato dd/mm/aaaa';
      } else {
        const birthDateParts = String(formData.birthDate).split('/');
        const birthDate = new Date(`${birthDateParts[2]}-${birthDateParts[1]}-${birthDateParts[0]}`);
        const currentDate = new Date();
      
        if (birthDate > currentDate) {
          errors.birthDateError = 'A data de nascimento não pode ser superior à data atual';
        }
      }

      if (!formData.identity || String(formData.identity).trim() === '') {
        errors.identityError = 'O documento de identificação é obrigatório.';
      }

      if (!formData.position) {
        errors.positionError = 'O cargo é obrigatório.';
      }

      if (!formData.groupCode) {
        errors.groupCodeError = 'O grupo de acesso é obrigatório.';
      }

      break;
    }

    case 1: {
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

    case 2: {
      if (!formData.phone) {
        errors.phoneError = 'O telefone é obrigatório.';
      } else if (!ValidatePhone(String(formData.phone))) {
        errors.phoneError = 'O telefone deve estar no formato (xx) xxxx xxxx ou (xx) x xxxx xxxx.';
      }

      const isEmail = EmailValidator(String(formData.email));
      if (!formData.email) {
        errors.emailError = 'O e-mail é obrigatório.';
      } else if (formData.email === 'S/E') {
        break;
      } else if (isEmail) {
        errors.emailError = isEmail;
      }

      break;
    }

    case 4: {
      if (!formData.responsible) {
        errors.responsibleError = 'O nome do responsável é obrigatório.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
