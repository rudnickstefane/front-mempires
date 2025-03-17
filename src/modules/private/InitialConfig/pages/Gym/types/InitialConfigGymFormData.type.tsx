export type Plans = {
    value?: number;
    name?: string;
    description?: string;
};

export type Category = {
    name?: string;
    type?: string;
};

export type InitialConfigGymFormData = {
    companyCode?: number;
    is24Hours?: boolean;
    timeZone?: string;
    startTimeMondayToFriday?: string;
    endTimeMondayToFriday?: string;
    startTimeSaturday?: string;
    endTimeSaturday?: string;
    startTimeSunday?: string;
    endTimeSunday?: string;
    selectedDays: string[];
    address?: string;
    number?: string;
    complement?: string;
    zipCode?: string;
    district?: string;
    city?: string;
    state?: string;
    workForms: string[];
    selectedModalities: { name: string; description: string }[];
    selectedSegments: { name: string; description: string }[];
    selectedServices: { name: string; description: string }[];
};  