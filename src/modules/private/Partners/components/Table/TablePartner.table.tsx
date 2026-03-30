/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@sr/common/components/Card";
import { Show } from "@sr/common/components/Show";
import { ReactTable, ReactTableFilters } from "@sr/common/components/Table";
import { useReactTableFilter } from "@sr/common/hooks";
import { ReactTableFilterConfig, ReactTableProps } from "@sr/common/types";
import { useMemo } from "react";

type PartnerFilters = {
  search?: string;
  isActive?: boolean;
};

export function TablePartner<T, TQuery = any>({
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
      isActive: false,
    }),
    [],
  );

  const formData = useReactTableFilter({
    initialValues,
    onChange: (values) => {
      onFilterChange?.(values);
    },
  });

  return (
    <Card loading={props.isLoading} skeletonCount={3} padding="p-0">
      <Show hidden={!filters || filters.length === 0}>
        <ReactTableFilters filters={filters ?? []} formData={formData} />
      </Show>

      <ReactTable {...props} />
    </Card>
  );
}
