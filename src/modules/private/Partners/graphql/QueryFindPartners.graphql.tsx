import { gql } from "graphql-request";

export const QueryFindPartners = gql`
  query FindPartners($take: Int, $skip: Int, $filter: PartnerFilterInput) {
    findPartners(take: $take, skip: $skip, filter: $filter) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        pageCount
      }
      edges {
        node {
          partnerCode
          segment
          entity
          fee
          rewardsRate
          storeCount
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
            abbreviation
            ecommerce
            effectiveStart
            effectiveEnd
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
