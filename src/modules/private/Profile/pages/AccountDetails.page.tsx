import { Box } from "@mui/material";
import { Card } from "@sr/common/components/Card";
import { AddressWidget, ContactsWidget } from "@sr/common/components/Widgets";
import { Call, Location, Profile as Profiles } from "iconsax-react";
import {
  PersonalWidget,
  QuickActionsWidget,
  UserSummaryWidget,
} from "../components/Widgets";
import { ProfileWidgetProps } from "../types";

export function AccountDetailsPage({
  openDrawer,
  ...props
}: ProfileWidgetProps) {
  const sectionGroups = [
    [
      {
        title: "personal.title",
        icon: <Profiles variant="Bulk" size={24} />,
        skeletonCount: 5,
        onOpenContent: () => openDrawer?.(0),
        Component: <PersonalWidget data={props?.data} />,
      },
      {
        title: "address.title",
        icon: <Location variant="Bulk" size={24} />,
        skeletonCount: 7,
        onOpenContent: () => openDrawer?.(1),
        Component: props?.data?.profile.address ? (
          <AddressWidget {...props?.data?.profile.address} />
        ) : null,
      },
    ],
    [
      {
        title: "contact.title",
        icon: <Call variant="Bulk" size={22} />,
        skeletonCount: 3,
        onOpenContent: () => openDrawer?.(2),
        Component: props?.data?.profile.contact ? (
          <ContactsWidget data={props?.data?.profile.contact} />
        ) : null,
      },
      {
        title: "actions.title",
        skeletonCount: 3,
        Component: <QuickActionsWidget />,
      },
    ],
  ];

  return (
    <>
      <Card
        loading={props?.data?.loading}
        skeletonCount={5}
        onOpenContent={() => openDrawer?.(0)}
      >
        <UserSummaryWidget data={props?.data} />
      </Card>
      {sectionGroups.map((group, groupIdx) => (
        <Box key={groupIdx} className="flex flex-col lg:flex-row gap-5">
          {group.map((section, idx) => (
            <Card
              key={section.title || idx}
              title={section.title}
              icon={section.icon}
              loading={props?.data?.loading}
              skeletonCount={section.skeletonCount}
              onOpenContent={section.onOpenContent}
            >
              {section.Component}
            </Card>
          ))}
        </Box>
      ))}
    </>
  );
}
