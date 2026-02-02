import { Box, Button, IconButton } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { Animated } from "@sr/common/ui/motion/Animated";
import { modulesRegistry } from "@sr/modules/private/Portal/config/navigation.const";
import { useNavigationStore } from "@sr/store";
import { ArrowLeft } from "iconsax-react";
import { PiUserPlus } from "react-icons/pi";

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
            startIcon={<PiUserPlus />}
            variant="contained"
            color="primary"
            style={{
              color: "white",
              fontFamily: "Poppins",
              width: "12.5rem",
              height: "3rem",
            }}
            sx={{
              background: "#ff0336",
              transition: "transform 0.3s, background-color 0.3s",
              "&:hover": {
                background: "#FF0000",
              },
            }}
            // onClick={() => openDrawer("StudentRegister")}
          >
            {labelButton}
          </Button>
        )}
      </Box>
    </Animated>
  );
}
