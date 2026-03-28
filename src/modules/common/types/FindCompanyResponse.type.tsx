import { AddressProps } from "@sr/common/types";

export type FindCompanyResponse = {
  id?: number;
  companyCode?: string;
  code: string;
  businessName: string;
  fantasyName: string;
  stateRegistration?: string;
  address: AddressProps;
  createdAt?: Date;
  updatedAt?: Date;
};
