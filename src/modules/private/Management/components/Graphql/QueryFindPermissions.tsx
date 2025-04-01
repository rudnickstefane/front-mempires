import { gql } from 'graphql-request';

export const QueryFindPermissions = gql`
  query FindPermissions($profileCode: Int!) {
    findPermissions(profileCode: $profileCode) {
      module
      items {
        path
        permission
      }
    }
  }
`;
