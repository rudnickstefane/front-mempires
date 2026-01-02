/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PiConfettiLight } from "react-icons/pi";

export const NotificationMenu = ({ methods }: any) => {
  const {
    anchorEls,
    handleClose,
    responseNotifications,
    handleNotificationRead,
    setActiveComponent,
    formatNotificationTime,
    setSelectedResource,
    setExpandedMenus,
  } = methods;

  const notifications =
    responseNotifications?.findNotifications?.filter((n: any) => !n.read) || [];

  const handleNavigate = (path: string, code?: string) => {
    setSelectedResource(null);
    setExpandedMenus([]);
    handleClose("notification");
    if (code) handleNotificationRead(code);
    setActiveComponent(path);
  };

  return (
    <Menu
      anchorEl={anchorEls["notification"]}
      open={Boolean(anchorEls["notification"])}
      onClose={() => handleClose("notification")}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      slotProps={{
        paper: { className: "mt-2 shadow-xl rounded-2xl w-[400px]" },
      }}
    >
      <Box className="p-4 flex justify-between items-center">
        <Typography className="font-semibold text-lg">Notificações</Typography>
        <Button
          onClick={() => handleClose("notification")}
          className="!min-w-fit hover:text-primary"
        >
          <IoIosCloseCircleOutline size={24} />
        </Button>
      </Box>

      <Box className="max-h-[400px] overflow-y-auto px-2">
        {notifications.length > 0 ? (
          notifications.slice(0, 10).map((n: any, index: number) => (
            <MenuItem
              key={index}
              onClick={() => handleNavigate(n.path, n.notificationCode)}
              className="!rounded-lg !py-3 !mb-1 hover:bg-gray-50"
            >
              <Box className="flex gap-3 w-full">
                <Box className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                <Box className="flex flex-col">
                  <Typography className="font-medium text-sm leading-tight">
                    {n.title}
                  </Typography>
                  <Typography className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {n.description}
                  </Typography>
                  <Typography className="text-[10px] text-gray-400 mt-1">
                    {formatNotificationTime(n.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))
        ) : (
          <Box className="py-10 flex flex-col items-center text-center text-gray-400">
            <PiConfettiLight size={60} />
            <Typography className="mt-2 text-sm">
              Tudo certo por aqui!
            </Typography>
            <Typography className="text-xs">
              Nenhuma notificação no momento.
            </Typography>
          </Box>
        )}
      </Box>

      <Divider className="!my-2" />

      <Box className="p-2 flex justify-center">
        <Button
          fullWidth
          className="!text-gray-500 !normal-case hover:!text-primary"
          onClick={() => handleNavigate("Notifications")}
        >
          Exibir todas as notificações
        </Button>
      </Box>
    </Menu>
  );
};
