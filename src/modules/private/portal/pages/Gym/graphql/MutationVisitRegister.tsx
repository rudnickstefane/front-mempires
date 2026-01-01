import { gql } from 'graphql-request';

export const MutationVisitRegister = gql`
  mutation VisitRegister ($input: [VisitRegisterInput!]!) {
    visitRegister(
      input: $input
    ) {
      id
      createdAt
      visitCode
      name
    }
  }
`;
