import { gql } from 'graphql-request';

export const MutationShortcutCreate = gql`
  mutation ShortcutCreate($input: ShortcutCreateInput!) {
    shortcutCreate(input: $input)
  }
`;
