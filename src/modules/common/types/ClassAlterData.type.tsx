export type ClassAlterData = {
  findClasses: {
    classCode: string;
    name: string;
    modalities: Array<{
      categoryCode: string;
      name: string;
      description?: string;
      amount?: number;
    }>;
    observation: string;
    startDate: string;
    endDate: string;
    studentsPerHour: number;
    minimumAlert: number;
    status: string;
    sundayHours: string[],
    mondayHours: string[],
    tuesdayHours: string[],
    wednesdayHours: string[],
    thursdayHours: string[],
    fridayHours: string[],
    saturdayHours: string[],
    holidayHours: string[],
    mondayStatus: string,
    tuesdayStatus: string,
    wednesdayStatus: string,
    thursdayStatus: string,
    fridayStatus: string,
    saturdayStatus: string,
    sundayStatus: string,
    holidayStatus: string,
    createdAt: string;
    updatedAt: string;
  };
};
