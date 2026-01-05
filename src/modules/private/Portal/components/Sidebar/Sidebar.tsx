/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Divider, Typography } from "@mui/material";
import { Logo } from "@sr/modules/common/ui/Logo";
import { Logout } from "iconsax-react";
import { ProfileSection } from "./ProfileSection";
import { SidebarNav } from "./SidebarNav";

export const Sidebar = ({ isCollapsed, methods }: any) => {
  const { finishSession } = methods;

  return (
    <Box
      className={`flex flex-col justify-between ${
        isCollapsed ? "w-[7.7rem]" : "w-64"
      }`}
    >
      <Box className="flex flex-col items-center pt-4">
        <Logo
          className="text-2xl text-gray-800"
          isApp={true}
          isCollapsed={isCollapsed}
        />

        <ProfileSection isCollapsed={isCollapsed} methods={methods} />

        <Divider
          className={`!my-5 ${isCollapsed ? "w-[5.2rem]" : "w-[13.5rem]"}`}
        />

        <SidebarNav {...methods} sidebarCollapsed={isCollapsed} />
      </Box>

      <Box className="mx-5">
        <Divider className={`${isCollapsed ? "w-[5.2rem]" : "w-[13.5rem]"}`} />
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
