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
import { useNavigationStore } from "@sr/store";
import { avatarLabel } from "@sr/utils";
import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import { TbFileInvoice, TbUserCircle } from "react-icons/tb";

export const ProfileSection = ({ isCollapsed, methods }: any) => {
  const { reset } = useNavigationStore();

  const {
    isProfileLoading,
    profileData,
    anchorEls,
    handleOpen,
    handleClose,
    setSelectedResource,
    setExpandedMenus,
  } = methods;

  const firstName = profileData?.name?.split(" ")[0];
  const email = profileData?.contact?.email;

  const handleProfileClick = () => {
    setSelectedResource(null);
    setExpandedMenus([]);
    reset("Profile");
  };

  const handleMenuAction = (component: any) => {
    handleClose("menuProfile");
    reset(component);
  };

  return (
    <Box className="flex flex-row items-center w-full mt-9 px-5">
      <Tooltip title="Meus Dados" placement="bottom" arrow>
        <Button
          onClick={handleProfileClick}
          className={`!justify-start !normal-case !text-neutral-900 !bg-neutral-100 !rounded-l-3xl !min-h-[3.7rem] !rounded-r-none ${
            isCollapsed ? "!min-w-[3rem] !px-1" : "w-full !px-4"
          }`}
        >
          {isProfileLoading ? (
            <Skeleton variant="circular" width={40} height={36} />
          ) : (
            <Typography className="!text-lg !font-bold text-[#646464] !font-manrope bg-neutral-200 !rounded-3xl p-2 w-[38px] h-9 flex justify-center items-center">
              {avatarLabel(profileData?.name)}
            </Typography>
          )}

          {!isCollapsed && (
            <Box className="flex flex-col text-left ml-3 overflow-hidden">
              <Typography className="!text-sm font-semibold truncate w-24 !font-manrope">
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
          className={`flex flex-row !rounded-r-3xl !bg-neutral-100 !rounded-l-none items-center !min-h-[3.7rem] !text-[1.25rem] ${
            isCollapsed ? "!min-w-[2.1rem]" : "!min-w-[2.7rem]"
          }`}
          style={{ color: "#08041b" }}
          sx={{
            textTransform: "none",
          }}
          onClick={(event) => {
            handleOpen(event, "menuProfile");
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
