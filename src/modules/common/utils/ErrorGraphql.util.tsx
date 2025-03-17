import { ClientError } from 'graphql-request';

export function GetErrorMessage(error: unknown, genericError: string): string {
    // Verifica se o erro é uma instância de ClientError
    if (error instanceof ClientError) {
        // Extraímos a mensagem de erro, verificando a estrutura do erro
        return error?.response?.errors?.[0]?.message || genericError;
    }
    // Caso o erro não seja ClientError, retorna uma mensagem genérica
    return genericError;
}
