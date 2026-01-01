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
      userPlan {
        name
        description
        level
        status
        amount
        startDate
        endDate
        nextDueDate
        createdAt
      }
    }
  }
`;
