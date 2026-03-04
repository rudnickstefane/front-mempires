import { Box, IconButton } from "@mui/material";
import { Button } from "@sr/common/iu/components/Button";
import { Typography } from "@sr/common/iu/components/Typography";
import { Animated } from "@sr/common/ui/motion/Animated";
import { modulesRegistry } from "@sr/modules/private/Portal/config/navigation.const";
import { useNavigationStore } from "@sr/store";
import { Add, ArrowLeft } from "iconsax-react";

export type ModuleHeaderProps = {
  showButton?: boolean;
  labelButton?: string;
  onBack?: boolean;
  refresh?: () => Promise<void>;
};

export function ModuleHeader({
  showButton,
  labelButton,
  onBack,
}: Readonly<ModuleHeaderProps>) {
  const activeModule = useNavigationStore((state) => state.getActiveModule());
  const config = modulesRegistry[activeModule];

  const pop = useNavigationStore((state) => state.pop);

  return (
    <Animated
      variant="header"
      className="w-full flex flex-row items-center justify-between mb-9 mt-2"
    >
      <Box className="flex flex-row gap-4 items-center">
        {onBack && (
          <IconButton
            onClick={() => pop()}
            className="hover:!bg-primary-100 w-10 h-10 !rounded-lg !text-rhino-950 "
          >
            <ArrowLeft size={22} />
          </IconButton>
        )}
        <Box>
          <Typography
            translateId={config?.title}
            className="flex flex-row items-center text-[32px] mb-0 text-rhino-950 font-manrope font-semibold"
          />
          <Typography
            translateId={config?.subtitle}
            className="text-rhino-850 flex flex-row items-center text-sm font-manrope"
          />
        </Box>
      </Box>
      <Box>
        {showButton && (
          <Button
            fullWidth
            // onClick={handleStartSetup}
            startIcon={<Add variant="Linear" size={21} />}
            className="py-3 px-4 text-base bg-primary text-white hover:bg-primary-500/90"
            translateId={labelButton}
          />
        )}
      </Box>
    </Animated>
  );
}
