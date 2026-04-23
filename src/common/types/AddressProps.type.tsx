export type AddressProps = {
  id?: number;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
};

export type AddressDataProps = {
  data: AddressProps;
};
