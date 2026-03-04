import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import { Animated } from "@sr/common/ui/motion";
import { useNavigationStore } from "@sr/store";
import { useProfileHook } from "../Profile/hooks";
import { PartnersPage } from "./pages";

export default function Partners() {
  const { push } = useNavigationStore();
  const {
    openDrawer,
    drawerContentProps,
    profileData,
    isPending,
    isDrawerOpen,
    closeDrawer,
  } = useProfileHook();

  return (
    <ModuleViewport
      header={<ModuleHeader showButton labelButton={"Novo Parceiro"} />}
      isDrawerOpen={isDrawerOpen}
      onCloseDrawer={closeDrawer}
      drawerContent={drawerContentProps}
    >
      <Animated variant="container" className="grid grid-cols-1 gap-5">
        <PartnersPage
          data={{ profile: profileData!, loading: isPending }}
          onNavigate={(id) => push(id)}
          openDrawer={openDrawer}
        />
      </Animated>
    </ModuleViewport>
  );
}
