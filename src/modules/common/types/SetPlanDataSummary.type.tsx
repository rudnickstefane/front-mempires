export type SetPlanDataSummary = {
  setDataPlanSummary: {
    name: string;
    modalities: { value: string; label: string; amount: string }[];
    customService: { value: string; label: string; amount: string }[];
    typeCharge: string;
    feesFrequency: string;
    calculationBase: string;
    startDate: string;
    startHours: string;
    endDate: string;
    endHours: string;
    observation: string;
    periodicities: Array<{
      name: string;
      periodicity: string;
      charge: string;
      amount: string;
      fees: string;
      startDate: string;
      startHours: string;
      endDate: string;
      endHours: string;
      observation: string;
      totalModalities: string;
      totalCustomService: string;
      totalWithExtras: string;
      totalValue: number;
    }>;
  };
};
