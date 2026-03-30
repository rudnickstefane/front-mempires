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
import { columnsPartners } from "../constants/columnsPartners.const";
import { PartnerDrawerContent } from "../drawers";

export const usePartnerPageHook = () => {
  const confirm = useConfirmDialog();

  const [filters, setFilters] = useState({
    search: "",
    isActive: false,
  });

  const { page, limit, setPage, setLimit } = usePaginationHook(10);
  const skip = (page - 1) * limit;

  const open = useDrawerStore((s) => s.openDrawer);
  const { mutateAsync: upsertPartner } = Hook.useUpsertPartner();

  const metricsQuery = Hook.useFindPartnerMetrics();
  const partnersQuery = Hook.useFindPartners({
    take: limit,
    skip: skip,
    filter: {
      search: filters.search || undefined,
      isActive: filters.isActive || undefined,
    },
  });

  const { data: partnersData, isPending } = partnersQuery;

  const rows = useMemo(() => {
    return (
      partnersData?.edges?.map(({ node }) => ({
        ...node,
        partnerCode: node.partnerCode,
        fantasyName: node.company?.fantasyName || "N/A",
        cnpj: node.company?.code || "",
        storesCount: node.storeCount || 0,
        isActive: node.details?.status === "ACTIVE",
      })) || []
    );
  }, [partnersData]);

  const onEdit = useCallback(
    (data?: any) => {
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

            notify.success("Parceiro excluído com sucesso.");
          } catch (error: any) {
            if (isAbortError(error)) return;

            const msg = GetErrorMessage(
              error,
              "Algo deu errado ao excluir parceiro. Tente novamente!",
            );

            notify.error(msg);
          }
        },
      });
    },
    [confirm, upsertPartner],
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
              "Algo deu errado ao excluir parceiro. Tente novamente!",
            );

            notify.error(msg);
          }
        },
      });
    },
    [confirm, upsertPartner],
  );

  const columns = useMemo(() => {
    return columnsPartners(handleToggle, onEdit, handleDelete);
  }, [handleToggle, onEdit, handleDelete]);

  const handleFilterChange = useCallback(
    (newFilters: { search?: string; isActive?: boolean }) => {
      const nextFilters = {
        search: newFilters.search ?? "",
        isActive: newFilters.isActive ?? false,
      };

      setFilters((prev) => {
        // Se os filtros forem idênticos aos anteriores, não faz nada (evita o loop na paginação)
        if (
          prev.search === nextFilters.search &&
          prev.isActive === nextFilters.isActive
        ) {
          return prev;
        }

        // Se mudou algo no filtro, aí sim resetamos para a página 1
        setPage(1);
        return nextFilters;
      });
    },
    [setPage],
  );

  return {
    isPending,
    partnersQuery,
    columns,
    rows,
    metrics: metricsQuery.data,
    pagination: {
      page,
      limit,
      total: partnersData?.totalCount || 0,
    },
    setPage,
    setLimit,
    handleFilterChange,
  };
};
