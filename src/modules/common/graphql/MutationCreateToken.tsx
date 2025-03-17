import { gql } from 'graphql-request';

export const MutationCreateToken = gql`
  mutation createToken($origin: String!, $login: String!, $password: String!) {
    createToken(
      origin: $origin,
      login: $login,
      password: $password
    ) {
      token
      user {
        id
        uuid
        email
        name
        status
        identity
        profileCode
        profiles {
          role
          status
          assignment
          code
          fantasyName
          ownershipType
          companyCode
        }
      }
    }
  }
`;
