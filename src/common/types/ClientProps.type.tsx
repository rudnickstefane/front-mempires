import {
  AddressProps,
  CompanyProps,
  ContactsProps,
  DetailsProps,
} from "@sr/common/types";

export type ClientProps = {
  clientCode?: string;
  partnerCode?: string;
  name?: string;
  company: CompanyProps;
  address: AddressProps;
  details: DetailsProps;
  contacts: ContactsProps[];
};
