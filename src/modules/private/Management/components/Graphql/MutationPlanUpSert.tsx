import { gql } from 'graphql-request';

export const MutationPlanUpSert = gql`
  mutation PlanGymUpSert($input: PlanUpSertInput!) {
    planGymUpSert(input: $input) {
      id
      planCode
      name
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
