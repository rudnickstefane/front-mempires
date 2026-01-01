import { gql } from 'graphql-request';

export const QueryFindPlans = gql`
  query FindPlans($companyCode: Int!) {
    findPlans(companyCode: $companyCode) {
      planCode
      name
      periodicities {
        periodicityCode
        periodicity
        name
        amount
        charge
        fees
        startDate
        endDate
        observation
      }
      modalities {
        categoryCode
        name
        description
        amount
      }
      customServices {
        categoryCode
        name
        description
        amount
      }
      typeCharge
      feesFrequency
      calculationBase
      observation
      startDate
      endDate
      status
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
