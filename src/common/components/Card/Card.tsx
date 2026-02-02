/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Card as MuiCard, Skeleton } from "@mui/material";
import { Animated } from "@sr/common/ui/motion";
import React, { useMemo, useState } from "react";
import { CardHeader } from "./CardHeader";

interface GridProps {
  variant?: string;
  gradient?: boolean;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
  skeletonCount: number;
  onOpenContent?: () => void;
  labelButton?: string;
  children?: React.ReactNode;
  hasSensitiveData?: boolean;
}

export const Card = ({
  variant,
  gradient,
  title,
  description,
  icon,
  className,
  loading,
  skeletonCount,
  onOpenContent,
  labelButton,
  children,
  hasSensitiveData,
}: GridProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const bgClass = gradient ? "!bg-primary-gradient" : "!bg-white";

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
      <MuiCard
        className={`${bgClass} !rounded-2xl p-6 !border-0 !shadow-soft hover:!shadow-lg transition-all duration-300 w-full h-full ${variant === "button" ? "cursor-pointer !transition-all !duration-300 hover:-translate-y-1" : ""} `}
        onClick={variant === "button" ? onOpenContent : undefined}
      >
        <CardHeader
          title={title}
          description={description}
          labelButton={labelButton}
          icon={icon}
          iconClass={className}
          onOpenContent={onOpenContent}
          hasSensitiveData={hasSensitiveData}
          isVisible={isVisible}
          onToggleVisible={() => setIsVisible(!isVisible)}
          gradient={gradient}
        />
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
      </MuiCard>
    </Animated>
  );
};
