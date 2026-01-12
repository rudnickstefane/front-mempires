import { Box } from "@mui/material";
import { ReactNode } from "react";

interface GridBoxProps {
  children: ReactNode;
}

export const GridBox = ({ children }: GridBoxProps) => {
  return (
    <Box className="bg-neutral-100 border border-neutral-200 lg:w-[49%] w-full rounded-lg p-5">
      {children}
    </Box>
  );
};
