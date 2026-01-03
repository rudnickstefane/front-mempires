import { gql } from 'graphql-request';

export const QueryFindVisits = gql`
  query FindVisits($companyCode: Int!) {
    findVisits(companyCode: $companyCode) {
      visitCode
      name
      identity
      referralSource
      indicationCode
      indicationStatus
      nameIndication
      phone
      email
      observation
      categories {
        categoryCode
        name
        description
      }
      createdAt
      updatedAt
    }
  }
`;
