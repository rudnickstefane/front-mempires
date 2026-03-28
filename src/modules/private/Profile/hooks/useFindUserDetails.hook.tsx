import { storage } from "@sr/common/storage";
import { useBackend } from "@sr/modules/common/hooks";
import { FindUserDetailsResponse } from "@sr/modules/common/types";
import { useQuery } from "@tanstack/react-query";
import * as Graphql from "../graphql";

export const useFindUserDetails = () => {
  const { request } = useBackend();
  const profileCode = storage.get<string>("profileCode");

  return useQuery({
    queryKey: ["findUserDetails", profileCode],
    queryFn: async () => {
      const response = await request<{
        findUserDetails: FindUserDetailsResponse;
      }>(Graphql.QueryFindUserDetails, {
        profileCode,
      });
      return response.findUserDetails;
    },
    enabled: !!profileCode,
  });
};
