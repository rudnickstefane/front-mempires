import { Box } from "@mui/material";
import { Grid } from "@sr/common/components/Grids";
import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import {
  AddressSection,
  ContactsSection,
  PersonalSection,
  QuickActions,
} from "@sr/common/components/Sections";
import { useContentHook } from "@sr/common/hooks";
import { ProfileProps } from "@sr/common/types";
import { Call, Location, Profile as Profiles } from "iconsax-react";
import { useProfileGymManagement } from "../Portal/pages/home/hooks/useProfileGymManagement";
import { ProfileHeader } from "./ProfileHeader";

export default function Profile({ data, refresh }: ProfileProps) {
  const label = useContentHook();
  const { drawerContentProps, isDrawerOpen, openDrawer, closeDrawer } =
    useProfileGymManagement({ data, refresh });

  return (
    <ModuleViewport
      header={<ModuleHeader label={label.profile} />}
      isDrawerOpen={isDrawerOpen}
      onCloseDrawer={closeDrawer}
      drawerContent={drawerContentProps}
    >
      <Box className="grid grid-cols-1 gap-5">
        <Grid
          loading={data?.loading}
          skeletonCount={5}
          onEdit={() => openDrawer(0)}
        >
          <ProfileHeader data={data} label={label.profile} />
        </Grid>

        <Box className="flex flex-col lg:flex-row gap-5">
          <Grid
            title={label.personal.title}
            icon={<Profiles type="linear" size={24} />}
            loading={data?.loading}
            skeletonCount={5}
            onEdit={() => openDrawer(0)}
          >
            <PersonalSection label={label.personal} data={data.profile} />
          </Grid>

          <Grid
            title={label.address.title}
            icon={<Location type="linear" size={24} />}
            loading={data?.loading}
            skeletonCount={7}
            onEdit={() => openDrawer(1)}
          >
            <AddressSection label={label.address} data={data.profile} />
          </Grid>
        </Box>

        <Box className="flex flex-col lg:flex-row gap-5">
          <Grid
            title={label.contact.title}
            icon={<Call type="linear" size={24} />}
            loading={data?.loading}
            skeletonCount={3}
            onEdit={() => openDrawer(2)}
          >
            <ContactsSection label={label.contact} data={data.profile} />
          </Grid>

          <Grid
            title={label.actions.title}
            loading={data?.loading}
            skeletonCount={3}
          >
            <QuickActions label={label.contact} data={data.profile} />
          </Grid>
        </Box>
      </Box>
    </ModuleViewport>
  );
}
