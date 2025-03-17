export type FindCompanyDetailsResponse = {
  findCompanyDetails: {
    code: string;
    ownershipType: string;
    fantasyName: string;
    photo: string;
    entity: string;
    status: string;
    zipCode: string;
    address: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    contact: Array<{
      contactCode: string;
      type: string;
      description: string;
      phone: string;
      email: string;
      emailStatus?: string;
      emergencyContact?: string;
      emergencyPhone?: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
};
