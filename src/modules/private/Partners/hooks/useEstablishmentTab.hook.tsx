/* eslint-disable @typescript-eslint/no-explicit-any */
import { dialogConfirmConfig } from "@sr/common/configs";
import { isAbortError } from "@sr/common/constants";
import {
  useConfirmDialog,
  useDrawerStore,
  usePaginationHook,
} from "@sr/common/hooks";
import { notify } from "@sr/common/iu/components/notifications";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useCallback, useMemo, useState } from "react";
import * as Hook from ".";
import { columnsEstablishments } from "../constants";
import { EstablishmentDrawerContent } from "../drawers";
import { DrawerFormBrandProps } from "../types";

export const useEstablishmentTabHook = (params: any) => {
  const { partnerCode, isEnabled } = params;

  const [filters, setFilters] = useState({ search: "" });
  const [sort, setSort] = useState<{
    field?: string;
    direction?: "asc" | "desc";
  }>({});
  const { page, limit, setPage, setLimit } = usePaginationHook(10);

  const skip = (page - 1) * limit;

  const open = useDrawerStore((s) => s.openDrawer);
  const confirm = useConfirmDialog();
  const { mutateAsync: upsertEstablishment } = Hook.useUpsertEstablishment();

  const establishmentsQuery = Hook.useFindEstablishments(
    {
      partnerCode,
      take: limit,
      skip: skip,
      filter: {
        search: filters.search || undefined,
      },
      orderBy: sort.field
        ? {
            field: sort.field,
            direction: sort.direction,
          }
        : undefined,
    },
    isEnabled,
  );

  const handleFilterChange = useCallback(
    (newFilters: any) => {
      setFilters(newFilters);
      setPage(1);
    },
    [setPage],
  );

  const { data: establishmentsData } = establishmentsQuery;

  const rows = useMemo(() => {
    return (
      establishmentsData?.edges?.map(({ node }) => ({
        ...node,
        brandCode: node.brandCode,
        partnerCode: node.partnerCode,
        establishmentsCount: node.establishmentsCount,
        fantasyName: node.company?.fantasyName || "N/A",
        code: node.company?.code || "",
        brand: node.brand || "",
        isActive: node.details?.status === "ACTIVE",
      })) || []
    );
  }, [establishmentsData]);

  const openDrawer = useCallback(
    (data?: DrawerFormBrandProps) => {
      open({
        title: data ? "Alterar Loja" : "Adicionar Loja",
        steps: ["Dados da loja", "Contato"],
        component: EstablishmentDrawerContent,
        componentProps: { initialData: data },
      });
    },
    [open],
  );

  const handleToggle = useCallback(
    async (
      brandCode: string,
      partnerCode: string,
      name: string,
      isActive: boolean,
    ) => {
      const nextStatus = isActive ? "INACTIVE" : "ACTIVE";

      await confirm({
        title: `Deseja ${
          nextStatus === "ACTIVE" ? "ativar" : "desativar"
        } a loja ${name}?`,
        subtitle:
          nextStatus === "INACTIVE"
            ? "Esta ação impedirá a realização de vendas e suspenderá as integrações imediatamente."
            : undefined,
        buttonText: nextStatus === "ACTIVE" ? "Ativar" : "Desativar",
        ...dialogConfirmConfig[nextStatus],

        onConfirm: async (signal) => {
          try {
            await upsertEstablishment({
              payload: {
                data: {
                  origin: "PORTAL",
                  operation: "UPDATE",
                  brandCode,
                  partnerCode,
                  details: { status: nextStatus },
                },
              },
              signal,
            });

            notify.success(
              `Loja ${
                nextStatus === "ACTIVE" ? "ativada" : "desativada"
              } com sucesso.`,
            );
          } catch (error: any) {
            if (isAbortError(error)) return;

            const msg = GetErrorMessage(
              error,
              "Algo deu errado ao excluir loja. Tente novamente!",
            );

            notify.error(msg);
          }
        },
      });
    },
    [confirm, upsertEstablishment],
  );

  const handleDelete = useCallback(
    async (brandCode: string, name: string) => {
      await confirm({
        title: `Deseja excluir a loja ${name}?`,
        subtitle:
          "Esta ação é irreversível. Todos os dados vinculados a esta loja serão removidos permanentemente.",
        buttonText: "Excluir",
        ...dialogConfirmConfig.DELETE,

        onConfirm: async (signal) => {
          try {
            await upsertEstablishment({
              payload: {
                data: {
                  origin: "PORTAL",
                  operation: "DELETE",
                  brandCode,
                },
              },
              signal,
            });

            notify.success("Loja excluída com sucesso.");
          } catch (error: any) {
            if (isAbortError(error)) return;

            const msg = GetErrorMessage(
              error,
              "Algo deu errado ao excluir loja. Tente novamente!",
            );

            notify.error(msg);
          }
        },
      });
    },
    [confirm, upsertEstablishment],
  );

  const columns = useMemo(() => {
    return columnsEstablishments(handleToggle, openDrawer, handleDelete);
  }, [handleToggle, openDrawer, handleDelete]);

  return {
    openDrawer,
    establishmentsQuery,
    columns,
    rows,
    pagination: {
      page,
      limit,
      total: establishmentsData?.totalCount || 0,
    },
    setPage,
    setLimit,
    filters,
    handleFilterChange,
    sort,
    setSort,
    handleToggle,
  };
};
