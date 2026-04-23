/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AddressWidget,
  CompanyWidget,
  ContactsWidget,
} from "@sr/common/components/Widgets";
import { useDrawerStore } from "@sr/common/hooks";
import { useNavigationStore } from "@sr/store";
import { formatText } from "@sr/utils";
import {
  Box1,
  Building,
  Building4,
  Buildings,
  Buildings2,
  Call,
  DiscountShape,
  Location,
  Setting2,
  Shop,
  UserSquare,
} from "iconsax-react";
import * as Hook from ".";
import { RendererModulesType } from "../../Portal/pages/home/types/gym-management.types";
import { PartnerWidget } from "../components/Widgets";
import { PartnerDrawerContent } from "../drawers";

export const usePartnerDetailsPageHook = () => {
  const open = useDrawerStore((s) => s.openDrawer);
  const { params, push } = useNavigationStore();

  const { handleToggle } = Hook.usePartnerPageHook();
  const { data: partnerData, isPending } = Hook.useFindPartner(
    params?.partnerCode,
  );

  const openDrawer = (step = 0) => {
    open({
      title: "Alterar Parceiro",
      steps: ["Dados do parceiro", "Contato"],
      activeStep: step,
      component: PartnerDrawerContent,
      componentProps: { initialData: partnerData },
    });
  };

  const onStatusToggle = async () => {
    if (!partnerData) return;
    await handleToggle(
      partnerData.partnerCode!,
      partnerData.company.fantasyName || partnerData.company.businessName,
      partnerData.details.status === "ACTIVE",
    );
  };

  const quickActions = [
    [
      {
        title: "Configurações",
        description: "Ajustes do parceiro",
        gradient: true,
        icon: <Setting2 variant="Bulk" size={24} />,
        iconClass: "bg-white/20 text-white",
        skeletonCount: 3,
        module: "PartnerConfigs",
      },
      {
        title: "Bandeiras e Lojas",
        description: "Gestão de PDVs",
        icon: <Shop variant="Bulk" size={24} />,
        iconClass: "!bg-blue-50 text-blue-600",
        skeletonCount: 3,
        module: "BrandAndEstablishment",
      },
      {
        title: "Contatos",
        description: "Lista de contatos",
        icon: <UserSquare variant="Bulk" size={24} />,
        iconClass: "!bg-slate-100 text-slate-600",
        skeletonCount: 3,
        module: "PartnerContacts",
      },
      {
        title: "Produtos",
        description: "Itens vinculados",
        icon: <Box1 variant="Bulk" size={24} />,
        iconClass: "!bg-indigo-50 text-indigo-600",
        skeletonCount: 3,
        module: "PartnerProducts",
      },
      {
        title: "Regras de descontos",
        description: "Taxas e valores",
        icon: <DiscountShape variant="Bulk" size={24} />,
        iconClass: "!bg-emerald-50 text-emerald-600",
        skeletonCount: 3,
        module: "PartnerRules",
      },
    ],
  ];

  const statsConfig = [
    {
      title: "Bandeiras",
      value: 1,
      icon: Building,
      colorClass: "text-slate-500",
      bgClass: "bg-slate-100",
    },
    {
      title: "Lojas",
      value: partnerData?.storeCount || 0,
      icon: Shop,
      colorClass: "text-slate-500",
      bgClass: "bg-slate-100",
    },
    {
      title: "Produtos",
      value: 0,
      icon: Box1,
      colorClass: "text-slate-500",
      bgClass: "bg-slate-100",
    },
    {
      title: "Convênios ativos",
      value: 1,
      icon: Buildings2,
      colorClass: "text-green-600",
      bgClass: "bg-green-50",
    },
  ];

  const sectionGroups = [
    [
      {
        title: "company.details",
        icon: <Building4 variant="Bulk" size={24} />,
        skeletonCount: 4,
        Component: <CompanyWidget {...partnerData!} />,
      },
    ],
    [
      {
        title: "partner.details",
        icon: <Buildings variant="Bulk" size={24} />,
        skeletonCount: 7,
        onOpenContent: () => openDrawer(0),
        Component: <PartnerWidget {...partnerData!} />,
      },
      {
        title: "address.title",
        icon: <Location variant="Bulk" size={24} />,
        skeletonCount: 7,
        Component: partnerData?.address ? (
          <AddressWidget {...partnerData.address} />
        ) : null,
      },
    ],
    [
      {
        title: "contact.title",
        icon: <Call variant="Bulk" size={22} />,
        skeletonCount: 3,
        onOpenContent: () => openDrawer(1),
        Component: partnerData?.contacts ? (
          <ContactsWidget cardBox data={partnerData.contacts} />
        ) : null,
      },
    ],
  ];

  const moduleHeaderProps = {
    title: partnerData?.company.fantasyName
      ? formatText(partnerData.company.fantasyName)
      : "",
    loading: isPending,
    onClick: onStatusToggle,
    checked: partnerData?.details.status === "ACTIVE",
    codeCopy: partnerData?.details.companyCode
      ? `PRC-${partnerData.details.companyCode}`
      : "",
    copyTitle: "partner.code",
    showStatus: true,
    onBack: true,
  };

  return {
    partnerData,
    isPending,
    data: {
      partner: partnerData,
      loading: isPending,
    },
    moduleHeaderProps,
    sectionGroups,
    statsConfig,
    quickActions,
    navigateToModule: (mod: string) =>
      push(mod as RendererModulesType, {
        partnerCode: partnerData?.partnerCode,
      }),
  };
};
