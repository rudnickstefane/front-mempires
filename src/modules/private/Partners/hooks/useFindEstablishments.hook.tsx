import { useBackend } from "@sr/modules/common/hooks";
import { useQuery } from "@tanstack/react-query";
import * as Graphql from "../graphql";
import {
  FindEstablishmentsResponse,
  FindEstablishmentsVariables,
} from "../types";

export const useFindEstablishments = (
  variables: FindEstablishmentsVariables,
  enabled: boolean = true,
) => {
  const { request } = useBackend();

  return useQuery({
    queryKey: ["findEstablishments", variables],
    queryFn: async () => {
      const response = await request<{
        findEstablishments: FindEstablishmentsResponse;
      }>(Graphql.QueryFindEstablishments, variables);

      return response.findEstablishments;
    },
    enabled,
    placeholderData: (previousData) => previousData,
  });
};
