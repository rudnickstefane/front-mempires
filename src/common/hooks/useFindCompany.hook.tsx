import { useBackend } from "@sr/modules/common/hooks";
import { FindCompanyResponse } from "@sr/modules/common/types";
import { useMutation } from "@tanstack/react-query";
import * as Graphql from "../graphql";

interface FindCompanyVariables {
  code: string;
  memberType?: string;
}

export const useFindCompany = () => {
  const { request } = useBackend();

  return useMutation({
    mutationFn: async (variables: FindCompanyVariables) => {
      const response = await request<{
        findCompany: FindCompanyResponse;
      }>(Graphql.QueryFindCompany, variables);

      return response.findCompany;
    },
  });
};
