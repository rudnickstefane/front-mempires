export type PlanCreateFormData = {
    type: string,
    companyCode: number,
    planCode?: number,
    status: string,
    name: string;
    frequency: string;
    access: string;
    sundayHours: string[],
    mondayHours: string[],
    tuesdayHours: string[],
    wednesdayHours: string[],
    thursdayHours: string[],
    fridayHours: string[],
    saturdayHours: string[],
    holidayHours: string[],
    periodicity: string[];
    periodicityDetails: PeriodicityDetail[];
    startDate: string | null;
    startHours: string | null;
    endDate: string | null;
    endHours: string | null;
    modalities: string[];
    customService: string[];
    description?: string;
    chargeRegistration?: string;
    isAllHours: boolean;
    isCustomHours: boolean;
    isPlan: boolean;
    isPeriodicity: boolean;
    isUnique: boolean;
    isDaily: boolean;
    isValue: boolean;
    isPercentage: boolean;
    observation?: string;
    [key: string]: string | number | boolean | string[] | null | unknown,
}

export type PeriodicityDetail = {
    value: string;  // Ex: '1' para Mensal, '2' para Anual
    label: string;  // Ex: 'Mensal', 'Anual'
    amount: string; // Ex: '99,99'
    fees?: string; // Ex: '99,99'
    charge: string; // Ex: '15,99'
    startDate?: string | null;
    startHours?: string | null;
    endDate?: string | null;
    endHours?: string | null;
    observation?: string;
};
