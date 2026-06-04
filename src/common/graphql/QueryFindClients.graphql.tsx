import { gql } from "graphql-request";

export const QueryFindClients = gql`
  query FindClients(
    $partnerCode: String!
    $take: Int
    $skip: Int
    $filter: ClientFilterInput
    $orderBy: OrderByInput
  ) {
    findClients(
      partnerCode: $partnerCode
      take: $take
      skip: $skip
      filter: $filter
      orderBy: $orderBy
    ) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        pageCount
      }
      edges {
        node {
          clientCode
          partnerCode
          name
          # Dados da Empresa
          company {
            id
            code
            businessName
            fantasyName
            stateRegistration
          }
          # Dados de Endereço
          address {
            id
            zipCode
            address
            number
            complement
            district
            city
            state
          }
          # Detalhes e Status
          details {
            id
            companyCode
            status
          }
          # Lista de Contatos
          contacts {
            id
            type
            description
            email
            phone
          }
        }
      }
    }
  }
`;
