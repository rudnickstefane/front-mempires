import { EditCompanyFormData } from "../types";
import { Contact } from "../types/EditProfileFormData.type";

export const EditCompanyVariables = (formData: EditCompanyFormData, contacts: Contact[]) => {
  return {
    data: {
      companyCode: formData.companyCode,
      profileCode: formData.profileCode,
      origin: formData?.origin,
      input: {
        fantasyName: formData?.fantasyName,
        code: formData?.code,
        address: formData?.address,
        number: formData?.number,
        complement: formData?.complement,
        zipCode: formData?.zipCode,
        district: formData?.district,
        city: formData?.city,
        state: formData?.state,
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
