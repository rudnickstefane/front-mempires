import { FindCompanyResponse } from "../types";

export const mapCompanyToForm = (
  data: FindCompanyResponse,
): FindCompanyResponse => {
  return {
    id: Number(data?.id) ?? -1,
    companyCode: data?.companyCode ?? "",
    code: data?.code ?? "",
    businessName: data?.businessName ?? "",
    fantasyName: data?.fantasyName ?? "",
    stateRegistration: data?.stateRegistration ?? "",
    address: {
      zipCode: data.address?.zipCode ?? "",
      address: data.address?.address ?? "",
      number: data.address?.number ?? "",
      complement: data.address?.complement ?? "",
      district: data.address?.district ?? "",
      city: data.address?.city ?? "",
      state: data.address?.state ?? "",
    },
  };
};
