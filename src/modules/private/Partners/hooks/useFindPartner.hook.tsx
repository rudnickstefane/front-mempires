import { useBackend } from "@sr/modules/common/hooks";
import { useQuery } from "@tanstack/react-query";
import * as Graphql from "../graphql";
import { FindPartnerResponse } from "../types";

export const useFindPartner = (partnerCode: string) => {
  const { request } = useBackend();

  return useQuery({
    queryKey: ["findPartner", partnerCode],
    queryFn: async () => {
      const response = await request<{
        findPartner: FindPartnerResponse;
      }>(Graphql.QueryFindPartner, { partnerCode });

      return response.findPartner;
    },
    placeholderData: (previousData) => previousData,
  });
};
