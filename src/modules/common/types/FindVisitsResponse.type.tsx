export type FindVisitsResponse = {
  findVisits: Array<{
    visitCode: string;
    name: string;
    identity: string;
    referralSource: string;
    indicationCode: string;
    indicationStatus: string;
    nameIndication: string;
    phone: string;
    email: string;
    observation: string;
    categories: Array<{
      categoryCode: string;
      name: string;
      description: string;
    }>;
    createdAt: string;
    updatedAt: string;
  }>;
};
