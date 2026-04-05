import { Box } from "@mui/material";
import { Card } from "@sr/common/components/Card";
import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import {
  AddressWidget,
  CompanyWidget,
  ContactsWidget,
} from "@sr/common/components/Widgets";
import { Animated } from "@sr/common/ui/motion";
import { Building4, Buildings, Call, Location } from "iconsax-react";
import { PartnerWidget } from "../components/Widgets";
import { usePartnerDetailsPageHook, usePartnerPageHook } from "../hooks";

export function PartnerDetailsPage() {
  const { isPending, partnerData, openDrawer } = usePartnerDetailsPageHook();

  const { handleToggle } = usePartnerPageHook();

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
    title: partnerData?.company.fantasyName,
    onClick: onStatusToggle,
    checked: partnerData?.details.status === "ACTIVE",
    codeCopy: partnerData?.details.companyCode
      ? `PRC-${partnerData.details.companyCode}`
      : "",
    copyTitle: "partner.code",
    showStatus: true,
    onBack: true,
  };

  return (
    <ModuleViewport header={<ModuleHeader {...moduleHeaderProps} />}>
      <Animated variant="container" className="grid grid-cols-1 gap-5">
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
