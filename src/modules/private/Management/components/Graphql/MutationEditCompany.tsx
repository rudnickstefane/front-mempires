import { gql } from 'graphql-request';

export const MutationEditCompany = gql`
  mutation EditCompany($data: EditCompanyBatchInput!) {
    editCompany(data: $data) {
      fantasyName
      code
      zipCode
      address
      number
      complement
      district
      city
      state
      contact {
        contactCode
        description
        type
        phone
        emergencyContact
        emergencyPhone
        email
      }
    }
  }
`;
