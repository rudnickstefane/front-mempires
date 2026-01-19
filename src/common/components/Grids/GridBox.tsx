import { Box } from "@mui/material";

interface GridBoxProps {
  children: React.ReactNode;
}

export const GridBox = ({ children }: GridBoxProps) => {
  return (
    <Box className="bg-neutral-50 border border-neutral-200 w-full rounded-xl p-5 grid grid-cols-[max-content,1fr] gap-x-5 items-center">
      {children}
    </Box>
  );
};
