import { ProfileDetails } from "@sr/modules/common/types";

export type AddressDataProps = {
  id: number;
  address: string;
  number: string;
  complement: string;
  zipCode: string;
  district: string;
  city: string;
  state: string;
};

export type AddressProps = {
  label: AddressDataProps;
  data: ProfileDetails;
};
