/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Card, CardContent, Skeleton } from "@mui/material";
import { Animated } from "@sr/common/ui/motion";
import { Edit, Eye, EyeSlash } from "iconsax-react";
import React, { useMemo, useState } from "react";
import { Show } from "../Show";

interface GridProps {
  title?: string;
  icon?: React.ReactNode;
  loading: boolean;
  skeletonCount: number;
  onEdit?: () => void;
  children: React.ReactNode;
  hasSensitiveData?: boolean;
}

export const Grid = ({
  title,
  icon,
  loading,
  skeletonCount,
  onEdit,
  children,
  hasSensitiveData,
}: GridProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const skeletonWidths = useMemo(() => {
    return Array.from({ length: skeletonCount }).map(
      () => Math.floor(Math.random() * (10 - 35 + 1)) + 35,
    );
  }, [skeletonCount]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { showSensitive: isVisible } as any);
    }
    return child;
  });

  return (
    <Animated variant="itemUp" isChild className="w-full">
      <Card className="bg-white !rounded-2xl p-6 !border-0 !shadow-soft hover:!shadow-lg transition-all duration-300 w-full h-full">
        <Show hidden={!title}>
          <CardContent className="text-rhino-950 !font-poppins text-lg font-semibold flex justify-between items-center gap-4 !p-0">
            <Box className="flex flex-row items-center gap-3">
              {icon && (
                <Box className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary">
                  {icon}
                </Box>
              )}
              {title}
            </Box>
            <Box>
              {hasSensitiveData && (
                <Button
                  className="!min-w-8 !h-8 !text-[#171717] hover:!text-primary !transition-all !p-0 !bg-white hover:!bg-neutral-100 hover:scale-105 !rounded-lg !mr-1"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
                </Button>
              )}
              {onEdit && (
                <Button
                  className="!min-w-8 !h-8 !text-[#171717] hover:!text-primary !transition-all !p-0 !bg-white hover:!bg-neutral-100 hover:scale-105 !rounded-lg"
                  onClick={onEdit}
                >
                  <Edit size={22} variant="Linear" />
                </Button>
              )}
            </Box>
          </CardContent>
        </Show>
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
          <Box className="w-full">{childrenWithProps}</Box>
        )}
      </Card>
    </Animated>
  );
};
