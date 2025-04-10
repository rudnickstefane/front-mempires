import { gql } from 'graphql-request';

export const MutationCreatePaymentPreference = gql`
  mutation CreatePaymentPreference($transactionCode: String!, $title: String!, $amount: Float!, $quantity: Int!) {
    createPaymentPreference(transactionCode: $transactionCode, title: $title, amount: $amount, quantity: $quantity) {
      id
    }
}
`;
