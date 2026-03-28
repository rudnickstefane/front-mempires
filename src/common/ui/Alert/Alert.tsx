import { Box } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { AlertVariant } from "@sr/common/types";
import { CloseCircle, Danger, InfoCircle, TickCircle } from "iconsax-react";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: React.ReactNode;
  className?: string;
}

const styles = {
  warning: {
    bg: "bg-warning-100",
    text: "text-warning-800",
    Icon: Danger,
  },
  info: {
    bg: "bg-info-100",
    text: "text-info-800",
    Icon: InfoCircle,
  },
  success: {
    bg: "bg-success-100",
    text: "text-success-800",
    Icon: TickCircle,
  },
  error: {
    bg: "bg-danger-100",
    text: "text-danger-800",
    Icon: CloseCircle,
  },
};

export function Alert({
  variant = "warning",
  title,
  message,
  className,
}: AlertProps) {
  const { bg, text, Icon } = styles[variant];

  return (
    <Box
      className={`flex ${title ? "" : "items-center"} gap-3 rounded-2xl p-4 ${bg} ${className}`}
    >
      <Icon className={`min-h-6 min-w-6 ${text}`} />

      <Box className={`flex flex-col gap-2 ${text}`}>
        {title && (
          <Typography className="font-manrope text-base font-semibold leading-6">
            {title}
          </Typography>
        )}

        <Typography className="font-manrope !text-sm leading-4 text-left">
          {message}
        </Typography>
      </Box>
    </Box>
  );
}
