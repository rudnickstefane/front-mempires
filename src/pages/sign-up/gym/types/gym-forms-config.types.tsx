export type GymStepOneFormsConfig = {
    startTimeMondayToFriday: string,
    endTimeMondayToFriday: string,
    startTimeSaturday: string,
    endTimeSaturday: string,
    startTimeSunday: string,
    endTimeSunday: string,
    timeZone: string,
    selectedDays: string[];
    isPersonalizable: boolean;
    is24Hours: boolean;
};

export type GymStepTwoFormsConfig = {
    address: string;
    number: string;
    complement: string;
    zipCode: string;
    district: string;
    city: string;
    state: string;
};

export type PlansType = {
    name: string;
    value: number;
    description: string;
};

export type GymStepThreeFormsConfig = {
    workForms: string[];
};

export type GymStepOthersFormsConfig = {
    selectedModalities: { name: string; description: string }[];
    selectedServices: { name: string; description: string }[];
    selectedSegments: { name: string; description: string }[];
};