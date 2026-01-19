import { AddressDataProps } from "@sr/common/types";

export type FindAddressResponse = {
  findAddress: AddressDataProps & {
    id: number;
  };
};
