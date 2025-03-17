import { gql } from 'graphql-request';

export const QueryFindVisits = gql`
  query FindVisits($companyCode: Int!) {
    findVisits(companyCode: $companyCode) {
      profileCode
      status
      name
      username
      identity
      photo
      rewardsCredit
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
      referralSource
      indicationCode
      indicationStatus
      nameIndication
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
      plan {
        studentPlanCode
        name
        periodicityName
        paymentDay
        modalities
        amount
        observation
        status
        reEnrollmentAt
        planPayment
        createdAt
        deletedAt
      }
      createdAt
      updatedAt
    }
  }
`;
