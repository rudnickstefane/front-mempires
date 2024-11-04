// types.ts

export interface GymConfigFormData {
    startTimeMondayToFriday: string;
    endTimeMondayToFriday: string;
    startTimeSaturday: string;
    endTimeSaturday: string;
    startTimeSunday: string;
    endTimeSunday: string;
    selectedDays: string[]; // Exemplo: ["Monday", "Tuesday", ...]
    timeZone: string;
    isPersonalizable: boolean;
    is24Hours: boolean;
}

// Exemplo de erros relacionados ao formulário
export interface GymConfigErrors {
    startTimeMondayToFridayError: string;
    endTimeMondayToFridayError: string;
    startTimeSaturdayError: string;
    endTimeSaturdayError: string;
    startTimeSundayError: string;
    endTimeSundayError: string;
    dayError: string;
    timeZoneError: string;
}
