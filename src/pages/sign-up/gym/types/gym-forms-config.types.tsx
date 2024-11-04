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
    cep: string;
    neighborhood: string;
    city: string;
    state: string;
};

export type PlansType = {
    label: string;
    value: number;
    description: string;
};

export type GymStepThreeFormsConfig = {
    workForms: string[];
    plans?: PlansType[];
};

export type GymStepOthersFormsConfig = {
    selectedModalities: string[];
    selectedServices: string[];
    selectedSegments: string[];
};