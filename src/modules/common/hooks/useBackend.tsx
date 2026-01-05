import { storage } from "@sr/common/storage";
import { GraphQLClient, RequestDocument, Variables } from "graphql-request";
import { useMemo } from "react";

const endpoint = import.meta.env.VITE_APP_BFF_FUNCIONAL_ACESSO_URL;

export function useBackend(accessToken?: string | null) {
  const token = storage.get<string>("token") || accessToken;

  return useMemo(() => {
    const client = new GraphQLClient(endpoint, {
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });

    return {
      request: <T,>(
        query: RequestDocument,
        variables?: Variables
      ): Promise<T> => client.request<T>(query, variables),
    };
  }, [token]);
}
