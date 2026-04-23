import { BrandClientPolicyEnum } from "@sr/common/enums";
import {
  AddressProps,
  CompanyProps,
  ContactsProps,
  DetailsProps,
} from "@sr/common/types";

export type EstablishmentProps = {
  brandCode?: string;
  partnerCode?: string;
  name?: string;
  brandClientPolicy?: BrandClientPolicyEnum;
  storeCount?: number;
  company: CompanyProps;
  address: AddressProps;
  details: DetailsProps;
  contacts: ContactsProps[];
};
