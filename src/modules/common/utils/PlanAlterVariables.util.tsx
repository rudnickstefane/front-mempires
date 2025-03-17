import { PlanCreateFormData, SetPlanDataSummary } from "../types";

export const PlanAlterVariables = (
  formData: PlanCreateFormData,
  planDataSummary?: SetPlanDataSummary
) => {
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { currency: 'BRL' });

  return {
    input: {
      type: formData.type,
      planCode: formData.planCode,
      companyCode: formData.companyCode,
      name: planDataSummary?.setDataPlanSummary.name,
      startDate: planDataSummary?.setDataPlanSummary.startDate
      ? `${planDataSummary.setDataPlanSummary.startDate}T${
          planDataSummary.setDataPlanSummary.startHours 
            ? `${planDataSummary.setDataPlanSummary.startHours}:00` 
            : '00:00:00'
        }Z`
      : planDataSummary?.setDataPlanSummary.startHours
      ? `${new Date().toISOString().split('T')[0]}T${
          planDataSummary.setDataPlanSummary.startHours
        }:00Z`
      : null,
      endDate: planDataSummary?.setDataPlanSummary.endDate
      ? `${planDataSummary.setDataPlanSummary.endDate}T${
          planDataSummary.setDataPlanSummary.endHours 
            ? `${planDataSummary.setDataPlanSummary.endHours}:00` 
            : '00:00:00'
        }Z`
      : planDataSummary?.setDataPlanSummary.endHours
      ? `${new Date().toISOString().split('T')[0]}T${
          planDataSummary.setDataPlanSummary.endHours
        }:00Z`
      : null,
      observation: planDataSummary?.setDataPlanSummary.observation,
      modalities: planDataSummary?.setDataPlanSummary.modalities.map(modality => modality.value) || [],
      customService: planDataSummary?.setDataPlanSummary.customService.map(customService => customService.value) || [],
      typeCharge: planDataSummary?.setDataPlanSummary.typeCharge,
      feesFrequency: planDataSummary?.setDataPlanSummary.feesFrequency,
      calculationBase: planDataSummary?.setDataPlanSummary.calculationBase,
      status: formData.status,
      frequency: formData.frequency,
      access: formData.access,
      hours: formData.isAllHours ? 'FULL_DAY' : 'CUSTOM',
      sundayHours: formData.sundayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      mondayHours: formData.mondayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      tuesdayHours: formData.tuesdayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      wednesdayHours: formData.wednesdayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      thursdayHours: formData.thursdayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      fridayHours: formData.fridayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      saturdayHours: formData.saturdayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      holidayHours: formData.holidayHours?.map((slot) => slot.replace(" às ", " - ")) || [],
      periodicities: planDataSummary?.setDataPlanSummary.periodicities.map(periodicity => ({
        name: periodicity.name,
        periodicity: periodicity.periodicity,
        charge: periodicity.charge,
        amount: formatCurrency(periodicity.totalValue),
        fees: periodicity.fees,
        startDate: periodicity.startDate
        ? `${periodicity.startDate}T${
            periodicity.startHours 
              ? `${periodicity.startHours}:00` 
              : '00:00:00'
          }Z`
        : null,
        endDate: periodicity.endDate
        ? `${periodicity.endDate}T${
            periodicity.endHours 
              ? `${periodicity.endHours}:00` 
              : '00:00:00'
          }Z`
        : null,
        status: formData.status,
        observation: periodicity.observation,
      })),
    }
  };
};