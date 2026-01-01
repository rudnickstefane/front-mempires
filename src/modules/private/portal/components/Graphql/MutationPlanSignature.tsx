import { gql } from 'graphql-request';

export const MutationPlanSignature = gql`
  mutation PlanSignature($input: SignaturePlanInput!) {
    planSignature(input: $input)
  }
`;
