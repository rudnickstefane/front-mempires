/* eslint-disable @typescript-eslint/no-explicit-any */
import { dialogConfirmConfig } from "@sr/common/configs";
import { useDrawerStore, usePaginationHook } from "@sr/common/hooks";
import { notify } from "@sr/common/iu/components/notifications";
import { DialogConfirmType } from "@sr/common/types";
import { ConfirmDialogProps } from "@sr/common/types/ConfirmDialogProps.type";
import { useCallback, useMemo, useState } from "react";
import * as Hook from ".";
import { columnsPartners } from "../constants/columnsPartners.const";
import { PartnerDrawerContent } from "../drawers";

export const usePartnerPageHook = () => {
  const { page, limit, setPage, setLimit } = usePaginationHook(10);
  const skip = (page - 1) * limit;

  const open = useDrawerStore((s) => s.openDrawer);
  const { mutateAsync: upsertPartner } = Hook.useUpsertPartner();

  const metricsQuery = Hook.useFindPartnerMetrics();
  const {
    data: partnersData,
    isPending,
    refetch,
  } = Hook.useFindPartners({
    take: limit,
    skip: skip,
  });

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

  const openPartnerDrawer = useCallback(
    (data?: any) => {
      open({
        title: "Alterar Parceiro",
        steps: ["Dados do parceiro", "Contato"],
        component: PartnerDrawerContent,
        componentProps: {
          initialData: data,
          onSuccess: () => refetch(),
        },
      });
    },
    [open, refetch],
  );

  const [confirmData, setConfirmData] = useState<{
    isOpen: boolean;
    type: DialogConfirmType;
    title: string;
    subtitle?: string;
    buttonText: string;
    partnerCode?: string;
  }>({
    isOpen: false,
    type: "ACTIVE",
    title: "",
    buttonText: "",
  });

  const openConfirmDelete = useCallback((partnerCode: string, name: string) => {
    setConfirmData({
      isOpen: true,
      partnerCode,
      type: "DELETE",
      title: `Deseja excluir o parceiro ${name}?`,
      subtitle:
        "Esta ação é irreversível. Todos os dados vinculados a este parceiro serão removidos permanentemente.",
      buttonText: "Excluir",
    });
  }, []);

  const openConfirmToggle = useCallback(
    (partnerCode: string, name: string, isActive: boolean) => {
      const nextStatus = isActive ? "INACTIVE" : "ACTIVE";

      setConfirmData({
        isOpen: true,
        partnerCode,
        type: nextStatus,
        title: `Deseja ${nextStatus === "ACTIVE" ? "ativar" : "desativar"} o parceiro ${name}?`,
        subtitle:
          nextStatus === "INACTIVE"
            ? "Esta ação impedirá o acesso do parceiro ao portal e suspenderá todas as funcionalidades e integrações ativas."
            : undefined,
        buttonText: nextStatus === "ACTIVE" ? "Ativar" : "Desativar",
      });
    },
    [],
  );

  const columns = useMemo(() => {
    return columnsPartners(
      openConfirmToggle,
      openPartnerDrawer,
      openConfirmDelete,
    );
  }, [openConfirmToggle, openPartnerDrawer, openConfirmDelete]);

  const handleConfirmAction = async () => {
    const { partnerCode, type } = confirmData;
    if (!partnerCode || !type) return;

    try {
      if (type === "DELETE") {
        // Chame seu hook de delete aqui (ex: deletePartner({ partnerCode }))
        console.log("Deletando parceiro:", partnerCode);
        notify.success("Parceiro excluído com sucesso.");
      } else {
        await upsertPartner({
          data: {
            origin: "PORTAL",
            operation: "UPDATE",
            partnerCode: partnerCode,
            details: { status: type },
          },
        });
      }
      setConfirmData((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      notify.error("Erro ao processar solicitação.");
    }
  };

  const config = dialogConfirmConfig[confirmData.type];

  const confirmProps: ConfirmDialogProps = {
    isOpen: confirmData.isOpen,
    title: confirmData.title,
    subtitle: confirmData.subtitle,
    buttonText: confirmData.buttonText,
    buttonColor: config.buttonColor,
    icon: config.icon,
    iconBgColor: config.iconBgColor,
    iconColor: config.iconColor,
    alertVariant: config.alertVariant,
    closeModal: () => setConfirmData((prev) => ({ ...prev, isOpen: false })),
    confirmDialog: handleConfirmAction,
  };

  return {
    isPending,
    partnersData,
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
    confirmProps,
  };
};
