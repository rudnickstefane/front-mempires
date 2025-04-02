import { PlanCreateFormData, PlanCreateFormErrors } from "../types";

export const ValidateFormPlanCreate= (
  formData: PlanCreateFormData,
  activeStep: number,
  startTime: string,
  endTime: string,
  selectedDay?: string,
): PlanCreateFormErrors => {

  const errors: PlanCreateFormErrors = {};

  switch (activeStep) {
    case 0: {
      if (!formData.name) {
        errors.nameError = 'O nome do plano é obrigatório.';
      }

      if (!Array.isArray(formData.periodicity) || formData.periodicity.length === 0) {
        errors.periodicityError = 'A periodicidade é obrigatório.';
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

      if (!startHour && !endHour && formData.isCustomHours) {
        const allDaysEmpty = [
          formData.sundayHours,
          formData.mondayHours,
          formData.tuesdayHours,
          formData.wednesdayHours,
          formData.thursdayHours,
          formData.fridayHours,
          formData.saturdayHours,
          formData.holidayHours
        ].every((day) => !day || day.length === 0);
    
        if (allDaysEmpty) {
          errors.customHoursError = "É necessário adicionar pelo menos um horário.";
        }
      }

      break;
    }

    case 2: {
      if (!Array.isArray(formData.modalities) || formData.modalities.length === 0) {
        errors.modalitiesError = 'Selecione ao menos uma modalidade.';
      }

      break;
    }

    case 4: {
      const isValidAmount = formData.periodicityDetails
        .every(detail => detail.amount !== "" && detail.amount !== "0,00");

      if ((!Array.isArray(formData.periodicityDetails) || formData.periodicityDetails.length === 0) || !isValidAmount) {
        formData.periodicityDetails.forEach((detail) => {
          if (detail.amount === "" || detail.amount === "0,00") {
            errors[`amount-${detail.value}-Error`] = 
              `O valor é obrigatório.`;
          }

          if (detail.endDate && !detail.startDate) {
            errors[`startDate-${detail.value}-Error`] = 'A data de início é obrigatória quando a data de fim for informada.';
          }

          if (detail.startDate && detail.endDate) {
            const [startYear, startMonth, startDay] = detail.startDate.split('-').map(Number);
            const startDate = new Date(startYear, startMonth - 1, startDay);
            startDate.setHours(0, 0, 0, 0);
          
            const [endYear, endMonth, endDay] = detail.endDate.split('-').map(Number);
            const endDate = new Date(endYear, endMonth - 1, endDay);
            endDate.setHours(0, 0, 0, 0);
          
            // Comparação: EndDate não pode ser anterior a StartDate
            if (endDate < startDate) {
              errors[`endDate-${detail.value}-Error`] = 'A data de fim não pode ser anterior à data de início.';
            }
          }
        });
      }

      break;
    }

    default:
      break;
  }

  return errors;
};
