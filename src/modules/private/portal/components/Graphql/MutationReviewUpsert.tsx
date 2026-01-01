import { gql } from 'graphql-request';

export const MutationReviewUpsert = gql`
  mutation ReviewUpsert($input: ReviewUpsertInput!) {
    reviewUpsert(input: $input) {
      id
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
