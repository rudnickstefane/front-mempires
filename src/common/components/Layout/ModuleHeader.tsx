import { Box, IconButton, Skeleton } from "@mui/material";
import { Breadcrumbs } from "@sr/common/iu/components/Breadcrumbs/Breadcrumbs";
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
  loading?: boolean;
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
  const { stack, pop } = useNavigationStore();
  const activeModule = stack[stack.length - 1];
  const config = modulesRegistry[activeModule];

  const handleBackTo = (index: number) => {
    const diff = stack.length - 1 - index;
    for (let i = 0; i < diff; i++) {
      pop();
    }
  };

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
          {props.loading ? (
            <Skeleton
              variant="text"
              animation="wave"
              style={{ width: `100%` }}
              className="h-12"
            />
          ) : (
            <Typography
              translateId={props.title ? props.title : config?.title}
              className="flex flex-row items-center text-[32px] mb-0 text-rhino-950 font-manrope font-semibold"
            />
          )}
          <Box className="flex flex-row items-center gap-1">
            {props.onBack && !config?.subtitle ? (
              <Breadcrumbs
                stack={stack}
                modulesRegistry={modulesRegistry}
                handleBackTo={handleBackTo}
              />
            ) : (
              <Typography
                translateId={config?.subtitle || config?.description}
                className="text-rhino-850 text-sm"
              />
            )}
          </Box>
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
