import { gql } from 'graphql-request';

export const MutationInitialConfigure = gql`
  mutation initialConfigure($data: InitialConfigureBatchInput!) {
    initialConfigure(
      data: $data
    ) {
      id
      profileCode
      companyCode
      status
      createdAt
      updatedAt
    }
  }
`;
