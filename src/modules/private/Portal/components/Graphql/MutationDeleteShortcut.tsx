import { gql } from 'graphql-request';

export const MutationDeleteShortcut = gql`
  mutation DeleteShortcut($shortcutCode: Int!, $profileCode: Int!) {
    deleteShortcut(shortcutCode: $shortcutCode, profileCode: $profileCode)
  }
`;
