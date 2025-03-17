import { gql } from 'graphql-request';

export const MutationCreateAccess = gql`
  mutation createAccess($data: AccessBatchInput!) {
    createAccess(
      data: $data
    ) {
      id
      createdAt
      uuid
      status
      assignment
      profileCode
      companyCode
      name
      fantasyName
    }
  }
`;
