/* eslint-disable @typescript-eslint/no-explicit-any */
import { notify } from "@sr/common/iu/components/notifications";
import { useBackend } from "@sr/modules/common/hooks";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as Graphql from "../graphql";

export const useUpsertUser = () => {
  const { request } = useBackend();
  const queryClient = useQueryClient();
  const [attemptCount, setAttemptCount] = useState(0);

  return useMutation({
    mutationFn: async (payload: any) => {
      return await request(Graphql.MutationUpsertUser, payload);
    },
    onSuccess: () => {
      setAttemptCount(0);
      queryClient.invalidateQueries({ queryKey: ["findUserDetails"] });
      notify.success("Alterações realizadas com sucesso!");
    },
    onError: (error: unknown) => {
      setAttemptCount((prev) => prev + 1);

      const msg =
        attemptCount >= 5
          ? "Erro ao alterar senha. Entre em contato com nosso suporte."
          : GetErrorMessage(
              error,
              "Ops! Algo deu errado ao atualizar seus dados. Tente novamente!",
            );

      notify.error(msg);
    },
  });
};
