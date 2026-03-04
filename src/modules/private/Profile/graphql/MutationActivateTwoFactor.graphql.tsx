import { gql } from "graphql-request";

export const MutationActivateTwoFactor = gql`
  mutation ActivateTwoFactor($code: String!) {
    activateTwoFactor(code: $code)
  }
`;
