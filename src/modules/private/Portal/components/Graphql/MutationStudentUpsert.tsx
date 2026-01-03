import { gql } from 'graphql-request';

export const MutationStudentUpsert = gql`
  mutation studentUpsert($data: StudentUpsertInput!) {
    studentUpsert(
      data: $data
    ) {
      id
      createdAt
      updatedAt
      deletedAt
      status
      studentCode
      name
    }
  }
`;
