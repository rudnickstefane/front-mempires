export type FindProfileDetailsResponse = {
  findProfileDetails: {
    name: string;
    lastAccess: string;
    identity: string;
    photo: string;
    gender: string;
    address: string;
    number: string;
    complement: string;
    zipCode: string;
    district: string;
    city: string;
    state: string;
    birthDate: string;
    responsible: string;
    profession: string;
    company: string;
    contact: {
      contactCode: string;
      description: string;
      phone: string;
      email: string;
    };
  };
};
