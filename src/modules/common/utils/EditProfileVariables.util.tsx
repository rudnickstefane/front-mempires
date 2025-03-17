import { EditProfileFormData } from "../types";
import { Contact } from "../types/EditProfileFormData.type";

export const EditProfileVariables = (formData: EditProfileFormData, contacts: Contact[], indicationCode?: number,) => {
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
      profileCode: formData.profileCode,
      origin: formData?.origin,
      input: {
        name: formData?.name,
        username: formData?.username,
        birthDate: formData?.birthDate,
        identity: formData?.identity,
        gender: formData?.gender,
        stateMarital: formData?.stateMarital,
        profession: formData?.profession,
        company: formData?.company,
        address: formData?.address,
        number: formData?.number,
        complement: formData?.complement,
        zipCode: formData?.zipCode,
        district: formData?.district,
        city: formData?.city,
        state: formData?.state,
        referralSource: selectedReferral ? selectedReferral.label : null,
        indicationCode: indicationCode,
        contact: contacts.map((contact) => ({
          contactCode: contact?.contactCode,
          type: contact?.type,
          description: contact?.description,
          phone: contact?.phone,
          emergencyContact: contact?.emergencyContact,
          emergencyPhone: contact?.emergencyPhone,
          email: contact?.email,
        })),
      },
    },
  };
};
