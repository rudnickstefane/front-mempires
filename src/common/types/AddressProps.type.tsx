import { ProfileDetails } from "@sr/modules/common/types";

export type AddressDataProps = {
  address: string;
  number: string;
  complement: string;
  zipCode: string;
  district: string;
  city: string;
  state: string;
};

export type AddressProps = {
  data: ProfileDetails;
};
