/* eslint-disable @typescript-eslint/no-explicit-any */
import { notify } from "@sr/common/iu/components/notifications";
import { useBackend } from "@sr/modules/common/hooks";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as Graphql from "../graphql";

const MAX_ATTEMPTS = 5;

export const useUpsertPartner = () => {
  const { request } = useBackend();
  const queryClient = useQueryClient();
  const [attemptCount, setAttemptCount] = useState(0);

  return useMutation({
    mutationFn: async (payload: any) => {
      return await request(Graphql.MutationUpsertPartner, payload);
    },
    onSuccess: (_data, variables) => {
      setAttemptCount(0);
      const isCreate = variables.data.operation === "CREATE";

      queryClient.invalidateQueries({ queryKey: ["findPartners"] });
      queryClient.invalidateQueries({ queryKey: ["findPartnerMetrics"] });

      notify.success(
        isCreate
          ? "Parceiro cadastrado com sucesso!"
          : `Parceiro ${variables.data.details.status === "ACTIVE" ? "ativado" : "desativado"} com sucesso!`,
      );
    },
    onError: (error: unknown, variables) => {
      setAttemptCount((prev) => prev + 1);
      const isCreate = variables.data.operation === "CREATE";
      const actionText = isCreate ? "cadastrar parceiro" : "alterar status";

      const msg =
        attemptCount >= MAX_ATTEMPTS
          ? `Erro ao ${actionText}. Entre em contato com nosso suporte.`
          : GetErrorMessage(
              error,
              `Ops! Algo deu errado ao ${actionText}. Tente novamente!`,
            );

      notify.error(msg);
    },
  });
};
