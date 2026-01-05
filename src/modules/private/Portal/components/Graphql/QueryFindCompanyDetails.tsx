import { gql } from "graphql-request";

export const QueryFindCompanyDetails = gql`
  query FindCompanyDetails($companyCode: String!) {
    findCompanyDetails(companyCode: $companyCode) {
      code
      fantasyName
      businessName
      stateRegistration
      zipCode
      address
      number
      complement
      district
      city
      state
      effectiveStart
      effectiveEnd
      createdAt
      updatedAt
    }
  }
`;
