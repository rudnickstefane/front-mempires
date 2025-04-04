import { gql } from 'graphql-request';

export const MutationAccountRecovery = gql`
  mutation accountRecovery($origin: String!, $recovery: String!) {
    accountRecovery(origin: $origin, recovery: $recovery)
  }
`;
