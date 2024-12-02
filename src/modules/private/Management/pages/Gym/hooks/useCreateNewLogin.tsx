import { useMutation } from '@tanstack/react-query';
import { useBackendForFrontend } from '../../../../../common/hooks/backend-for-frontend/useBackendForFrontend';
import { MutationNewStudent } from '../graphql';

export function useCreateNewLogin() {
  const { request } = useBackendForFrontend();

  return useMutation(async (variables: any) => {
    const { CreateStudent } = await request(MutationNewStudent, variables);

    return CreateStudent;
  });
}
