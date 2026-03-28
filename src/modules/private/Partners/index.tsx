import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import { Animated } from "@sr/common/ui/motion";
import { usePartnerHook } from "./hooks";
import { PartnersPage } from "./pages";

export default function Partners() {
  const { isDrawerOpen, drawerContentProps, openDrawer, closeDrawer } =
    usePartnerHook();

  return (
    <ModuleViewport
      header={
        <ModuleHeader
          showButton
          labelButton={"Novo Parceiro"}
          onClick={() => openDrawer()}
        />
      }
      isDrawerOpen={isDrawerOpen}
      onCloseDrawer={closeDrawer}
      drawerContent={drawerContentProps}
    >
      <Animated variant="container" className="grid grid-cols-1 gap-5">
        <PartnersPage />
      </Animated>
    </ModuleViewport>
  );
}
