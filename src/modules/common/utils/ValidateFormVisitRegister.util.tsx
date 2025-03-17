import { VisitRegisterFormData, VisitRegisterFormErrors } from "../types";
import { EmailValidator } from "./EmailValidator.util";
import { ValidateName } from "./ValidateName.util";
import { ValidatePhone } from "./ValidatePhone.util";

export const ValidateFormVisitRegister = (
  formData: VisitRegisterFormData,
  activeStep: number,
  indicationCode?: number,
  isIndication?: boolean,
): VisitRegisterFormErrors => {

  const errors: VisitRegisterFormErrors = {};

  switch (activeStep) {
    case 0: {
      const nameError = ValidateName(formData.name);
      if (nameError) {
        errors.nameError = nameError;
      }

      if (!formData.identity || formData.identity.trim() === '') {
        errors.identityError = 'O documento de identificação é obrigatório.';
      }

      if (!formData.referralSource) {
        errors.referralSourceError = 'Como nos conheceu é obrigatório.';
      }

      if (!Array.isArray(formData.modalities) || formData.modalities.length === 0) {
        errors.modalitiesError = 'Selecione ao menos uma modalidade.';
      }

      if (!indicationCode && isIndication) {
        errors.indicationSearchError = 'O aluno que fez a indicação é obrigatório.';
      }

      break;
    }

    case 1: {
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

    default:
      break;
  }

  return errors;
};
