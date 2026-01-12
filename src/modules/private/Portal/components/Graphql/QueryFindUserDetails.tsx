import { gql } from "graphql-request";

export const QueryFindUserDetails = gql`
  query FindUserDetails($profileCode: String!) {
    findUserDetails(profileCode: $profileCode) {
      lastAccess
      code
      identity
      registration
      internalNumber
      name
      gender
      birthDate
      address {
        zipCode
        address
        number
        complement
        district
        city
        state
      }
      contact {
        id
        type
        description
        email
        phone
        status
      }
    }
  }
`;
