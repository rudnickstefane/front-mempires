/* eslint-disable @typescript-eslint/no-explicit-any */
import { notify } from "@sr/common/iu/components/notifications";
import { useBackend } from "@sr/modules/common/hooks";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { resetAllStores } from "@sr/store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Graphql from "../graphql";

export const useUpdatePassword = () => {
  const navigate = useNavigate();
  const { request } = useBackend();
  const [attemptCount, setAttemptCount] = useState(0);

  return useMutation({
    mutationFn: async (payload: any) => {
      return await request(Graphql.MutationUpdatePassword, payload);
    },
    onSuccess: () => {
      setAttemptCount(0);
      resetAllStores();

      notify.success(
        "Sua senha foi alterada com sucesso! Por favor, faça login novamente.",
      );

      navigate("/login");
    },
    onError: (error: unknown) => {
      setAttemptCount((prev) => prev + 1);

      const msg =
        attemptCount >= 5
          ? "Erro ao alterar senha. Entre em contato com nosso suporte."
          : GetErrorMessage(
              error,
              "Ops! Não foi possível alterar sua senha. Tente novamente!",
            );

      notify.error(msg);
    },
  });
};
