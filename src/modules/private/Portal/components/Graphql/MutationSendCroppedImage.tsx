import { gql } from 'graphql-request';

export const MutationSendCroppedImage = gql`
  mutation SendCroppedImage($input: ImageDetailsInput!) {
    sendCroppedImage(input: $input) {
      id
      referenceCode
      imageCode
      createdAt
      updatedAt
    }
  }
`;
