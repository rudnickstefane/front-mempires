import { gql } from "graphql-request";

export const QueryFindProfileDetails = gql`
  query FindProfileDetails($profileCode: String!) {
    findProfileDetails(profileCode: $profileCode) {
      name
      lastAccess
      identity
      photo
      gender
      zipCode
      address
      number
      complement
      district
      city
      state
      birthDate
      responsible
      profession
      company
      contact {
        contactCode
        description
        phone
        email
      }
    }
  }
`;
