/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import { PiUserCircleLight } from "react-icons/pi";
import { TbFileInvoice, TbUserCircle } from "react-icons/tb";

export const ProfileSection = ({ isCollapsed, methods }: any) => {
  const {
    isProfileLoading,
    responseProfileDetails,
    anchorEls,
    handleOpen,
    handleClose,
    setActiveComponent,
    setSelectedResource,
    setExpandedMenus,
  } = methods;

  const profile = responseProfileDetails?.findProfileDetails;
  const firstName = profile?.name?.split(" ")[0];
  const email = profile?.contact?.[0]?.email;

  const handleProfileClick = () => {
    setSelectedResource(null);
    setExpandedMenus([]);
    setActiveComponent("Profile");
  };

  const handleMenuAction = (component: string) => {
    handleClose("menuProfile");
    setActiveComponent(component);
  };

  return (
    <Box className="flex flex-row items-center w-full">
      <Tooltip title="Meus Dados" placement="bottom" arrow>
        <Button
          onClick={handleProfileClick}
          className={`!justify-start !normal-case !text-neutral-900 !bg-[#f3f3f3] !rounded-l-3xl !min-h-[3.7rem] !rounded-r-none ${
            isCollapsed ? "!min-w-[3.5rem] !px-2" : "w-full !px-4"
          }`}
        >
          {isProfileLoading ? (
            <Skeleton variant="circular" width={40} height={36} />
          ) : (
            <PiUserCircleLight className="text-[2.5rem]" />
          )}

          {!isCollapsed && (
            <Box className="flex flex-col text-left ml-3 overflow-hidden">
              <Typography className="!text-sm font-semibold truncate w-24">
                {isProfileLoading ? (
                  <Skeleton className="w-[4rem]" />
                ) : (
                  firstName
                )}
              </Typography>
              <Typography className="!text-[0.75rem] font-secondary text-gray-500 truncate w-24">
                {isProfileLoading ? <Skeleton className="w-[5.5rem]" /> : email}
              </Typography>
            </Box>
          )}
        </Button>
      </Tooltip>

      <Box>
        <Button
          className={`flex flex-row !rounded-r-3xl !bg-[#f3f3f3] !rounded-l-none items-center !min-h-[3.7rem] !text-[1.25rem] ${
            isCollapsed ? "!min-w-[2.1rem]" : "!min-w-[2.7rem]"
          }`}
          style={{ color: "#08041b" }}
          sx={{
            textTransform: "none",
          }}
          onClick={(event) => {
            handleOpen(event, "menuProfile");
            setSelectedResource(null);
            setExpandedMenus([]);
          }}
        >
          {anchorEls["menuProfile"] ? (
            <ArrowDown2 size={20} variant="Linear" />
          ) : (
            <ArrowRight2 size={20} variant="Linear" />
          )}
        </Button>

        <Menu
          anchorEl={anchorEls["menuProfile"]}
          open={Boolean(anchorEls["menuProfile"])}
          onClose={() => handleClose("menuProfile")}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          slotProps={{
            paper: { className: "mt-2 shadow-lg rounded-xl min-w-[150px]" },
          }}
        >
          <MenuItem
            onClick={() => handleMenuAction("Profile")}
            className="!rounded-md !mx-2"
          >
            <ListItemIcon>
              <TbUserCircle size={20} />
            </ListItemIcon>
            <ListItemText primary="Meus Dados" />
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuAction("Invoices")}
            className="!rounded-md !mx-2"
          >
            <ListItemIcon>
              <TbFileInvoice size={20} />
            </ListItemIcon>
            <ListItemText primary="Faturas" />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
