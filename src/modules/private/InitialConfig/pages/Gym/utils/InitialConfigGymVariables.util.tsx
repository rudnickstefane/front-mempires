import { InitialConfigGymFormData } from "../types";

export const InitialConfigGymVariables = (formData: InitialConfigGymFormData) => {
  const startAndEndMondayToFridayHours = `${formData.startTimeMondayToFriday} - ${formData.endTimeMondayToFriday}`;
  const startAndEndSaturdayHours = `${formData.startTimeSaturday} - ${formData.endTimeSaturday}`;
  const startAndEndSundayHours = `${formData.startTimeSunday} - ${formData.endTimeSunday}`;
  const hoursType = formData.is24Hours ? 'FULL_DAY' : 'CUSTOM';

  return {
    data: {
      companyCode: formData.companyCode,
      input: {
        officeHours: {
          hours: hoursType,
          timeZone: formData.timeZone,
          mondayHours: startAndEndMondayToFridayHours,
          tuesdayHours: startAndEndMondayToFridayHours,
          wednesdayHours: startAndEndMondayToFridayHours,
          thursdayHours: startAndEndMondayToFridayHours,
          fridayHours: startAndEndMondayToFridayHours,
          saturdayHours: startAndEndSaturdayHours,
          sundayHours: startAndEndSundayHours,
          holidayHours: startAndEndSundayHours,
        },
        workingDays: {
          mondayDay: formData.selectedDays.includes('Segunda'),
          tuesdayDay: formData.selectedDays.includes('Terça'),
          wednesdayDay: formData.selectedDays.includes('Quarta'),
          thursdayDay: formData.selectedDays.includes('Quinta'),
          fridayDay: formData.selectedDays.includes('Sexta'),
          saturdayDay: formData.selectedDays.includes('Sábado'),
          sundayDay: formData.selectedDays.includes('Domingo'),
          holidayDay: formData.selectedDays.includes('Feriado'),
        },
        address: formData.address,
        number: formData.number,
        complement: formData.complement,
        zipCode: formData.zipCode,
        district: formData.district,
        city: formData.city,
        state: formData.state,
        workMonths: formData.workForms.includes('Mensalidades'),
        workPerSession: formData.workForms.includes('Aulas ou Sessões'),
        categories: [
          ...formData.selectedModalities.map(modality => ({ name: modality.name, description: modality.description, type: 'MODALITY' })),
          ...formData.selectedSegments.map(segment => ({ name: segment.name, description: segment.description, type: 'SEGMENT' })),
          ...formData.selectedServices.map(service => ({ name: service.name, description: service.description, type: 'SERVICE' })),
        ],
      },
    },
  };
};