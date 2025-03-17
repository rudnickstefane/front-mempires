import { StudentRegisterFormErrors, StudentUpsertFormData } from "../types";
import { EmailValidator } from "./EmailValidator.util";
import { ValidateDate } from "./ValidateDate.util";
import { ValidateName } from "./ValidateName.util";
import { ValidatePhone } from "./ValidatePhone.util";

export const ValidateFormRegisterStudent= (
  formData: StudentUpsertFormData,
  activeStep: number,
  indicationCode?: number,
  isIndication?: boolean
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
      if (!formData.periodicityCode) {
        errors.periodicityCodeError = 'O plano é obrigatório.';
      }

      if (formData.paymentDay) {
        const [year, month, day] = formData.paymentDay.split('-').map(Number);
        const startDate = new Date(year, month - 1, day);
        startDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        // Comparação
        if (startDate < today) {
          errors.paymentDayError = 'A data de vencimento não pode ser anterior ao dia atual.';
        }
      }

      break;
    }

    case 3: {
      if (!formData.phone) {
        errors.phoneError = 'O telefone é obrigatório.';
      } else if (!ValidatePhone(formData.phone)) {
        errors.phoneError = 'O telefone deve estar no formato (xx) xxxx xxxx ou (xx) x xxxx xxxx.';
      }

      const isEmail = EmailValidator(formData.email);
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

      if (!formData.financeResponsible) {
        errors.responsibleError = 'O responsável financeiro é obrigatório.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
