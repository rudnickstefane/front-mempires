import { useBackend } from "@sr/modules/common/hooks";
import { FindClientsVariables } from "@sr/modules/private/Partners/types/FindBrandsVariables.type";
import { useQuery } from "@tanstack/react-query";
import * as Graphql from "../graphql";
import { FindClientsResponse } from "../types";

export const useFindClients = (
  variables: FindClientsVariables,
  enabled: boolean,
) => {
  const { request } = useBackend();

  return useQuery({
    queryKey: ["findClients", variables],
    queryFn: async () => {
      const response = await request<{
        findClients: FindClientsResponse;
      }>(Graphql.QueryFindClients, variables);

      return response.findClients;
    },
    enabled,
    placeholderData: (previousData) => previousData,
  });
};
