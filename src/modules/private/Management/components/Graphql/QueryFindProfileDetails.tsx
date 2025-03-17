import { gql } from 'graphql-request';

export const QueryFindProfileDetails = gql`
  query FindProfileDetails($profileCode: Int!) {
    findProfileDetails(profileCode: $profileCode) {
      username
      status
      role
      lastAccess
      identity
      paymentDay
      photo
      name
      stateMarital
      gender
      address
      number
      complement
      zipCode
      district
      city
      state
      birthDate
      responsible
      profession
      company
      companyStatus
      contact {
        contactCode
        type
        description
        phone
        email
        emailStatus
        emergencyContact
        emergencyPhone
      }
      clientsPlan {
        name
        description
        amount
        startDate
        endDate
        nextDueDate
        createdAt
      },
    }
  }
`;
