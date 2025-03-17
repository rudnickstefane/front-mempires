import { CreateAccessFormData } from "../components/types";


export const CreateAccessVariables = (formData: CreateAccessFormData) => {

  return {
    data: {
      origin: formData.origin,
      input: [
        {
          name: formData.name,
          email: formData.email,
          fantasyName: formData.fantasyName,
          code: formData.code,
          phone: formData.phone,
          password: formData.password,
          assignment: formData.assignment,
        },
      ],
    },
  }
};