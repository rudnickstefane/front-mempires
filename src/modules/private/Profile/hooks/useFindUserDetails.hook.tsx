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
    // Configurações de performance:
    // refetchOnWindowFocus: false, // Não busca ao voltar para a aba
    // refetchOnMount: false,       // Não busca ao remontar o componente
    // staleTime: 1000 * 60 * 5,    // Considera o dado "fresco" por 5 minutos
    // refetchIntervalInBackground: true, // Continua atualizando mesmo se a aba estiver em segundo plano
  });
};
