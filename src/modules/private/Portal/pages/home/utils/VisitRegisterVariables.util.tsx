import { VisitRegisterFormData } from "../../../../../common/types";

export const VisitRegisterVariables = (
  formData: VisitRegisterFormData,
  indicationCode?: number,
) => {
  return {
    input: [
      {
        assignment: formData.assignment,
        name: formData.name,
        identity: formData.identity,
        referralSource: formData.referralSource,
        indicationCode: indicationCode,
        modalities: formData.modalities,
        observation: formData.observation,
        email: formData.email,
        phone: formData.phone,
      },
    ],
  }
};