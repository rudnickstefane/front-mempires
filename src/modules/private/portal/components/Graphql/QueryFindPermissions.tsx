import { gql } from 'graphql-request';

export const QueryFindPermissions = gql`
  query FindPermissions($profileCode: Int!) {
    findPermissions(profileCode: $profileCode) {
      plan
      module
      items {
        path
        permission
      }
    }
  }
`;
