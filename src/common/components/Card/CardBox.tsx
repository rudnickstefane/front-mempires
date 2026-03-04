import { Box } from "@mui/material";

interface CardBoxProps {
  children: React.ReactNode;
}

export const CardBox = ({ children }: CardBoxProps) => {
  return (
    <Box className="bg-neutral-50 border-solid border border-neutral-700 w-full rounded-xl p-5 grid grid-cols-[max-content,1fr] gap-x-5 items-center">
      {children}
    </Box>
  );
};
