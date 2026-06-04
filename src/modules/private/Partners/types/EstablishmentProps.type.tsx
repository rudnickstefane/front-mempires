import {
  AddressProps,
  CompanyProps,
  ContactsProps,
  DetailsProps,
} from "@sr/common/types";

export type EstablishmentProps = {
  brandCode?: string;
  partnerCode?: string;
  establishmentCode?: string;
  establishmentsCount?: string;
  brand?: string;
  company: CompanyProps;
  address: AddressProps;
  details: DetailsProps;
  contacts: ContactsProps[];
};
