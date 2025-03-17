export type FindPlansResponse = {
  findPlans: Array<{
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
      categoryCode: string;
      name: string;
      description?: string;
      amount?: number;
    }>;
    typeCharge: string;
    feesFrequency: string;
    calculationBase: string;
    observation: string;
    startDate: string;
    endDate: string;
    status: string;
    frequency: string;
    access: string;
    hours: string;
    sundayHours: string[],
    mondayHours: string[],
    tuesdayHours: string[],
    wednesdayHours: string[],
    thursdayHours: string[],
    fridayHours: string[],
    saturdayHours: string[],
    holidayHours: string[],
    createdAt: string;
    updatedAt: string;
  }>;
};
