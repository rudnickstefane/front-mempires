/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Tooltip } from "@mui/material";
import { Logo } from "@sr/modules/common/ui/Logo";
import { Notification } from "iconsax-react"; // Ajuste conforme seus ícones
import { BiSupport } from "react-icons/bi";
import { NotificationMenu } from "../notification";

export const Topbar = ({ methods }: any) => {
  const { handleOpen, responseNotifications, setActiveComponent } = methods;

  return (
    <Box className="flex flex-row w-full min-h-[5rem] bg-white justify-end items-center px-6">
      <Box className="flex items-center gap-4">
        {/* Notifications */}
        <Box>
          <Tooltip title="Notificações" arrow>
            <Button
              onClick={(e) => handleOpen(e, "notification")}
              className="!min-w-12 !h-12 !rounded-full !bg-gray-100 text-gray-800 relative"
            >
              <Notification size={22} />
              {responseNotifications?.findNotifications?.some(
                (n: any) => !n.read
              ) && (
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-white" />
              )}
            </Button>
          </Tooltip>
          <NotificationMenu methods={methods} />
        </Box>

        {/* Support */}
        <Tooltip title="Central de Serviços" arrow>
          <Button
            onClick={() => setActiveComponent("Support")}
            className="!min-w-12 !h-12 !rounded-full !bg-gray-100 text-gray-800"
          >
            <BiSupport size={22} />
          </Button>
        </Tooltip>

        <Box className="ml-4 border-l pl-6">
          <Logo size="text-2xl" color="text-gray-400" />
        </Box>
      </Box>
    </Box>
  );
};
