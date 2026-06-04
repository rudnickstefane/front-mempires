import { gql } from "graphql-request";

export const QueryFindEstablishments = gql`
  query FindEstablishments(
    $partnerCode: String!
    $take: Int
    $skip: Int
    $filter: EstablishmentFilterInput
    $orderBy: OrderByInput
  ) {
    findEstablishments(
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
          establishmentCode
          brand
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
