/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Tooltip } from "@mui/material";
import { Category, NotificationBing } from "iconsax-react";
import { NotificationMenu } from "../notification";
import { CompanySection } from "./CompanySection";

export const Topbar = ({ methods }: any) => {
  const {
    handleOpen,
    responseNotifications,
    setActiveComponent,
    setExpandedMenus,
    setSelectedResource,
  } = methods;

  return (
    <Box className="flex flex-row w-full min-h-[5rem] bg-white justify-between items-center px-5">
      <Box className="mr-4 max-w-80">
        {/* Company Section */}
        <CompanySection methods={methods} />
      </Box>
      <Box className="flex items-center gap-2">
        {/* Notifications */}
        <Box>
          <Tooltip title="Notificações" arrow>
            <Button
              onClick={(e) => handleOpen(e, "notification")}
              className="!min-w-12 !h-12 !rounded-full hover:!bg-gray-100 !text-gray-800 relative"
            >
              <NotificationBing size={22} />
              {responseNotifications?.findNotifications?.some(
                (n: any) => !n.read
              ) && (
                <Box className="absolute top-1.5 right-1.5 text-[11px] w-[20.11px] h-[19.09px] bg-primary text-white rounded-[50%]">
                  5
                </Box>
              )}
            </Button>
          </Tooltip>
          <NotificationMenu methods={methods} />
        </Box>

        {/* Support */}
        <Tooltip title="Central de Serviços" arrow>
          <Button
            onClick={() => {
              setActiveComponent("Support");
              setExpandedMenus([]);
              setSelectedResource(null);
            }}
            className="!min-w-12 !h-12 !rounded-full hover:!bg-gray-100 !text-gray-800"
          >
            <Category size={22} />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};
