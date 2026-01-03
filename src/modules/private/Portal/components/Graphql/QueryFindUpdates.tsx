import { gql } from 'graphql-request';

export const QueryFindUpdates = gql`
  query QueryFindUpdates($request: String!) {
    findUpdates(request: $request) {
      updateCode
      description
      type
      version
      impact
      message
      target
      profileCode
      responsible
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
