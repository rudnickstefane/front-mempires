/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Divider,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Logout } from "iconsax-react";
import { RiExchange2Line } from "react-icons/ri";
import { PortalMenu } from "../menu";
import { ProfileSection } from "../profile";

export const Sidebar = ({ isCollapsed, methods }: any) => {
  const {
    isCompanyLoading,
    responseCompanyDetails,
    isCompanyDisabled,
    setSelectedResource,
    setExpandedMenus,
    setActiveComponent,
    finishSession,
  } = methods;

  return (
    <Box
      className={`flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-[7.7rem]" : "w-[16rem]"
      }`}
    >
      <Box className="flex flex-col items-center p-5">
        <ProfileSection isCollapsed={isCollapsed} methods={methods} />

        {/* Company Section */}
        <Tooltip title="Detalhes" placement="right" arrow>
          <Button
            className="flex flex-row !rounded-3xl !bg-transparent !justify-start !mt-5 w-full items-center"
            endIcon={
              <RiExchange2Line
                className={`${isCollapsed ? "!ml-[1rem]" : ""} ${
                  isCompanyDisabled ? "hidden" : ""
                }`}
              />
            }
            style={{ color: "#08041b" }}
            sx={{
              textTransform: "none",
              "&:hover": {
                color: "#ff0336 !important",
              },
            }}
            disabled={isCompanyDisabled}
            onClick={() => {
              setSelectedResource(null);
              setExpandedMenus([]);
              setActiveComponent("Company");
            }}
          >
            {!isCollapsed && (
              <Box className="flex flex-col text-left px-2">
                {isCompanyLoading ? (
                  <>
                    <Box
                      className={`flex flex-col text-left overflow-hidden transition-all duration-300 ${
                        isCollapsed
                          ? "opacity-0 max-w-0"
                          : "opacity-100 max-w-[10rem] min-w-[10rem] !px-5"
                      }`}
                    >
                      <Typography className="whitespace-nowrap overflow-hidden text-ellipsis">
                        <Skeleton
                          variant="text"
                          animation="wave"
                          className="w-full"
                        />
                      </Typography>
                      <Typography className="!font-light !text-[.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
                        <Skeleton
                          variant="text"
                          animation="wave"
                          className="w-full"
                        />
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography className="text-sm font-medium truncate w-32">
                      {responseCompanyDetails?.findCompanyDetails.fantasyName}
                    </Typography>
                    <Typography className="text-xs text-gray-400">
                      {responseCompanyDetails?.findCompanyDetails
                        .ownershipType === "MAIN"
                        ? "Matriz"
                        : "Filial"}
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </Button>
        </Tooltip>

        <Divider className="w-full !my-5" />

        <PortalMenu {...methods} isMenuCollapsed={isCollapsed} />
      </Box>

      <Box className="p-5">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<Logout size={20} />}
          onClick={finishSession}
          className="!rounded-3xl !normal-case h-11"
        >
          {!isCollapsed && "Sair"}
        </Button>
      </Box>
    </Box>
  );
};
