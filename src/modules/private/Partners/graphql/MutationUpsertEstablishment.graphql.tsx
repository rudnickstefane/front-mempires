import { gql } from "graphql-request";

export const MutationUpsertEstablishment = gql`
  mutation UpsertEstablishment($data: UpsertEstablishmentInput!) {
    upsertEstablishment(data: $data) {
      establishmentCode
    }
  }
`;
