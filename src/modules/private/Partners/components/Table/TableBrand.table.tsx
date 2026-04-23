/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { Show } from "@sr/common/components/Show";
import { ReactTable, ReactTableFilters } from "@sr/common/components/Table";
import { useReactTableFilter } from "@sr/common/hooks";
import { Select } from "@sr/common/iu/components/Select";
import { ReactTableFilterConfig, ReactTableProps } from "@sr/common/types";
import { useMemo } from "react";

export type PartnerFilters = {
  search?: string;
};

export function TableBrand<T, TQuery = any>({
  filters,
  onFilterChange,
  ...props
}: ReactTableProps<T, TQuery> & {
  filters?: ReactTableFilterConfig[];
  onFilterChange?: (filters: PartnerFilters) => void;
}) {
  const initialValues = useMemo(
    () => ({
      search: "",
    }),
    [],
  );

  const formData = useReactTableFilter({
    initialValues,
    onChange: (values) => {
      onFilterChange?.(values);
    },
  });

  const sortOptions = [
    { label: "Nome (A a Z)", value: "name:asc" },
    { label: "Nome (Z a A)", value: "name:desc" },
    { label: "CNPJ (Menor para maior)", value: "company_code:asc" },
    { label: "CNPJ (Maior para menor)", value: "company_code:desc" },
    { label: "Qtd. de Lojas (Crescente)", value: "storeCount:asc" },
    { label: "Qtd. de Lojas (Decrescente)", value: "storeCount:desc" },
  ];

  return (
    <>
      <Box className="flex flex-row gap-6 p-6">
        <Show hidden={!filters || filters.length === 0}>
          <ReactTableFilters filters={filters ?? []} formData={formData} />
        </Show>

        <Select
          placeholder="Ordenação padrão"
          value={
            props.sort?.field
              ? `${props.sort.field}:${props.sort.direction}`
              : ""
          }
          options={sortOptions}
          className="text-sm min-w-[260px] "
          onChange={(val) => {
            const [field, direction] = val.split(":");
            props.onSortChange?.(field ? { field, direction } : {});
          }}
        />
      </Box>

      <ReactTable {...props} />
    </>
  );
}
