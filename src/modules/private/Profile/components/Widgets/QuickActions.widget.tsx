import { Box } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { Animated } from "@sr/common/ui/motion";
import { RendererModulesType } from "@sr/modules/private/Portal/pages/home/types/gym-management.types";
import { Setting2, ShieldSecurity } from "iconsax-react";
import { JSX } from "react";

export type ContactsPropss = {
  onNavigate: (module: RendererModulesType) => void;
};

export function QuickActions({ onNavigate }: ContactsPropss) {
  const actions: Array<{
    id: RendererModulesType;
    icon: JSX.Element;
    label: string;
    description: string;
    color: string;
  }> = [
    {
      id: "Security",
      icon: <ShieldSecurity variant="Bulk" size={22} />,
      label: "Segurança",
      description: "Gerenciar acesso",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      id: "Settings",
      icon: <Setting2 variant="Bulk" size={22} />,
      label: "Configurações",
      description: "Preferências",
      color: "bg-orange-500/10 text-orange-600",
    },
  ];

  return (
    <Animated variant="container" className="grid grid-cols-2 gap-3 mt-4">
      {actions.map((action) => (
        <Animated
          key={action.id}
          as="button"
          onClick={() => onNavigate(action.id)}
          variant="itemScale"
          isChild
          className="flex items-center gap-3 p-4 border-0 rounded-xl bg-neutral-100/70 hover:bg-neutral-200/50 text-left group transition-all duration-300 hover:!scale-[1.03] hover:cursor-pointer"
        >
          <Box
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}
          >
            {action.icon}
          </Box>
          <Box>
            <Typography
              translateId={action.label}
              className="font-manrope text-sm"
            />
            <Typography
              translateId={action.description}
              className="text-xs font-manrope text-neutral-500"
            />
          </Box>
        </Animated>
      ))}
    </Animated>
  );
}
