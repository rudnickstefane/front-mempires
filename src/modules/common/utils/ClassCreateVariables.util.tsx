import { ClassCreateFormData } from "../types";

export const ClassCreateVariables = (
  formData: ClassCreateFormData,
) => {
  return {
    input: {
      type: formData.type,
      companyCode: formData.companyCode,
      classCode: formData.classCode,
      name: formData.name,
      startDate: formData.startDate
      ? `${formData.startDate}T${
          formData.startHours 
            ? `${formData.startHours}:00` 
            : '00:00:00'
        }Z`
      : formData.startHours
      ? `${new Date().toISOString().split('T')[0]}T${
          formData.startHours
        }:00Z`
      : null,
      endDate: formData.endDate
      ? `${formData.endDate}T${
          formData.endHours 
            ? `${formData.endHours}:00` 
            : '00:00:00'
        }Z`
      : formData.endHours
      ? `${new Date().toISOString().split('T')[0]}T${
          formData.endHours
        }:00Z`
      : null,
      observation: formData?.observation,
      modalities: formData?.modalities.map(modality => String(modality)) || [],
      studentsPerHour: formData.studentsPerHour ? Number(formData.studentsPerHour) : null,
      minimumAlert: formData.minimumAlert ?Number(formData.minimumAlert) : null,
      status: formData.status,
      sundayHours: formData.sundayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      mondayHours: formData.mondayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      tuesdayHours: formData.tuesdayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      wednesdayHours: formData.wednesdayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      thursdayHours: formData.thursdayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      fridayHours: formData.fridayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      saturdayHours: formData.saturdayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      holidayHours: formData.holidayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
    }
  };
};