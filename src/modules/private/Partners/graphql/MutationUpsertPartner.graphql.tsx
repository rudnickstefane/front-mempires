import { gql } from "graphql-request";

export const MutationUpsertPartner = gql`
  mutation UpsertPartner($data: UpsertPartnerInput!) {
    upsertPartner(data: $data) {
      partnerCode
    }
  }
`;
