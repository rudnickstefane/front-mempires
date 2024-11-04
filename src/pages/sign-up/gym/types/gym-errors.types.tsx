export type GymConfigErrorStepOne = {
    startTimeMondayToFridayError?: string | null;
    endTimeMondayToFridayError?: string | null;
    startTimeSaturdayError?: string | null;
    endTimeSaturdayError?: string | null;
    startTimeSundayError?: string | null;
    endTimeSundayError?: string | null;
    dayError?: string | null;
    timeZoneError?: string | null;
};

export type GymConfigErrorStepTwo = {
    addressError?: string | null;
    numberError?: string | null;
    complementError?: string | null;
    neighborhoodError?: string | null;
    cepError?: string | null;
    cityError?: string | null;
    stateError?: string | null;
};

export type GymConfigErrorStepThree = {
    workFormError?: string | null;
    plansError?: string | null;
};