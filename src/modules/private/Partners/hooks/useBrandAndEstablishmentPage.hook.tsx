/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePaginationHook } from "@sr/common/hooks";
import { useCallback, useState } from "react";
import { BrandAndEstablishmentViewType } from "../types";

export const useBrandAndEstablishmentPageHook = () => {
  const [currentView, setCurrentView] =
    useState<BrandAndEstablishmentViewType>("BRANDS");

  const [filters, setFilters] = useState({ search: "" });

  const [sort, setSort] = useState<{
    field?: string;
    direction?: "asc" | "desc";
  }>({});

  const { page, limit, setPage, setLimit } = usePaginationHook(10);

  const handleFilterChange = useCallback(
    (newFilters: { search?: string }) => {
      setFilters((prev) => {
        if (prev.search === newFilters.search) return prev;
        setPage(1);
        return { search: newFilters.search ?? "" };
      });
    },
    [setPage],
  );

  const handleTabChange = (view: BrandAndEstablishmentViewType) => {
    setCurrentView(view);
    setPage(1);
  };

  return {
    currentView,
    setCurrentView: handleTabChange,
    filters,
    sort,
    setSort,
    page,
    pagination: {
      page,
      limit,
    },
    limit,
    setPage,
    setLimit,
    handleFilterChange,
  };
};
