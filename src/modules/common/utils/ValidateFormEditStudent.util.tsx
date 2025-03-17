import { EditProfileFormData, EditProfileFormErrors } from "../types";
import { EmailValidator } from "./EmailValidator.util";
import { ValidateDate } from "./ValidateDate.util";
import { ValidateName } from "./ValidateName.util";
import { ValidatePhone } from "./ValidatePhone.util";

export const ValidateFormEditStudent = (
  formData: EditProfileFormData,
  activeStep: number,
  indicationCode?: number,
  isIndication?: boolean
): EditProfileFormErrors => {

  const errors: EditProfileFormErrors = {};

  switch (activeStep) {
    case 0: {
      const nameError = ValidateName(formData.name);
      if (nameError) {
        errors.nameError = nameError;
      }

      if (!formData.birthDate || formData.birthDate.trim() === '') {
        errors.birthDateError = 'A data de nascimento é obrigatória.';
      } else if (!ValidateDate(formData.birthDate)) {
        errors.birthDateError = 'A data de nascimento deve estar no formato dd/mm/aaaa';
      } else {
        const birthDateParts = formData.birthDate.split('/');
        const birthDate = new Date(`${birthDateParts[2]}-${birthDateParts[1]}-${birthDateParts[0]}`);
        const currentDate = new Date();
      
        if (birthDate > currentDate) {
          errors.birthDateError = 'A data de nascimento não pode ser superior à data atual';
        }
      }

      if (!formData.identity || formData.identity.trim() === '') {
        errors.identityError = 'O CPF é obrigatório.';
      }

      if (!indicationCode && isIndication) {
        errors.indicationSearchError = 'O aluno que fez a indicação é obrigatório.';
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
