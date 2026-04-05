import { Box, IconButton } from "@mui/material";
import { Button } from "@sr/common/iu/components/Button";
import { notify } from "@sr/common/iu/components/notifications";
import { Typography } from "@sr/common/iu/components/Typography";
import { Animated } from "@sr/common/ui/motion/Animated";
import { modulesRegistry } from "@sr/modules/private/Portal/config/navigation.const";
import { useNavigationStore } from "@sr/store";
import { Add, ArrowLeft, Copy, TickSquare } from "iconsax-react";
import { useState } from "react";
import { Switch } from "../Switch";

export type ModuleHeaderProps = {
  title?: string;
  copyTitle?: string;
  codeCopy?: string;
  showStatus?: boolean;
  checked?: boolean;
  showButton?: boolean;
  labelButton?: string;
  onBack?: boolean;
  onClick?: () => Promise<void>;
  refresh?: () => Promise<void>;
};

export function ModuleHeader({ ...props }: Readonly<ModuleHeaderProps>) {
  const activeModule = useNavigationStore((state) => state.getActiveModule());
  const config = modulesRegistry[activeModule];

  const pop = useNavigationStore((state) => state.pop);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.codeCopy!);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);

      notify.success("Código copiado.");
    } catch (err) {
      const msg = "Ocorreu um erro ao copiar o código.";
      notify.error(msg);
    }
  };

  return (
    <Animated
      variant="header"
      className="w-full flex flex-row items-center justify-between mb-9 mt-2"
    >
      <Box className="flex flex-row gap-4 items-center">
        {props.onBack && (
          <IconButton
            onClick={() => pop()}
            className="hover:bg-primary-100 w-10 h-10 rounded-lg !text-rhino-950 "
          >
            <ArrowLeft size={22} />
          </IconButton>
        )}
        <Box>
          <Typography
            translateId={props.title ? props.title : config?.title}
            className="flex flex-row items-center text-[32px] mb-0 text-rhino-950 font-manrope font-semibold"
          />
          <Typography
            translateId={config?.subtitle}
            className="text-rhino-850 flex flex-row items-center text-sm font-manrope"
          />
        </Box>
      </Box>
      <Box className="flex flex-row gap-4">
        {props.codeCopy && (
          <Button
            variant="outlined"
            onClick={handleCopy}
            className={`gap-2 rounded-lg font-bold hover:bg-muted/80 transition-colors text-sm text-primary h-12 ${
              copied
                ? "!bg-success-50 !border-success-500"
                : " !border-neutral-200"
            }`}
          >
            <Typography
              translateId={props.copyTitle}
              className="text-xs text-neutral-500 font-manrope"
            />
            {props.codeCopy}
            {copied ? (
              <TickSquare
                size={17}
                variant="Bold"
                className="text-success-500"
              />
            ) : (
              <Copy type="linear" size={17} className="text-neutral-500" />
            )}
          </Button>
        )}
        {props.showStatus && (
          <Switch withLabels checked={props.checked} onChange={props.onClick} />
        )}
        {props.showButton && (
          <Button
            fullWidth
            onClick={props.onClick}
            startIcon={<Add variant="Linear" size={21} />}
            className="py-3 px-4 text-base bg-primary text-white hover:bg-primary-500/90"
            translateId={props.labelButton}
          />
        )}
      </Box>
    </Animated>
  );
}
