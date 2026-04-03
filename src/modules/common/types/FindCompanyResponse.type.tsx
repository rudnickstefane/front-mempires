import { AddressProps } from "@sr/common/types";

export type FindCompanyResponse = {
  id?: number;
  code: string;
  businessName: string;
  fantasyName: string;
  stateRegistration?: string;
  address: AddressProps;
  createdAt?: Date;
  updatedAt?: Date;
};
