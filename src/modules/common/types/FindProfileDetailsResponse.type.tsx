export type FindProfileDetailsResponse = {
  findProfileDetails: {
    username: string;
    status: string;
    role: string;
    lastAccess: string;
    identity: string;
    paymentDay: string;
    photo: string;
    name: string;
    stateMarital: string;
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
    contact: Array<{
      contactCode: string;
      type: string;
      description: string;
      phone: string;
      email: string;
      emailStatus?: string;
    }>;
    userPlan: {
      name: string;
      description: string;
      level: string;
      status: string;
      amount: string;
      startDate: string;
      endDate: string;
      nextDueDate: string;
      createdAt: string;
    };
  };
};
