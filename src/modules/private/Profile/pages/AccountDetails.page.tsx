import { Box } from "@mui/material";
import { Card } from "@sr/common/components/Card";
import { ProfileDetails } from "@sr/modules/common/types";
import { Call, Location, Profile as Profiles } from "iconsax-react";
import { RendererModulesType } from "../../Portal/pages/home/types/gym-management.types";
import * as Widget from "../components/Widgets";

export type ProfilePropss = {
  data: {
    profile: ProfileDetails;
    loading: boolean;
  };
  label?: {
    code: string;
  };
  openDrawer: (index: number) => void;
  onNavigate: (module: RendererModulesType) => void;
  refresh?: () => Promise<void>;
};

export function AccountDetailsPage({
  data,
  openDrawer,
  onNavigate,
}: ProfilePropss) {
  const sectionGroups = [
    [
      {
        title: "personal.title",
        icon: <Profiles variant="Bulk" size={24} />,
        skeletonCount: 5,
        onOpenContent: () => openDrawer(0),
        Component: <Widget.Personal data={data.profile} />,
      },
      {
        title: "address.title",
        icon: <Location variant="Bulk" size={24} />,
        skeletonCount: 7,
        onOpenContent: () => openDrawer(1),
        Component: <Widget.Address data={data.profile} />,
      },
    ],
    [
      {
        title: "contact.title",
        icon: <Call variant="Bulk" size={22} />,
        skeletonCount: 3,
        onOpenContent: () => openDrawer(2),
        Component: <Widget.Contacts data={data.profile} />,
      },
      {
        title: "actions.title",
        skeletonCount: 3,
        Component: <Widget.QuickActions onNavigate={onNavigate} />,
      },
    ],
  ];

  return (
    <>
      <Card
        loading={data?.loading}
        skeletonCount={5}
        onOpenContent={() => openDrawer(0)}
      >
        <Widget.UserSummary data={data} />
      </Card>
      {sectionGroups.map((group, groupIdx) => (
        <Box key={groupIdx} className="flex flex-col lg:flex-row gap-5">
          {group.map((section, idx) => (
            <Card
              key={section.title || idx}
              title={section.title}
              icon={section.icon}
              loading={data?.loading}
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
