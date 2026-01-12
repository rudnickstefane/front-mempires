import { Box, Button, Skeleton } from "@mui/material";
import { Edit } from "iconsax-react";
import { ReactNode, useMemo } from "react";

interface GridProps {
  title: string;
  loading: boolean;
  skeletonCount: number;
  onEdit: () => void;
  children: ReactNode;
}

export const Grid = ({
  title,
  loading,
  skeletonCount,
  onEdit,
  children,
}: GridProps) => {
  const skeletonWidths = useMemo(() => {
    return Array.from({ length: skeletonCount }).map(
      () => Math.floor(Math.random() * (10 - 35 + 1)) + 35
    );
  }, [skeletonCount]);

  return (
    <Box className="mt-5 border border-neutral-300 rounded-lg p-5">
      <Box className="!text-neutral-900 font-ubuntu !text-base !font-semibold !flex !items-center !gap-4">
        {title}
        <Button
          className="!min-w-5 !mr-5 hover:!text-[var(--color-primary)] !text-[#171717] !transition-all !p-0 !bg-white"
          onClick={onEdit}
        >
          <Edit size={22} variant="Linear" />
        </Button>
      </Box>

      {loading ? (
        <Box className="flex flex-col gap-2 mt-2">
          {skeletonWidths.map((width, index) => (
            <Skeleton
              key={index}
              variant="text"
              animation="wave"
              style={{ width: `${width}%` }}
              className="!h-7"
            />
          ))}
        </Box>
      ) : (
        children
      )}
    </Box>
  );
};
