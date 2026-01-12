import { Box, Divider, Typography } from "@mui/material";
import { Grid } from "@sr/common/components/Grids";
import { ModuleViewport } from "@sr/common/components/Layout";
import {
  AddressSection,
  ContactsSection,
  PersonalSection,
} from "@sr/common/components/Sections";
import { useContentHook } from "@sr/common/hooks";
import { storage } from "@sr/common/storage";
import { ProfileProps } from "@sr/common/types";
import { useProfileGymManagement } from "../Portal/pages/home/hooks/useProfileGymManagement";
import { ProfileHeader } from "./ProfileHeader";

export default function Profile({ data, refresh }: ProfileProps) {
  const label = useContentHook();
  const { drawerContentProps, isDrawerOpen, openDrawer, closeDrawer } =
    useProfileGymManagement({ data, refresh });

  return (
    <ModuleViewport
      header={<ProfileHeader data={data} />}
      isDrawerOpen={isDrawerOpen}
      onCloseDrawer={closeDrawer}
      drawerContent={drawerContentProps}
    >
      <Box className="flex flex-row justify-between items-center">
        <Box>
          <Typography className="flex flex-row items-center !text-4xl !my-2 !mb-4 text-[#212121]">
            {label.profile.title}
          </Typography>
          <Typography className="flex flex-row items-center !text-sm font-ubuntu">
            {label.profile.subtitle}
          </Typography>
        </Box>
        <Box>
          <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
            {label.code}: PFL-{storage.get<string>("profileCode")}
          </Typography>
        </Box>
      </Box>

      <Divider className="!my-5 w-full bg-[#e2e2e4]" />

      <Grid
        title={label.personal.title}
        loading={data?.loading}
        skeletonCount={5}
        onEdit={() => openDrawer(0)}
      >
        <PersonalSection label={label.personal} data={data.profile} />
      </Grid>

      <Grid
        title={label.address.title}
        loading={data?.loading}
        skeletonCount={7}
        onEdit={() => openDrawer(1)}
      >
        <AddressSection label={label.address} data={data.profile} />
      </Grid>

      <Grid
        title={label.contact.title}
        loading={data?.loading}
        skeletonCount={3}
        onEdit={() => openDrawer(2)}
      >
        <ContactsSection label={label.contact} data={data.profile} />
      </Grid>
    </ModuleViewport>
  );
}
