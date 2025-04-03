import { gql } from 'graphql-request';

export const MutationConfirmMail = gql`
  mutation confirmMail($uuid: String!, $token: String!) {
    confirmMail(uuid: $uuid, token: $token)
  }
`;
