import { useBackend } from "@sr/modules/common/hooks";
import { useQuery } from "@tanstack/react-query";
import * as Graphql from "../graphql";
import { FindBrandsResponse, FindBrandsVariables } from "../types";

export const useFindBrands = (
  variables: FindBrandsVariables,
  enabled: boolean = true,
) => {
  const { request } = useBackend();

  return useQuery({
    queryKey: ["findBrands", variables],
    queryFn: async () => {
      const response = await request<{
        findBrands: FindBrandsResponse;
      }>(Graphql.QueryFindBrands, variables);

      return response.findBrands;
    },
    enabled,
    placeholderData: (previousData) => previousData,
  });
};
