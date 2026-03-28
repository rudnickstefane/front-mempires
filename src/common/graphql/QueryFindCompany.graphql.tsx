import { gql } from "graphql-request";

export const QueryFindCompany = gql`
  query FindCompany($code: String!, $memberType: String) {
    findCompany(code: $code, memberType: $memberType) {
      id
      code
      businessName
      fantasyName
      stateRegistration
      address {
        zipCode
        address
        number
        complement
        district
        city
        state
      }
      createdAt
      updatedAt
    }
  }
`;
