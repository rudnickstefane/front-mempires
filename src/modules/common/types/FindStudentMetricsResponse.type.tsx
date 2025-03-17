export type StudentMetrics = {
  newStudents: {
    value: number;
    percentageChange: number;
  };
  newVisitors: {
    value: number;
    percentageChange: number;
  };
  activeStudents: {
    value: number;
  };
  reEnrollments: {
    value: number;
  };
  terminations: {
    value: number;
  };
};

export type FindStudentMetricsResponse = {
  findStudentMetrics: StudentMetrics;
};
