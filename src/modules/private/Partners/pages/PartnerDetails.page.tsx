/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { Card, StatCard } from "@sr/common/components/Card";
import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import {
  AddressWidget,
  CompanyWidget,
  ContactsWidget,
} from "@sr/common/components/Widgets";
import { Animated } from "@sr/common/ui/motion";
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
import { RendererModulesType } from "../../Portal/pages/home/types/gym-management.types";
import { PartnerWidget } from "../components/Widgets";
import { usePartnerDetailsPageHook, usePartnerPageHook } from "../hooks";

export function PartnerDetailsPage() {
  const { isPending, partnerData, openDrawer } = usePartnerDetailsPageHook();
  const { handleToggle } = usePartnerPageHook();

  const push = useNavigationStore((state) => state.push);

  const onStatusToggle = async () => {
    if (partnerData) {
      await handleToggle(
        partnerData.partnerCode!,
        partnerData.company.fantasyName || partnerData.company.businessName,
        partnerData.details.status === "ACTIVE",
      );
    }
  };

  const sectionGroups = [
    [
      {
        title: "company.details",
        icon: <Building4 variant="Bulk" size={24} />,
        skeletonCount: 5,
        Component: <CompanyWidget {...partnerData!} />,
      },
    ],
    [
      {
        title: "partner.details",
        icon: <Buildings variant="Bulk" size={24} />,
        skeletonCount: 5,
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
        skeletonCount: 5,
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
    onClick: onStatusToggle,
    checked: partnerData?.details.status === "ACTIVE",
    codeCopy: partnerData?.details.companyCode
      ? `PRC-${partnerData.details.companyCode}`
      : "",
    copyTitle: "partner.code",
    showStatus: true,
    onBack: true,
  };

  const statsConfig = [
    {
      title: "Bandeiras",
      value: 1,
      icon: <Building variant="Bulk" size={24} />,
      colorClass: "text-slate-500",
      bgClass: "bg-slate-100",
    },
    {
      title: "Lojas",
      value: partnerData?.storeCount,
      icon: <Shop variant="Bulk" size={24} />,
      colorClass: "text-slate-500",
      bgClass: "bg-slate-100",
    },
    {
      title: "Produtos",
      value: 0,
      icon: <Box1 variant="Bulk" size={24} />,
      colorClass: "text-slate-500",
      bgClass: "bg-slate-100",
    },
    {
      title: "Convênios ativos",
      value: 1,
      icon: <Buildings2 variant="Bulk" size={24} />,
      colorClass: "text-green-600",
      bgClass: "bg-green-50",
    },
  ];

  const buttonsGroups = [
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
        module: "PartnerStores",
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

  return (
    <ModuleViewport header={<ModuleHeader {...moduleHeaderProps} />}>
      <Animated variant="container" className="grid grid-cols-1 gap-5">
        {buttonsGroups.map((group, groupIdx) => (
          <Box key={groupIdx} className="flex flex-col lg:flex-row gap-5">
            {group.map((section, idx) => (
              <Card
                key={idx}
                variant="button"
                title={section.title}
                description={section.description}
                gradient={section.gradient}
                className={section.iconClass}
                icon={section.icon}
                skeletonCount={section.skeletonCount}
                noEdit
                onOpenContent={() =>
                  push(section.module as RendererModulesType, {
                    partnerCode: partnerData?.partnerCode,
                  })
                }
              />
            ))}
          </Box>
        ))}

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsConfig.map((stat, index) => (
            <Card key={index} loading={isPending} skeletonCount={3}>
              <StatCard {...stat} />
            </Card>
          ))}
        </Box>

        {sectionGroups.map((group, groupIdx) => (
          <Box key={groupIdx} className="flex flex-col lg:flex-row gap-5">
            {group.map((section, idx) => (
              <Card
                key={section.title || idx}
                title={section.title}
                icon={section.icon}
                loading={isPending}
                skeletonCount={section.skeletonCount}
                onOpenContent={section.onOpenContent}
              >
                {section.Component}
              </Card>
            ))}
          </Box>
        ))}
      </Animated>
    </ModuleViewport>
  );
}
