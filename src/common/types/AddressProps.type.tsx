import { ProfileDetails } from "@sr/modules/common/types";
import { StatesOfBrazilEnum } from "../enums";

export type AddressProps = {
  id?: number;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: StatesOfBrazilEnum;
};

export type AddressDataProps = {
  data: ProfileDetails;
};
