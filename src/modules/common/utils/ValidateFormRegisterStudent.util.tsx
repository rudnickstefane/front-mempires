import { StudentRegisterFormData, StudentRegisterFormErrors } from "../types";
import { ValidateDate } from "./ValidateDate.util";
import { ValidateEmail } from "./ValidateEmail.util";
import { ValidateName } from "./ValidateName.util";
import { ValidatePhone } from "./ValidatePhone.util";

export const ValidateFormRegisterStudent= (
  formData: StudentRegisterFormData,
  activeStep: number
): StudentRegisterFormErrors => {

  const errors: StudentRegisterFormErrors = {};

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
        errors.identityError = 'O documento de identificação é obrigatório.';
      }

      break;
    }

    case 1: {
      if (!formData.zipCode) {
        errors.zipCodeError = 'O CEP é obrigatório.';
      } else if (formData.zipCode.length !== 9) {
        errors.zipCodeError = 'O CEP deve conter 8 dígitos.';
      }

      if (!formData.streetAddress) {
        errors.streetAddressError = 'O endereço é obrigatório.';
      }

      if (!formData.streetNumber) {
        errors.streetNumberError = 'O número é obrigatório.';
      }

      if (!formData.neighborhood) {
         errors.neighborhoodError = 'O bairro é obrigatório.';
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
      if (!formData.gymPlan) {
        errors.gymPlanError = 'O tipo do plano é obrigatório.';
      }

      if (!Array.isArray(formData.modalities) || formData.modalities.length === 0) {
        errors.modalitiesError = 'Selecione ao menos uma modalidade.';
      }

      break;
    }

    case 3: {
      if (!formData.phone) {
        errors.phoneError = 'O telefone é obrigatório.';
      } else if (!ValidatePhone(formData.phone)) {
        errors.phoneError = 'O telefone deve estar no formato (xx) xxxx xxxx ou (xx) x xxxx xxxx.';
      }

      if (!formData.email) {
        errors.emailError = 'O e-mail é obrigatório.';
      } else if (!ValidateEmail(formData.email)) {
        errors.emailError = 'O e-mail deve ser válido.';
      }

      break;
    }

    case 4: {
      if (!formData.guardianName) {
        errors.guardianNameError = 'O nome do responsável é obrigatório.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
