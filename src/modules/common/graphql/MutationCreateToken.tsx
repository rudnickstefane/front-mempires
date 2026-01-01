import { gql } from "graphql-request";

export const MutationCreateToken = gql`
  mutation createAccessToken(
    $origin: OriginEnum!
    $login: String!
    $password: String!
  ) {
    createAccessToken(
      data: { origin: $origin, login: $login, password: $password }
    ) {
      token
      user {
        id
        profileCode
        name
        code
        uuid
        email
        pendingEmail
        profiles {
          partner {
            code
            fantasyName
            companyCode
            status
            isMaster
            permissions
          }
          client {
            code
            fantasyName
            companyCode
            status
            isMaster
            permissions
          }
          affiliate {
            code
            fantasyName
            companyCode
            status
            isMaster
            permissions
          }
          establishment {
            code
            fantasyName
            companyCode
            status
            isMaster
            permissions
          }
          brands {
            code
            fantasyName
            companyCode
            status
            isMaster
            permissions
          }
          beneficiary {
            card
            type
            status
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;
