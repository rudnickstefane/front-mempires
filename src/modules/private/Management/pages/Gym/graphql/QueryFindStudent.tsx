import { gql } from 'graphql-request';

export const QueryFindStudent = gql`
  query FindStudent ($companyCode: Int!, $search: String!) {
    findStudent(companyCode: $companyCode, search: $search) {
      profileCode
      name
      identity
      address
    }
  }
`;
