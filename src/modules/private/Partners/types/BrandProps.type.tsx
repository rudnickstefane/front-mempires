import { BrandClientPolicyEnum } from "@sr/common/enums";
import {
  AddressProps,
  CompanyProps,
  ContactsProps,
  DetailsProps,
} from "@sr/common/types";

export type BrandProps = {
  brandCode?: string;
  partnerCode?: string;
  name?: string;
  brandClientPolicy?: BrandClientPolicyEnum;
  establishmentsCount?: number;
  clients?: [];
  company: CompanyProps;
  address: AddressProps;
  details: DetailsProps;
  contacts: ContactsProps[];
};
