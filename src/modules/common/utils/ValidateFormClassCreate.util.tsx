import { ClassCreateFormData, ClassCreateFormErrors } from "../types";

export const ValidateFormClassCreate = (
  formData: ClassCreateFormData,
  activeStep: number,
  startTime: string,
  endTime: string,
  selectedDay?: string,
): ClassCreateFormErrors => {

  const errors: ClassCreateFormErrors = {};

  switch (activeStep) {
    case 0: {
      if (!formData.name) {
        errors.nameError = 'O campo turma é obrigatório';
      }

      if (!Array.isArray(formData.modalities) || formData.modalities.length === 0) {
        errors.modalitiesError = 'Selecione ao menos uma modalidade.';
      }

      if (formData.startDate) {
        const [year, month, day] = formData.startDate.split('-').map(Number);
        const startDate = new Date(year, month - 1, day);
        startDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        // Comparação
        if (startDate < today) {
          errors.startDateError = 'A data de início não pode ser anterior ao dia atual.';
        }
      }

      if (formData.endDate && !formData.startDate) {
        errors.startDateError = 'A data de início é obrigatória quando a data de fim for informada.';
      }      

      if (formData.endDate) {
        const [year, month, day] = formData.endDate.split('-').map(Number);
        const endDate = new Date(year, month - 1, day);
        endDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        // Comparação
        if (endDate < today) {
          errors.endDateError = 'A data de fim não pode ser anterior ao dia atual.';
        }
      }

      break;
    }

    case 1: {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      const startInMinutes = startHour * 60 + startMinute;
      const endInMinutes = endHour * 60 + endMinute;

      if (endInMinutes <= startInMinutes) {
        errors.endTimeError = 'O horário de fim deve ser maior que o horário de início.';
      }

      const newSlot = `${startTime} às ${endTime}`;

      if (selectedDay && Array.isArray(formData[selectedDay]) && formData[selectedDay].includes(newSlot)) {
        errors.endTimeError = `O horário das ${newSlot} já foi adicionado.`;
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
