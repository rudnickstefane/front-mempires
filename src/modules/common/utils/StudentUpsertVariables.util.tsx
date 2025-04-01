import { StudentUpsertFormData } from "../types";

export const StudentUpsertVariables = (
  formData: StudentUpsertFormData,
  financeResponsibleCode?: number,
  indicationCode?: number,
) => {
  const paymentDay = formData.paymentDay
  ? new Date(Date.UTC(
      parseInt(formData.paymentDay.substring(0, 4)), // Ano
      parseInt(formData.paymentDay.substring(5, 7)) - 1, // Mês (zero-indexed)
      parseInt(formData.paymentDay.substring(8, 10)), // Dia
      0, 0, 0, 0 // Hora, minuto, segundo, milissegundo zerados
    ))
  : new Date(new Date().setUTCHours(0, 0, 0, 0));

  return {
    data: {
      origin: formData.origin,
      type: formData.type,
      input: [
        {
          status: formData.status,
          assignment: formData.assignment,
          name: formData.name,
          birthDate: formData.birthDate,
          identity: formData.identity,
          gender: formData.gender,
          stateMarital: formData.stateMarital,
          profession: formData.profession,
          company: formData.company,
          address: {
            address: formData.address,
            number: formData.number,
            complement: formData.complement,
            zipCode: formData.zipCode,
            district: formData.district,
            city: formData.city,
            state: formData.state,
          },
          periodicityCode: Number(formData.periodicityCode),
          paymentDay: paymentDay,
          modalities: formData.modalities,
          detailsPlan: formData.detailsPlan,
          contact: {
            type: formData.typeContact,
            description: formData.description,
            email: formData.email,
            emailStatus: formData.emailStatus,
            phone: formData.phone,
            emergencyContact: formData.emergencyContact,
            emergencyPhone: formData.emergencyPhone,
          },
          responsible: formData.responsible,
          referralSource: formData.referralSource,
          financeResponsible: financeResponsibleCode,
          indicationCode: indicationCode,
          studentCode: formData.studentCode,
        },
      ],
    },
  }
};