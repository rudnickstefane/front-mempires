import { gql } from 'graphql-request';

export const MutationTicketUpsert = gql`
  mutation TicketUpsert($input: TicketUpsertInput!) {
    ticketUpsert(input: $input)
  }
`;
