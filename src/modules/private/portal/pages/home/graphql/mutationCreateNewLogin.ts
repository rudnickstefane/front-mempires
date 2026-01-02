import { gql } from 'graphql-request';

export const MutationNewStudent = gql`
  mutation CreateStudent($createUser: CreateStudentInput!) {
    CreateStudent(createUser: $createUser) {
      token
    }
  }
`;
