import { gql } from 'graphql-request';

export const MutationNewGym = gql`
  mutation CreateGym($createGym: CreateGymInput!) {
    CreateGym(createGym: $createGym) {
      token
    }
  }
`;