/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetErrorMessage } from "@sr/modules/common/utils";
import { columnsClients } from "@sr/modules/private/Clients/constants";
import { PartnerDrawerContent } from "@sr/modules/private/Partners/drawers";
import {
  useFindPartnerMetrics,
  useUpsertPartner,
} from "@sr/modules/private/Partners/hooks";
import { DrawerFormPartnerProps } from "@sr/modules/private/Partners/types";
import { useNavigationStore } from "@sr/store";
import { useCallback, useMemo, useState } from "react";
import * as Hook from ".";
import { dialogConfirmConfig } from "../configs";
import { isAbortError } from "../constants";
import { notify } from "../iu/components/notifications";
import { useConfirmDialog } from "./useConfirmDialog.hook";
import { useDrawerStore } from "./useDrawerStore.hook";
import { usePaginationHook } from "./usePagination.hook";

export const useClientHook = (manual = false) => {
  const { params } = useNavigationStore();
  const confirm = useConfirmDialog();

  const [filters, setFilters] = useState({ search: "" });
  const [sort, setSort] = useState<{
    field?: string;
    direction?: "asc" | "desc";
  }>({});

  const { page, limit, setPage, setLimit } = usePaginationHook(10);
  const skip = (page - 1) * limit;

  const open = useDrawerStore((s) => s.openDrawer);
  const { mutateAsync: upsertPartner } = useUpsertPartner();

  const metricsQuery = useFindPartnerMetrics();
  const clientsQuery = Hook.useFindClients(
    {
      partnerCode: params?.partnerCode,
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
    manual ? !!filters.search && filters.search.length > 0 : true,
  );

  const { data: clientsData, isPending } = clientsQuery;

  const rows = useMemo(() => {
    return (
      clientsData?.edges?.map(({ node }) => ({
        ...node,
        partnerCode: node.partnerCode,
        fantasyName: node.company?.fantasyName || "N/A",
        name: node.name || "N/A",
        code: node.company?.code || "",
        isActive: node.details?.status === "ACTIVE",
      })) || []
    );
  }, [clientsData]);

  const openDrawer = useCallback(
    (data?: DrawerFormPartnerProps) => {
      open({
        title: "Alterar Parceiro",
        steps: ["Dados do parceiro", "Contato"],
        component: PartnerDrawerContent,
        componentProps: {
          initialData: data,
        },
      });
    },
    [open],
  );

  const handleToggle = useCallback(
    async (partnerCode: string, name: string, isActive: boolean) => {
      const nextStatus = isActive ? "INACTIVE" : "ACTIVE";

      await confirm({
        title: `Deseja ${
          nextStatus === "ACTIVE" ? "ativar" : "desativar"
        } o parceiro ${name}?`,
        subtitle:
          nextStatus === "INACTIVE"
            ? "Esta ação impedirá o acesso do parceiro ao portal e suspenderá todas as funcionalidades e integrações ativas."
            : undefined,
        buttonText: nextStatus === "ACTIVE" ? "Ativar" : "Desativar",
        ...dialogConfirmConfig[nextStatus],

        onConfirm: async (signal) => {
          try {
            await upsertPartner({
              payload: {
                data: {
                  origin: "PORTAL",
                  operation: "UPDATE",
                  partnerCode,
                  details: { status: nextStatus },
                },
              },
              signal,
            });

            notify.success(
              `Parceiro ${
                nextStatus === "ACTIVE" ? "ativado" : "desativado"
              } com sucesso.`,
            );
          } catch (error: any) {
            if (isAbortError(error)) return;

            const msg = GetErrorMessage(
              error,
              "Algo deu errado ao ativar/desativar parceiro. Tente novamente!",
            );

            notify.error(msg);
          }
        },
      });
    },
    [confirm, upsertPartner],
  );

  const handleDelete = useCallback(
    async (partnerCode: string, name: string) => {
      await confirm({
        title: `Deseja excluir o parceiro ${name}?`,
        subtitle:
          "Esta ação é irreversível. Todos os dados vinculados a este parceiro serão removidos permanentemente.",
        buttonText: "Excluir",
        ...dialogConfirmConfig.DELETE,

        onConfirm: async (signal) => {
          try {
            await upsertPartner({
              payload: {
                data: {
                  origin: "PORTAL",
                  operation: "DELETE",
                  partnerCode,
                },
              },
              signal,
            });

            notify.success("Convênio excluído com sucesso.");
          } catch (error: any) {
            if (isAbortError(error)) return;

            const msg = GetErrorMessage(
              error,
              "Algo deu errado ao excluir convênio. Tente novamente!",
            );

            notify.error(msg);
          }
        },
      });
    },
    [confirm, upsertPartner],
  );

  const columns = useMemo(() => {
    return columnsClients(handleToggle, openDrawer, handleDelete);
  }, [handleToggle, openDrawer, handleDelete]);

  const handleFilterChange = useCallback(
    (newFilters: any) => {
      setFilters(newFilters);
      setPage(1);
    },
    [setPage],
  );

  return {
    isPending,
    clientsQuery,
    columns,
    rows,
    metrics: metricsQuery.data,
    pagination: {
      page,
      limit,
      total: clientsData?.totalCount || 0,
    },
    setPage,
    setLimit,
    handleFilterChange,
    sort,
    setSort,
    handleToggle,
  };
};
