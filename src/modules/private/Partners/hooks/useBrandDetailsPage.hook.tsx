/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AddressWidget,
  CompanyWidget,
  ContactsWidget,
} from "@sr/common/components/Widgets";
import { useDrawerStore } from "@sr/common/hooks";
import { useNavigationStore } from "@sr/store";
import { formatText } from "@sr/utils";
import { Building4, Buildings, Call, Location } from "iconsax-react";
import * as Hook from ".";
import { RendererModulesType } from "../../Portal/pages/home/types/gym-management.types";
import { PartnerWidget } from "../components/Widgets";
import { PartnerDrawerContent } from "../drawers";

export const useBrandDetailsPageHook = () => {
  const open = useDrawerStore((s) => s.openDrawer);
  const { params, push } = useNavigationStore();

  const { handleToggle } = Hook.usePartnerHook();
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
        title: "brand.details",
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
      ? `BRD-${partnerData.details.companyCode}`
      : "",
    copyTitle: "brand.code",
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
    navigateToModule: (mod: string) =>
      push(
        mod as RendererModulesType,
        { partnerCode: partnerData?.partnerCode },
        partnerData?.company.fantasyName,
      ),
  };
};
