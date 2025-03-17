import { gql } from 'graphql-request';

export const QueryFindMenus = gql`
  query FindMenus($companyCode: Int!, $profileCode: Int!) {
    findMenus(companyCode: $companyCode, profileCode: $profileCode) {
      menuCode
      name
      description
      path
      icon
      type
      SubMenus {
        subMenuCode
        menuCode
        name
        description
        path
        icon
      }
    }
  }
`;
