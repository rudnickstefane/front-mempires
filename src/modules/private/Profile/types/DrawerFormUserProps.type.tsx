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
    address: string;
    number: string;
    complement: string;
    zipCode: string;
    district: string;
    city: string;
    state: string;
  };
  contact: {
    type: string;
    description: string;
    email: string;
    phone: string;
    status: string;
  };
};
