import { EditProfileFormData } from "../types";
import { Contact } from "../types/EditProfileFormData.type";

export const EditProfileVariables = (formData: EditProfileFormData, contacts: Contact[], indicationCode?: number,) => {
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
        referralSource: formData.referralSource,
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
