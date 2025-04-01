import { ReviewsForm } from "../types";

export const ContributorsUpsertVariables = (
  formData: ReviewsForm,
) => {

  const positionOptions = [
    { value: 'MANAGER', label: 'Gerente' },
    { value: 'COORDINATOR', label: 'Coordenador' },
    { value: 'INSTRUCTOR', label: 'Instrutor' },
    { value: 'PERSONAL_TRAINER', label: 'Personal Trainer' },
    { value: 'RECEPTIONIST', label: 'Recepcionista' },
    { value: 'CLEANING_STAFF', label: 'Equipe de limpeza' },
    { value: 'MAINTENANCE', label: 'Manutenção' },
    { value: 'SALES', label: 'Vendas' },
    { value: 'NUTRITIONIST', label: 'Nutricionista' },
    { value: 'PHYSIOTHERAPIST', label: 'Fisioterapeuta' },
    { value: 'INTERN', label: 'Estagiário' },
    { value: 'SECURITY', label: 'Segurança' },
    { value: 'ACCOUNTANT', label: 'Contador' },
    { value: 'MARKETING', label: 'Marketing' },
    { value: 'HR', label: 'Recursos Humanos' },
    { value: 'IT_SUPPORT', label: 'Suporte de TI' },
  ];

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
          gender: formData?.gender ? formData.gender : null,
          stateMarital: formData?.stateMarital ? formData.stateMarital : null,
          address: {
            address: formData.address,
            number: formData.number,
            complement: formData.complement,
            zipCode: formData.zipCode,
            district: formData.district,
            city: formData.city,
            state: formData.state,
          },
          contact: {
            type: formData.typeContact,
            description: formData.description,
            email: formData.email,
            emailStatus: formData.emailStatus,
            phone: formData.phone,
            emergencyContact: formData.emergencyContact,
            emergencyPhone: formData.emergencyPhone,
          },
          position: formData.position,
          groupCode: formData.groupCode,
          profession: positionOptions.find((item) => item.value === formData.position)?.label,
          responsible: formData.responsible,
          profileCode: formData.profileCode,
        },
      ],
    },
  }
};