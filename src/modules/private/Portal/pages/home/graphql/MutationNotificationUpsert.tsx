import { gql } from 'graphql-request';

export const MutationNotificationUpsert = gql`
  mutation NotificationUpsert($input: NotificationUpsertInput!) {
    notificationUpsert(input: $input)
  }
`;
