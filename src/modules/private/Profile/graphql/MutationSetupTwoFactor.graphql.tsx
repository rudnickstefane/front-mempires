import { gql } from "graphql-request";

export const MutationSetupTwoFactor = gql`
  mutation SetupTwoFactor {
    setupTwoFactor {
      secret
      qrCode
    }
  }
`;
