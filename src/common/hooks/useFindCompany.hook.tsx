import { useBackend } from "@sr/modules/common/hooks";
import { FindCompanyResponse } from "@sr/modules/common/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Graphql from "../graphql";

interface FindCompanyVariables {
  code: string;
  memberType?: string;
}

export const useFindCompany = (variables: FindCompanyVariables) => {
  const { request } = useBackend();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["findCompany", variables],
    queryFn: async () => {
      const response = await request<{
        findCompany: FindCompanyResponse;
      }>(Graphql.QueryFindCompany, variables);

      queryClient.removeQueries({ queryKey: ["findCompany", variables.code] });
      return response.findCompany;
    },
    enabled: false,
    retry: false,
  });
};
