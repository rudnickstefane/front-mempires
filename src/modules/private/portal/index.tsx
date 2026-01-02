import { Box } from "@mui/material";
import { Sidebar } from "./components/sidebar";
import { Topbar } from "./components/topbar";
import { useManagement } from "./hooks";
import { useGymManagement } from "./pages/home/hooks";

export default function Portal() {
  const { permissions } = useManagement();
  const methods = useGymManagement({ permissions });

  return (
    <Box className="flex flex-row bg-white h-screen overflow-hidden">
      <Sidebar isCollapsed={methods.isMenuCollapsed} methods={methods} />

      <Box className="flex flex-col w-full">
        <Topbar methods={methods} />

        <Box className="rounded-l-3xl bg-[#f2f2f280] h-full border border-[#EAECF0] overflow-y-auto">
          {methods.renderComponentContent()}
        </Box>
      </Box>
    </Box>
  );
}
