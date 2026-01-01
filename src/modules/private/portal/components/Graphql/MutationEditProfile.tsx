import { gql } from 'graphql-request';

export const MutationEditProfile = gql`
  mutation EditProfile($data: EditProfileBatchInput!) {
    editProfile(data: $data) {
      name
      username
      identity
      zipCode
      address
      number
      complement
      district
      city
      state
      birthDate
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
