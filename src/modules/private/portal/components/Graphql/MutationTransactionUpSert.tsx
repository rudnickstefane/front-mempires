import { gql } from 'graphql-request';

export const MutationTransactionsUpSert = gql`
  mutation TransactionsUpSert($data: TransactionUpSertBatchInput!) {
    transactionsUpSert(data: $data) {
      id
      transactionCode
      createdAt
      updatedAt
    }
  }
`;
