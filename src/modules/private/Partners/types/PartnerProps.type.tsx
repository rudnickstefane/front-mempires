import { EntityEnum, SegmentEnum } from "@sr/common/enums";
import {
  AddressProps,
  CompanyProps,
  ContactsProps,
  DetailsProps,
} from "@sr/common/types";

export type PartnerProps = {
  partnerCode?: string;
  segment?: SegmentEnum;
  entity?: EntityEnum;
  fee?: string | number;
  rewardsRate?: string | number;
  storeCount?: number;
  company: CompanyProps;
  address: AddressProps;
  details: DetailsProps;
  contacts: ContactsProps[];
};
