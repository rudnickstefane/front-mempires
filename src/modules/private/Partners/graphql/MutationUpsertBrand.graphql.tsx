import { gql } from "graphql-request";

export const MutationUpsertBrand = gql`
  mutation UpsertBrand($data: UpsertBrandInput!) {
    upsertBrand(data: $data) {
      brandCode
    }
  }
`;
