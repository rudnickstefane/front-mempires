import { gql } from 'graphql-request';

export const QueryCheckUsernameAvailability = gql`
  query CheckUsernameAvailability($username: String!) {
    checkUsernameAvailability(username: $username)
  }
`;
