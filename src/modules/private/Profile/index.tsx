import { Box } from "@mui/material";
import { Grid } from "@sr/common/components/Grids";
import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import {
  Address,
  Contacts,
  Personal,
  QuickActions,
} from "@sr/common/components/Sections";
import { useContentHook } from "@sr/common/hooks";
import { ProfileProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { Call, Location, Profile as Profiles } from "iconsax-react";
import { useProfileGymManagement } from "../Portal/pages/home/hooks/useProfileGymManagement";
import { ProfileHeader } from "./components/Sections";

export default function Profile({ data, refresh }: ProfileProps) {
  const label = useContentHook();
  const { drawerContentProps, isDrawerOpen, openDrawer, closeDrawer } =
    useProfileGymManagement({ data, refresh });

  const sectionGroups = [
    [
      {
        title: label.personal.title,
        icon: <Profiles type="linear" size={24} />,
        skeletonCount: 5,
        onEdit: () => openDrawer(0),
        Component: <Personal label={label.personal} data={data.profile} />,
      },
      {
        title: label.address.title,
        icon: <Location type="linear" size={24} />,
        skeletonCount: 7,
        onEdit: () => openDrawer(1),
        Component: <Address label={label.address} data={data.profile} />,
      },
    ],
    [
      {
        title: label.contact.title,
        icon: <Call type="linear" size={24} />,
        skeletonCount: 3,
        onEdit: () => openDrawer(2),
        Component: <Contacts label={label.contact} data={data.profile} />,
      },
      {
        title: label.actions.title,
        skeletonCount: 3,
        Component: <QuickActions label={label.contact} data={data.profile} />,
      },
    ],
  ];

  return (
    <ModuleViewport
      header={<ModuleHeader label={label.profile} />}
      isDrawerOpen={isDrawerOpen}
      onCloseDrawer={closeDrawer}
      drawerContent={drawerContentProps}
    >
      <Animated variant="container" className="grid grid-cols-1 gap-5">
        <Grid
          loading={data?.loading}
          skeletonCount={5}
          onEdit={() => openDrawer(0)}
        >
          <ProfileHeader data={data} label={label.profile} />
        </Grid>
        {sectionGroups.map((group, groupIdx) => (
          <Box key={groupIdx} className="flex flex-col lg:flex-row gap-5">
            {group.map((section, idx) => (
              <Grid
                key={section.title || idx}
                title={section.title}
                icon={section.icon}
                loading={data?.loading}
                skeletonCount={section.skeletonCount}
                onEdit={section.onEdit}
              >
                {section.Component}
              </Grid>
            ))}
          </Box>
        ))}
      </Animated>
    </ModuleViewport>
  );
}
