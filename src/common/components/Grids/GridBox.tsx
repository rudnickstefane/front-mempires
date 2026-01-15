import { Box } from "@mui/material";
import { ReactNode } from "react";

interface GridBoxProps {
  children: ReactNode;
}

export const GridBox = ({ children }: GridBoxProps) => {
  return (
    <Box className="bg-neutral-50 border border-neutral-200 lg:w-[48.5%] w-full rounded-xl p-5 grid grid-cols-[max-content,1fr] gap-x-5 items-center">
      {children}
    </Box>
  );
};
