import { gql } from 'graphql-request';

export const QueryFindShortcuts = gql`
  query FindShortcuts ($companyCode: Int!, $profileCode: Int!) {
    findShortcuts (companyCode: $companyCode, profileCode: $profileCode) {
      shortcutCode
      groupCode
      name
    }
  }
`;
