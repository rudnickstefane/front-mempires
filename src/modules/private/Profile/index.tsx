import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import { Animated } from "@sr/common/ui/motion";
import { useProfileHook } from "./hooks/useProfile.hook";
import { AccountDetailsPage } from "./pages";

export default function Profile() {
  const { openDrawer, profileData, isPending } = useProfileHook();

  return (
    <ModuleViewport header={<ModuleHeader />}>
      <Animated variant="container" className="grid grid-cols-1 gap-5">
        <AccountDetailsPage
          data={{ profile: profileData!, loading: isPending }}
          openDrawer={openDrawer}
        />
      </Animated>
    </ModuleViewport>
  );
}
