export type DrawerFormUserProps = {
  details: {
    code: string;
    identity: string;
    registration: string;
    internalNumber: string;
    name: string;
    gender: string;
    birthDate: string;
  };
  address: {
    id: number;
    address: string;
    number: string;
    complement: string;
    zipCode: string;
    district: string;
    city: string;
    state: string;
  };
  contact: {
    id: number;
    type: string;
    description: string;
    email: string;
    phone: string;
    status: string;
  };
};
