import { Box, Button } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { ModalHeaderProps } from "@sr/common/types";
import { CloseCircle } from "iconsax-react";

export function ModalHeader({
  icon,
  title,
  description,
  onClick,
}: ModalHeaderProps) {
  return (
    <Box className="flex justify-between">
      <Box className="flex flex-col gap-y-1">
        <Box className="flex flex-row items-center gap-3">
          {icon}
          <Typography
            translateId={title}
            align="left"
            color="brand-primary"
            className="!font-manrope !font-semibold !text-lg !text-neutral20"
          />
        </Box>
        <Typography
          translateId={description}
          align="left"
          color="brand-primary"
          className="!font-manrope !text-sm !text-neutral20"
        />
      </Box>
      <Box className="flex justify-end items-center">
        <Button
          onClick={onClick}
          className="flex flex-row items-center !min-w-10 !mx-1 !rounded-full !min-h-10 !text-neutral-600 hover:!text-primary !transition-all"
        >
          <CloseCircle size={22} variant="Linear" />
        </Button>
      </Box>
    </Box>
  );
}
