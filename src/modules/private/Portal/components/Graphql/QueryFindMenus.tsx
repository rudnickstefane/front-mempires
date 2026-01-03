import { gql } from "graphql-request";

export const QueryFindMenus = gql`
  query FindMenus($token: String) {
    findMenus(token: $token) {
      id
      menuCode
      mainMenuCode
      name
      description
      path
      icon
      SubMenus {
        menuCode
        mainMenuCode
        name
        description
        path
        icon
      }
    }
  }
`;
