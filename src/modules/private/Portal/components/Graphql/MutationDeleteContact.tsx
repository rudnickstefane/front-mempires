import { gql } from 'graphql-request';

export const MutationDeleteContact = gql`
  mutation DeleteContact($contactCode: Int!) {
    deleteContact(contactCode: $contactCode)
  }
`;
