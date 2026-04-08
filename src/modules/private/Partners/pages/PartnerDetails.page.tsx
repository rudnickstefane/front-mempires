/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { Card, StatCard } from "@sr/common/components/Card";
import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import { Animated } from "@sr/common/ui/motion";
import { usePartnerDetailsPageHook } from "../hooks";

export function PartnerDetailsPage() {
  const {
    isPending,
    sectionGroups,
    statsConfig,
    moduleHeaderProps,
    quickActions,
    navigateToModule,
  } = usePartnerDetailsPageHook();

  return (
    <ModuleViewport header={<ModuleHeader {...moduleHeaderProps} />}>
      <Animated variant="container" className="grid grid-cols-1 gap-5">
        {quickActions.map((group, groupIdx) => (
          <Box key={groupIdx} className="flex flex-col lg:flex-row gap-5">
            {group.map((section, idx) => (
              <Card
                key={idx}
                variant="button"
                title={section.title}
                description={section.description}
                gradient={section.gradient}
                className={section.iconClass}
                icon={section.icon}
                skeletonCount={section.skeletonCount}
                noEdit
                onOpenContent={() => navigateToModule(section.module)}
              />
            ))}
          </Box>
        ))}

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsConfig.map((stat, index) => (
            <Card key={index} loading={isPending} skeletonCount={3}>
              <StatCard
                {...stat}
                icon={<stat.icon variant="Bulk" size={24} />}
              />
            </Card>
          ))}
        </Box>

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
