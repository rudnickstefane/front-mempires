export const MutationUpdatePassword = `
  mutation updatePassword($data: UpdatePasswordInput!) {
    updatePassword(data: $data)
  }
`;
