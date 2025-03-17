import { StudentRegisterFormErrors, StudentUpsertFormData } from "../types";

export const ValidateFormStudentPlanCreate = (
  formData: StudentUpsertFormData,
  activeStep: number,
): StudentRegisterFormErrors => {

  const errors: StudentRegisterFormErrors = {};

  switch (activeStep) {
    case 0: {
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

    default:
      break;
  }

  return errors;
};
