import { gql } from 'graphql-request';

export const QueryFindContributors = gql`
  query FindContributors($companyCode: Int!) {
    findContributors(companyCode: $companyCode) {
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
      position
      groupName
      groupCode
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
