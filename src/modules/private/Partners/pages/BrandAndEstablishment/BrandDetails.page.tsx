/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { Card } from "@sr/common/components/Card";
import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import { Animated } from "@sr/common/ui/motion";
import { useBrandDetailsPageHook } from "../../hooks";

export function BrandDetailsPage() {
  const { isPending, sectionGroups, moduleHeaderProps } =
    useBrandDetailsPageHook();

  return (
    <ModuleViewport header={<ModuleHeader {...moduleHeaderProps} />}>
      <Animated variant="container" className="grid grid-cols-1 gap-5">
        {sectionGroups.map((group, groupIdx) => (
          <Box key={groupIdx} className="flex flex-col lg:flex-row gap-5">
            {group.map((section, idx) => (
              <Card
                key={section.title || idx}
                title={section.title}
                icon={section.icon}
                loading={isPending}
                skeletonCount={section.skeletonCount}
                onOpenContent={section.onOpenContent}
              >
                {section.Component}
              </Card>
            ))}
          </Box>
        ))}
      </Animated>
    </ModuleViewport>
  );
}
