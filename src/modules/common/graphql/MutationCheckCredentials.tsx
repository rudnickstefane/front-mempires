import { gql } from 'graphql-request';

export const MutationCheckCredentials = gql`
  mutation checkCredentials($validation: String!, $uuid: String!, $token: String!) {
    checkCredentials(validation: $validation, uuid: $uuid, token: $token)
  }
`;
