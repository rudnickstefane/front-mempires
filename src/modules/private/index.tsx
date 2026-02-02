import { Box, GlobalStyles } from "@mui/material";
import { useNavigationStore } from "@sr/store";
import { Sidebar } from "./Portal/components/Sidebar";
import { Topbar } from "./Portal/components/Topbar";
import { ModuleRenderer } from "./Portal/config/navigation.config";
import { useManagement, usePortalHook } from "./Portal/hooks";

export default function Portal() {
  const activeModule = useNavigationStore((state) => state.getActiveModule());
  const { permissions } = useManagement();
  const methods = usePortalHook({ permissions });

  return (
    <>
      <GlobalStyles styles={{ body: { overflow: "hidden" } }} />
      <Box className="flex flex-row bg-white h-screen">
        <Sidebar isCollapsed={methods.sidebar.isCollapsed} methods={methods} />

        <Box className="flex flex-col w-full">
          <Topbar methods={methods} />

          <Box className="rounded-l-3xl bg-[#f2f2f280] h-full border border-[#EAECF0] overflow-hidden">
            <ModuleRenderer type={activeModule} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
