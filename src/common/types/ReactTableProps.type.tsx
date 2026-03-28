/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseQueryResult } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

export type ReactTableProps<T, TQuery = any> = {
  // O objeto completo retornado pelo useQuery (contém isLoading, isFetching, etc)
  queryResult: UseQueryResult<TQuery>;

  // O array de dados já mapeado/formatado para a exibição
  data: T[];

  // Definição das colunas usando o columnHelper
  columns: ColumnDef<T, any>[];

  // Funções de controle de paginação (geralmente vindas do usePaginationHook)
  setPage: (page: number) => void;
  setLimitPagination: (limit: number) => void;

  // Estado atual da paginação para renderizar o footer
  pagination: {
    page: number;
    limit: number;
    total: number;
  };

  // Flags de configuração visual
  isDataWithEdges?: boolean; // Se true, indica que vem de uma estrutura Relay/GraphQL
  isLoading?: boolean; // Sobrescreve o loading manual se necessário

  // Filtros e Menus
  filterValue?: string; // O valor atual do input de busca (opcional)
  typeMenu?: boolean; // Habilita ou desabilita o menu de ações

  /**
   * Componente de menu que aparece ao clicar no botão 'More'
   * Pode ser uma função que recebe a linha atual para ações específicas (Excluir/Editar)
   */
  menuItemPopup?: (row: T) => React.ReactNode;
};
