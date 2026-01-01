import { gql } from 'graphql-request';

export const QueryFindReviewQuestions = gql`
  query FindReviewQuestions {
    findReviewQuestions {
      questionCode
      question
      category
      status
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
