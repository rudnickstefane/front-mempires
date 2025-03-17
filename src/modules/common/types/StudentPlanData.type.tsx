export type StudentPlanData = {
  studentPlanCode: string;
  planCode: string;
  name: string;
  periodicityName: string;
  paymentDay: string;
  modalities: string[];
  services: string[];
  amount: string;
  observation: string;
  status: string;
  reEnrollmentAt: string;
  planPayment: string;
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
  deletedAt: string;
};
