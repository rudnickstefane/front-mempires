import { useMutation } from '@tanstack/react-query';

import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { MutationNewStudent } from '../graphql';

export function useCreateNewLogin() {
  const { request } = useBackendForFrontend();

  return useMutation(async (variables: any) => {
    const { CreateStudent } = await request(MutationNewStudent, variables);

    return CreateStudent;
  });
}
