import { gql } from 'graphql-request';

export const MutationContributorUpsert = gql`
  mutation ContributorUpsert($data: ContributorUpsertInput!) {
    contributorUpsert(
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
