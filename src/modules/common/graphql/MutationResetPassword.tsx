import { gql } from 'graphql-request';

export const MutationResetPassword = gql`
  mutation resetPassword($origin: String!, $password: String!, $confirmPassword: String!, $uuid: String!, $token: String!) {
    resetPassword(origin: $origin, password: $password, confirmPassword: $confirmPassword, uuid: $uuid, token: $token)
  }
`;
