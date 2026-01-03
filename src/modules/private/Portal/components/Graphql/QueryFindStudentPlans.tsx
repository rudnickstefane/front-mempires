import { gql } from 'graphql-request';

export const QueryFindStudentPlans = gql`
  query FindStudentPlans($companyCode: Int!, $studentCode: Int!) {
    findStudentPlans(companyCode: $companyCode, studentCode: $studentCode) {
      studentPlanCode
      planCode
      name
      periodicityName
      paymentDay
      modalities
      amount
      observation
      status
      reEnrollmentAt
      planPayment
      frequency
      access
      hours
      sundayHours
      mondayHours
      tuesdayHours
      wednesdayHours
      thursdayHours
      fridayHours
      saturdayHours
      holidayHours
      createdAt
      updatedAt
    }
  }
`;
