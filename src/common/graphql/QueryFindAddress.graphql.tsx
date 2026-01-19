import { gql } from "graphql-request";

export const QueryFindAddress = gql`
  query FindAddress($zipCode: String!) {
    findAddress(zipCode: $zipCode) {
      id
      zipCode
      address
      number
      complement
      district
      city
      state
    }
  }
`;
