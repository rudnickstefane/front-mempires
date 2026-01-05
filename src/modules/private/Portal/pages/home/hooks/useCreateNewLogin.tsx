/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";

import { useBackend } from "@sr/modules/common/hooks";
import { MutationNewStudent } from "../graphql";

export function useCreateNewLogin() {
  const { request } = useBackend();

  return useMutation({
    mutationFn: async (variables: object) => {
      const { CreateStudent } = await request<{ CreateStudent: any }>(
        MutationNewStudent,
        variables
      );

      return CreateStudent;
    },
  });
}
