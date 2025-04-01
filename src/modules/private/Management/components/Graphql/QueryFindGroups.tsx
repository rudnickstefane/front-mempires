import { gql } from 'graphql-request';

export const QueryFindGroups = gql`
  query FindGroups($companyCode: Int!) {
    findGroups(companyCode: $companyCode) {
      groupCode
      name
      description
      status
      totalContributors
      permissions {
        permissionCode
        name
        path
        permission
      }
      createdAt
      updatedAt
    }
  }
`;
