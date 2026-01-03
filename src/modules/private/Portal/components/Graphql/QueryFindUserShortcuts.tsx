import { gql } from 'graphql-request';

export const QueryFindUserShortcuts = gql`
  query FindUserShortcuts ($profileCode: Int!) {
    findUserShortcuts (profileCode: $profileCode) {
      shortcutCode
      name
      path
      icon
      colorPrimary
      colorSecond
    }
  }
`;
