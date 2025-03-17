import { gql } from 'graphql-request';

export const QueryFindSlides = gql`
  query FindSlides ($origin: String!) {
    findSlides (origin: $origin) {
      slideCode
      image
      path
    }
  }
`;
