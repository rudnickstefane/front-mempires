import { Box, Button, Typography } from "@mui/material";
import { DrawerHeaderProps } from "@sr/common/types";
import { CloseCircle } from "iconsax-react";

export function DrawerHeader({
  title,
  headerStep,
  onClick,
}: DrawerHeaderProps) {
  return (
    <Box className="flex justify-between">
      <Typography
        align="left"
        color="brand-primary"
        className="!font-poppins !font-bold !text-3xl !text-neutral20"
      >
        {title}
      </Typography>
      <Box className="flex justify-end items-center">
        <Typography className="py-1 px-2 mr-2 !font-poppins !text-xs text-neutral-900 !leading-3 bg-gray-200 rounded-full">
          {headerStep}
        </Typography>
        <Button
          onClick={onClick}
          className="flex flex-row items-center !min-w-10 !mx-1 !rounded-full !min-h-10 !text-neutral-600 hover:!text-primary !transition-all"
        >
          <CloseCircle size={22} variant="Linear" />
        </Button>
        <Typography className="flex flex-row !text-xs !absolute right-[2rem] top-[4.7rem] text-gray-600 !font-poppins">
          (<Box className="text-[#ff0000]">*</Box>) Campos obrigatórios
        </Typography>
      </Box>
    </Box>
  );
}
