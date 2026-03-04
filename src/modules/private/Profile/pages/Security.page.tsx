import { Box } from "@mui/material";
import { Card } from "@sr/common/components/Card";
import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import { Animated } from "@sr/common/ui/motion";
import { Key, MonitorMobbile, ShieldSecurity } from "iconsax-react";
import { useSecurityHook } from "../hooks";

export function SecurityPage() {
  const { openSecurityModal, modalConfig } = useSecurityHook();

  const sectionGroups = [
    [
      {
        title: "changeYourPassword.title",
        description: "changePassword.description",
        gradient: true,
        icon: <Key variant="Bulk" size={24} />,
        iconClass: "bg-white/20 text-white",
        skeletonCount: 3,
        onOpenContent: () => openSecurityModal("Password"),
        labelButton: "changePassword.title",
      },
      {
        title: "twoFaAuth.title",
        description: "twoFaAuth.description",
        icon: <ShieldSecurity variant="Bulk" size={24} />,
        skeletonCount: 3,
        onOpenContent: () => openSecurityModal("TwoFA"),
        labelButton: "setUpNow",
      },
      {
        title: "activeSessions.title",
        description: "activeSessions.description",
        icon: <MonitorMobbile variant="Bulk" size={24} />,
        iconClass: "!bg-purple-100 text-purple-500",
        skeletonCount: 3,
        onOpenContent: () => openSecurityModal("Sessions"),
        labelButton: "manageSessions.title",
      },
    ],
  ];

  return (
    <ModuleViewport
      header={<ModuleHeader onBack />}
      modal={{
        icon: modalConfig?.icon,
        title: modalConfig?.title,
        description: modalConfig?.description,
        content: modalConfig?.component,
      }}
    >
      <Animated variant="container" className="grid grid-cols-1 gap-5">
        {sectionGroups.map((group, groupIdx) => (
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
                onOpenContent={section.onOpenContent}
                labelButton={section.labelButton}
              />
            ))}
          </Box>
        ))}
      </Animated>
    </ModuleViewport>
  );
}
