import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";

interface DataRowProps {
  label: string;
  value?: string | number;
  tooltip?: ReactNode;
  isBox?: boolean;
}

export function GridText({ label, value, tooltip, isBox }: DataRowProps) {
  return (
    <Box
      className={`grid ${
        isBox ? "grid-cols-[5.5rem,1fr]" : "grid-cols-[10rem,1fr]"
      }`}
    >
      <Typography className="!text-neutral-700 font-ubuntu !text-sm !mt-4 flex flex-row items-center">
        {label}
        {tooltip && (
          <Box className="w-0 h-0">
            <Tooltip title={tooltip} placement="right" arrow>
              <IconButton
                size="small"
                sx={{ marginTop: "-21px", marginLeft: "5px" }}
              >
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Typography>
      <Typography className="!text-neutral-900 font-ubuntu !text-sm !mt-4 !font-semibold break-words overflow-hidden">
        {value || "-"}
      </Typography>
    </Box>
  );
}
