import { useBackend } from "@sr/modules/common/hooks";
import { useQuery } from "@tanstack/react-query";
import * as Graphql from "../graphql";
import {
  FindEstablishmentsResponse,
  FindEstablishmentsVariables,
} from "../types";

export const useFindEstablishments = (
  variables: FindEstablishmentsVariables,
) => {
  const { request } = useBackend();

  return useQuery({
    queryKey: ["findEstablishments", variables],
    queryFn: async () => {
      const response = await request<{
        findEstablishments: FindEstablishmentsResponse;
      }>(Graphql.QueryFindBrands, variables);

      return response.findEstablishments;
    },
    placeholderData: (previousData) => previousData,
  });
};
