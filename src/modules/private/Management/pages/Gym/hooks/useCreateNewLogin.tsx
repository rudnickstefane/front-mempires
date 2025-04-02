/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';

import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { MutationNewStudent } from '../graphql';

export function useCreateNewLogin() {
  const { request } = useBackendForFrontend();

  return useMutation({
    mutationFn: async (variables: object) => {
      const { CreateStudent } = await request<{ CreateStudent: any }>(MutationNewStudent, variables);

      return CreateStudent;
    },
  });
}
