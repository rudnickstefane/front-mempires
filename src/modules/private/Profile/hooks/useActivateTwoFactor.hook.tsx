/* eslint-disable @typescript-eslint/no-explicit-any */
import { notify } from "@sr/common/iu/components/notifications";
import { useBackend } from "@sr/modules/common/hooks";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Graphql from "../graphql";

export interface ActivateTwoFactorResponse {
  activateTwoFactor: string[];
}

export const useActivateTwoFactor = () => {
  const { request } = useBackend();
  const queryClient = useQueryClient();

  return useMutation<ActivateTwoFactorResponse, Error, { code: string }>({
    mutationFn: async (payload: any) => {
      return await request<ActivateTwoFactorResponse>(
        Graphql.MutationActivateTwoFactor,
        payload,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });

      notify.success("Autenticação em duas etapas ativada com sucesso!");
    },
    onError: (error: unknown) => {
      const msg = GetErrorMessage(
        error,
        "Código inválido ou expirado. Verifique seu app e tente novamente.",
      );
      notify.error(msg);
    },
  });
};
