/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBackend } from "@sr/modules/common/hooks";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as Graphql from "../graphql";

const MAX_ATTEMPTS = 5;

export const useUpsertEstablishment = () => {
  const { request } = useBackend();
  const queryClient = useQueryClient();
  const [attemptCount, setAttemptCount] = useState(0);

  return useMutation({
    mutationFn: async ({
      payload,
      signal,
    }: {
      payload: any;
      signal?: AbortSignal;
    }) => {
      return await request(Graphql.MutationUpsertBrand, payload, signal);
    },
    onSuccess: () => {
      setAttemptCount(0);

      queryClient.invalidateQueries({ queryKey: ["findBrands"] });
      queryClient.invalidateQueries({ queryKey: ["findBrand"] });
    },
    onError: (error: unknown) => {
      setAttemptCount((prev) => prev + 1);
      const msg =
        attemptCount >= MAX_ATTEMPTS
          ? `Erro ao processar solicitação. Entre em contato com nosso suporte.`
          : GetErrorMessage(
              error,
              `Ops! Algo deu errado ao processar solicitação. Tente novamente!`,
            );

      throw new Error(msg);
    },
  });
};
