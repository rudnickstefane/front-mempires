export type ClassCreateFormData = {
    type: string;
    companyCode: number;
    classCode?: number;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    startHours: string;
    observation: string;
    endHours: string;
    modalities: string[];
    studentsPerHour: string;
    minimumAlert: string;
    sundayHours: string[],
    mondayHours: string[],
    tuesdayHours: string[],
    wednesdayHours: string[],
    thursdayHours: string[],
    fridayHours: string[],
    saturdayHours: string[],
    holidayHours: string[],
}