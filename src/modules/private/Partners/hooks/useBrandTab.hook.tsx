/* eslint-disable @typescript-eslint/no-explicit-any */
import { dialogConfirmConfig } from "@sr/common/configs";
import { isAbortError } from "@sr/common/constants";
import { useConfirmDialog, useDrawerStore } from "@sr/common/hooks";
import { notify } from "@sr/common/iu/components/notifications";
import { GetErrorMessage } from "@sr/modules/common/utils";
import { useCallback, useMemo } from "react";
import * as Hook from ".";
import { columnsBrands } from "../constants";
import { BrandDrawerContent } from "../drawers";
import { DrawerFormBrandProps } from "../types";

export const useBrandTabHook = (params: any) => {
  const { partnerCode, limit, page, filters, sort } = params;
  const skip = (page - 1) * limit;

  const open = useDrawerStore((s) => s.openDrawer);
  const confirm = useConfirmDialog();
  const { mutateAsync: upsertBrand } = Hook.useUpsertBrand();

  const brandsQuery = Hook.useFindBrands({
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
  });

  const { data: brandsData } = brandsQuery;

  const rows = useMemo(() => {
    return (
      brandsData?.edges?.map(({ node }) => ({
        ...node,
        brandCode: node.brandCode,
        partnerCode: node.partnerCode,
        fantasyName: node.company?.fantasyName || "N/A",
        name: node.name || "N/A",
        code: node.company?.code || "",
        storesCount: node.storeCount || 0,
        isActive: node.details?.status === "ACTIVE",
      })) || []
    );
  }, [brandsData]);

  const openDrawer = useCallback(
    (data?: DrawerFormBrandProps) => {
      open({
        title: data ? "Alterar Bandeira" : "Adicionar Bandeira",
        steps: ["Dados da bandeira", "Contato"],
        component: BrandDrawerContent,
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
        } a bandeira ${name}?`,
        subtitle:
          nextStatus === "INACTIVE"
            ? "Esta ação impedirá a realização de vendas em todas as lojas vinculadas e suspenderá as integrações imediatamente."
            : undefined,
        buttonText: nextStatus === "ACTIVE" ? "Ativar" : "Desativar",
        ...dialogConfirmConfig[nextStatus],

        onConfirm: async (signal) => {
          try {
            await upsertBrand({
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
              `Bandeira ${
                nextStatus === "ACTIVE" ? "ativada" : "desativada"
              } com sucesso.`,
            );
          } catch (error: any) {
            if (isAbortError(error)) return;

            const msg = GetErrorMessage(
              error,
              "Algo deu errado ao ativar/desativar bandeira. Tente novamente!",
            );

            notify.error(msg);
          }
        },
      });
    },
    [confirm, upsertBrand],
  );

  const handleDelete = useCallback(
    async (brandCode: string, name: string) => {
      await confirm({
        title: `Deseja excluir a bandeira ${name}?`,
        subtitle:
          "Esta ação é irreversível. Todos os dados vinculados a esta bandeira serão removidos permanentemente.",
        buttonText: "Excluir",
        ...dialogConfirmConfig.DELETE,

        onConfirm: async (signal) => {
          try {
            await upsertBrand({
              payload: {
                data: {
                  origin: "PORTAL",
                  operation: "DELETE",
                  brandCode,
                },
              },
              signal,
            });

            notify.success("Bandeira excluída com sucesso.");
          } catch (error: any) {
            if (isAbortError(error)) return;

            const msg = GetErrorMessage(
              error,
              "Algo deu errado ao excluir bandeira. Tente novamente!",
            );

            notify.error(msg);
          }
        },
      });
    },
    [confirm, upsertBrand],
  );

  const columns = useMemo(() => {
    return columnsBrands(handleToggle, openDrawer, handleDelete);
  }, [handleToggle, openDrawer, handleDelete]);

  return {
    openDrawer,
    brandsQuery,
    columns,
    rows,
    pagination: {
      page,
      limit,
      total: brandsData?.totalCount || 0,
    },
    sort,
    handleToggle,
  };
};
