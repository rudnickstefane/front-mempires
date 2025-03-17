export type FindCategoriesResponse = {
  findCategories: {
    modality: Array<{
      categoryCode: string;
      amount: string;
      charge: string;
      name: string;
      type: string;
      status: string;
      description: string;
    }>;
    service: Array<{
      categoryCode: string;
      amount: string;
      charge: string;
      name: string;
      type: string;
      status: string;
      description: string;
    }>;
    customService: Array<{
      categoryCode: string;
      amount: string;
      charge: string;
      name: string;
      type: string;
      status: string;
      description: string;
    }>;
    segment: Array<{
      categoryCode: string;
      name: string;
      type: string;
      status: string;
      description: string;
    }>;
  };
};
