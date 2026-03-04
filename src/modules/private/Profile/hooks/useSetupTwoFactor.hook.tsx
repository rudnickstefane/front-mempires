/* eslint-disable @typescript-eslint/no-explicit-any */
import { notify } from "@sr/common/iu/components/notifications";
import { useBackend } from "@sr/modules/common/hooks";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useMutation } from "@tanstack/react-query";
import * as Graphql from "../graphql";

interface SetupTwoFactorResponse {
  setupTwoFactor: {
    secret: string;
    qrCode: string;
  };
}

export const useSetupTwoFactor = () => {
  const { request } = useBackend();

  return useMutation({
    mutationFn: async () => {
      const response = await request<SetupTwoFactorResponse>(
        Graphql.MutationSetupTwoFactor,
      );
      return response?.setupTwoFactor;
    },
    onError: (error: unknown) => {
      const msg = GetErrorMessage(
        error,
        "Não foi possível gerar o código de segurança. Tente novamente!",
      );
      notify.error(msg);
    },
  });
};
