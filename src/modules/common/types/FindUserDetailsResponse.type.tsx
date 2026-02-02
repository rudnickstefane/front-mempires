import { AddressDataProps, ContactsDataProps } from "@sr/common/types";

export type FindUserDetailsResponse = {
  lastAccess: string;
  code: string;
  identity: string;
  registration: string;
  internalNumber: string;
  name: string;
  gender: string;
  birthDate: string;
  address: AddressDataProps;
  contact: ContactsDataProps;
};
