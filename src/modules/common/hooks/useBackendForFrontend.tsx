import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.VITE_APP_BFF_FUNCIONAL_ACESSO_URL;

export function useBackendForFrontend(accessToken?: string | null) {
  const token = localStorage.getItem('@iflexfit:token') || accessToken;
  const headers = new Headers({ authorization: `Bearer ${token ?? accessToken}` });

  const graphqlClient = new GraphQLClient(
    endpoint, {
      headers,
    },
  );

  return {
    graphqlClient,
    request: graphqlClient.request.bind(graphqlClient),
  };
}
