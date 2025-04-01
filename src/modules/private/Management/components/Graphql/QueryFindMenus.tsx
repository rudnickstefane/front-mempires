import { gql } from 'graphql-request';

export const QueryFindMenus = gql`
  query FindMenus($companyCode: Int!) {
    findMenus(companyCode: $companyCode) {
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
