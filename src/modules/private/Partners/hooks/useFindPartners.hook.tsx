import { useBackend } from "@sr/modules/common/hooks";
import { useQuery } from "@tanstack/react-query";
import * as Graphql from "../graphql";
import { FindPartnersResponse } from "../types";

interface FindPartnersVariables {
  take: number;
  skip: number;
  filter?: {
    search?: string;
    isActive?: boolean;
  };
  orderBy?: {
    field?: string;
    direction?: string;
  };
}

export const useFindPartners = (variables: FindPartnersVariables) => {
  const { request } = useBackend();

  return useQuery({
    queryKey: ["findPartners", variables],
    queryFn: async () => {
      const response = await request<{
        findPartners: FindPartnersResponse;
      }>(Graphql.QueryFindPartners, variables);

      return response.findPartners;
    },
    placeholderData: (previousData) => previousData,
  });
};
