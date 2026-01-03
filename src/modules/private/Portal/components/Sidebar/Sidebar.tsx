/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Divider,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Logo } from "@sr/modules/common/ui/Logo";
import { Logout } from "iconsax-react";
import { RiExchange2Line } from "react-icons/ri";
import { SidebarNav } from "./SidebarNav";

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
      <Box className="flex flex-col items-center p-5 pt-3">
        <Logo
          size="text-2xl"
          color="text-gray-800"
          isApp={true}
          isCollapsed={isCollapsed}
        />

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

        <SidebarNav {...methods} isMenuCollapsed={isCollapsed} />
      </Box>

      <Box className="mx-5">
        <Divider className="!mx-5" />
        <Button
          fullWidth
          startIcon={<Logout size={22} variant="Linear" />}
          onClick={finishSession}
          className="w-full !my-5 !normal-case font-ubuntu !text-[#fa5252] !rounded-3xl !bg-[#fa52521f] hover:!bg-[#fa525238]"
        >
          Sair
        </Button>
        <Box className="!text-gray-500 flex flex-col items-center justify-center mb-5">
          <Typography
            className={`!text-sm !font-semibold truncate ${
              isCollapsed ? "max-w-20" : ""
            }`}
          >
            Copyright © {new Date().getFullYear()} BenefyCare.
          </Typography>
          <Typography
            className={`!text-sm truncate ${isCollapsed ? "max-w-20" : ""}`}
          >
            Todos os direitos reservados.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
