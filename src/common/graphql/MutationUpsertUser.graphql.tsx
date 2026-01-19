import { gql } from "graphql-request";

export const MutationUpsertUser = gql`
  mutation UpsertUser($data: UpsertUserInput!) {
    upsertUser(data: $data) {
      id
      name
      profileCode
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
