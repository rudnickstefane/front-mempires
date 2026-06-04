import { gql } from "graphql-request";

export const QueryFindBrands = gql`
  query FindBrands(
    $partnerCode: String!
    $take: Int
    $skip: Int
    $filter: BrandFilterInput
    $orderBy: OrderByInput
  ) {
    findBrands(
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
          brandCode
          partnerCode
          name
          brandClientPolicy
          establishmentsCount
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
