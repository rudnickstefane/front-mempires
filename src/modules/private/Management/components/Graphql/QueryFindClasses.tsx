import { gql } from 'graphql-request';

export const QueryFindClasses = gql`
  query FindClasses($companyCode: Int!) {
    findClasses(companyCode: $companyCode) {
      classCode
      name
      modalities {
        categoryCode
        name
        description
        amount
      }
      studentsPerHour
      minimumAlert
      observation
      startDate
      endDate
      status
      sundayHours
      mondayHours
      tuesdayHours
      wednesdayHours
      thursdayHours
      fridayHours
      saturdayHours
      holidayHours
      mondayStatus
      tuesdayStatus 
      wednesdayStatus
      thursdayStatus
      fridayStatus
      saturdayStatus
      sundayStatus
      holidayStatus 
      createdAt
      updatedAt
    }
  }
`;
