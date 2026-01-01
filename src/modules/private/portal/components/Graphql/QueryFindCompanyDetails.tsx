import { gql } from 'graphql-request';

export const QueryFindCompanyDetails = gql`
  query FindCompanyDetails($companyCode: Int!) {
    findCompanyDetails(companyCode: $companyCode) {
      code
      ownershipType
      fantasyName
      businessName
      photo
      stateRegistration
      entity
      status
      zipCode
      address
      number
      complement
      district
      city
      state
      startDate
      endDate
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
      createdAt
      updatedAt
    }
  }
`;
