import { gql } from 'graphql-request';

export const MutationClassUpsert = gql`
  mutation ClassUpsert($input: ClassUpsertInput!) {
    classUpsert(input: $input) {
      id
      classCode
      name
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
