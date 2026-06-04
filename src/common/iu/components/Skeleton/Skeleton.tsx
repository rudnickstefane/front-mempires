import { Box, Skeleton as MuiSkeleton } from "@mui/material";
import { useMemo } from "react";

interface SkeletonProps {
  count?: number;
  minWidth?: number;
  maxWidth?: number;
  height?: number | string;
  gap?: number;
  className?: string;
}

export const Skeleton = ({
  count = 3,
  minWidth = 15,
  maxWidth = 85,
  height = 29,
  gap = 8,
  className = "",
}: SkeletonProps) => {
  const widths = useMemo(() => {
    return Array.from({ length: count }).map(
      () => Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth,
    );
  }, [count, minWidth, maxWidth]);

  return (
    <Box className={`flex flex-col ${className}`} sx={{ gap: `${gap}px` }}>
      {widths.map((width, index) => (
        <MuiSkeleton
          key={index}
          variant="text"
          animation="wave"
          sx={{ width: `${width}%`, height: height }}
        />
      ))}
    </Box>
  );
};
