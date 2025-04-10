import { gql } from 'graphql-request';

export const MutationCreatePayment = gql`
  mutation CreatePayment($data: CreatePaymentInput!) {
    createPayment(data: $data) {
      id
      status
      detail
      init_point
      qr_code
      qr_code_base64
    }
}
`;
