import { useBackend } from "@sr/modules/common/hooks";
import { useQuery } from "@tanstack/react-query";
import * as Graphql from "../graphql";

export interface PartnerMetrics {
  totalGeneral: number;
  totalCurrentMonth: number;
  totalActive: number;
  totalInactive: number;
  growthPercentage: number;
}

export const useFindPartnerMetrics = () => {
  const { request } = useBackend();

  return useQuery({
    queryKey: ["findPartnerMetrics"],
    queryFn: async () => {
      const response = await request<{
        findPartnerMetrics: PartnerMetrics;
      }>(Graphql.QueryFindPartnerMetrics);

      return response.findPartnerMetrics;
    },
    placeholderData: (previousData) => previousData,
  });
};
