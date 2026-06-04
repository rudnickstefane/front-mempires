/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { useNavigationStore } from "@sr/store";
import { formatText } from "@sr/utils";
import { ArrowRight2 } from "iconsax-react";
import { Typography } from "../Typography";

interface BreadcrumbsProps {
  stack: string[];
  modulesRegistry: Record<string, any>;
  handleBackTo: (index: number) => void;
  maxItems?: number;
}

export const Breadcrumbs = ({
  stack,
  modulesRegistry,
  handleBackTo,
  maxItems = 4,
}: BreadcrumbsProps) => {
  const labels = useNavigationStore((s) => s.labels);

  return (
    <MuiBreadcrumbs
      maxItems={maxItems}
      separator={<ArrowRight2 size={12} variant="Linear" />}
      aria-label="breadcrumb"
    >
      {stack.map((moduleName, index) => {
        const isLast = index === stack.length - 1;
        const moduleConfig = modulesRegistry[moduleName];
        const dynamicLabel = labels[moduleName];

        const shouldShowDynamic =
          !isLast && moduleConfig?.useLabelAsPath && dynamicLabel;
        const displayValue = shouldShowDynamic
          ? formatText(dynamicLabel)
          : moduleConfig?.title;

        return (
          <Typography
            key={moduleName}
            className={`text-sm ${
              isLast
                ? "text-rhino-850 font-medium"
                : "text-rhino-900 cursor-pointer"
            }`}
            onClick={!isLast ? () => handleBackTo(index) : undefined}
            translateId={displayValue}
          />
        );
      })}
    </MuiBreadcrumbs>
  );
};
