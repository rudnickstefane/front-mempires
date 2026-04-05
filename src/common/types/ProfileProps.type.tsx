import { AddressProps } from "./AddressProps.type";
import { ContactsProps } from "./ContactsProps.type";

export type ProfileProps = {
  lastAccess: string;
  code: string;
  identity: string;
  registration: string;
  internalNumber: string;
  name: string;
  gender: string;
  birthDate: string;
  address: AddressProps;
  contact: ContactsProps;
};
