import { ClientError } from "graphql-request";

export function GetErrorMessage(error: unknown, genericError: string): string {
  // 1. Caso o erro venha do GraphQL (graphql-request)
  if (error instanceof ClientError) {
    return error.response?.errors?.[0]?.message || genericError;
  }

  // 2. Caso o erro seja uma instância de Error do JS (throw new Error(msg))
  if (error instanceof Error) {
    return error.message || genericError;
  }

  // 3. Caso o erro seja uma string direta
  if (typeof error === "string") {
    return error;
  }

  // Fallback para qualquer outro caso desconhecido
  return genericError;
}
