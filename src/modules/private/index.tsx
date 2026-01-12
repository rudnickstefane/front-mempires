import { Box, GlobalStyles } from "@mui/material";
import { Sidebar } from "./Portal/components/Sidebar";
import { Topbar } from "./Portal/components/Topbar";
import { useManagement, usePortalHook } from "./Portal/hooks";

export default function Portal() {
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
            {methods.renderModule()}
          </Box>
        </Box>
      </Box>
    </>
  );
}
