import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.VITE_APP_BFF_FUNCIONAL_ACESSO_URL;

export function useBackendForFrontend(endpointOptions: string = endpoint, accessToken?: string | null) {
  const token = localStorage.getItem('@portal-unico:token');
  const headers = new Headers({ authorization: `Bearer ${token ?? accessToken}` });

  const graphqlClient = new GraphQLClient(
    endpointOptions, {
      headers,
    },
  );

  return {
    graphqlClient,
    request: graphqlClient.request.bind(graphqlClient),
  };
}
