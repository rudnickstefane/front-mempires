import { gql } from 'graphql-request';

export const QueryFindCategories = gql`
  query FindCategories($companyCode: Int!) {
    findCategories(companyCode: $companyCode) {
      modality {
        categoryCode
        amount
        charge
        name
        type
        status
        description
      }
      service {
        categoryCode
        amount
        charge
        name
        type
        status
        description
      }
      customService {
        categoryCode
        amount
        charge
        name
        type
        status
        description
      }
      segment {
        categoryCode
        name
        type
        status
        description
      }
    }
  }
`;
