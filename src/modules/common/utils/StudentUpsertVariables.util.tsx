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

  const referralSourceOptions = [
    { value: 'billboard', label: 'Outdoor' },
    { value: 'call', label: 'Ligação' },
    { value: 'email', label: 'E-mail Marketing' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'flyer', label: 'Panfleto' },
    { value: 'friend', label: 'Indicação de amigo' },
    { value: 'google', label: 'Google' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'student', label: 'Indicação de aluno ou colaborador' },
    { value: 'website', label: 'Site' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'others', label: 'Outros' },
  ];

  const selectedReferral = referralSourceOptions.find(option => option.value === formData.referralSource);

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
          referralSource: selectedReferral ? selectedReferral.label : null,
          financeResponsible: financeResponsibleCode,
          indicationCode: indicationCode,
          studentCode: formData.studentCode,
        },
      ],
    },
  }
};