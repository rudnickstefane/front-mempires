import { gql } from 'graphql-request';

export const MutationGroupUpsert = gql`
  mutation GroupUpsert($input: GroupAccessUpsertInput!) {
    groupUpsert(
      input: $input
    )
  }
`;
