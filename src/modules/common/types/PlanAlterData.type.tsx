export type PlanAlterData = {
  findPlans: {
    planCode: string;
    name: string;
    periodicities: Array<{
      periodicityCode: string;
      periodicity: string;
      name: string;
      amount: string;
      charge?: string;
      fees?: string;
      startDate?: string;
      endDate?: string;
      observation?: string;
    }>;
    modalities: Array<{
      categoryCode: string;
      name: string;
      description?: string;
      amount?: number;
    }>;
    customServices: Array<{
      name: string;
      description?: string;
      amount?: number;
    }>;
    observation: string;
    startDate: string;
    endDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};
