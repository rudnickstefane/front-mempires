import { gql } from 'graphql-request';

export const MutationStudentPlansUpsert = gql`
  mutation StudentPlansUpsert($input: [StudentPlansUpsertInput!]!) {
    studentPlansUpsert(
      input: $input
    ) {
      id
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
