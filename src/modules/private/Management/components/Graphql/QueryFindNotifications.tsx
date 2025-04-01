import { gql } from 'graphql-request';

export const QueryFindNotifications = gql`
  query FindNotifications($companyCode: Int!, $profileCode: Int!) {
    findNotifications(companyCode: $companyCode, profileCode: $profileCode) {
      notificationCode
      userName
      companyName
      title
      description
      path
      read
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
