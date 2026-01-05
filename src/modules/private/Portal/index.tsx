import { Box } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { useManagement, usePortalHook } from "./hooks";

export default function Portal() {
  const { permissions } = useManagement();
  const methods = usePortalHook({ permissions });

  return (
    <Box className="flex flex-row bg-white h-screen overflow-hidden">
      <Sidebar isCollapsed={methods.sidebar.isCollapsed} methods={methods} />

      <Box className="flex flex-col w-full">
        <Topbar methods={methods} />

        <Box className="rounded-l-3xl bg-[#f2f2f280] h-full border border-[#EAECF0] overflow-y-auto">
          {methods.renderModule()}
        </Box>
      </Box>
    </Box>
  );
}
