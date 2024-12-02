import { VisitRegisterFormData, VisitRegisterFormErrors } from "../types";
import { ValidateName } from "./ValidateName.util";
import { ValidatePhone } from "./ValidatePhone.util";

export const ValidateFormVisitRegister = (
  formData: VisitRegisterFormData,
  activeStep: number
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

      break;
    }

    case 1: {
      if (!formData.phone) {
        errors.phoneError = 'O telefone é obrigatório.';
      } else if (!ValidatePhone(formData.phone)) {
        errors.phoneError = 'O telefone deve estar no formato (xx) xxxx xxxx ou (xx) x xxxx xxxx.';
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
