export type FindReviewQuestionsResponse = {
  findReviewQuestions: Array<{
    questionCode: string;
    question: string;
    category: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }>;
};
