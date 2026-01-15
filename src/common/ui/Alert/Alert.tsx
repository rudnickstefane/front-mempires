import { Box, Typography } from "@mui/material";
import { CloseCircle, Danger, InfoCircle, TickCircle } from "iconsax-react";
import { ReactNode } from "react";

type AlertVariant = "warning" | "info" | "success" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: ReactNode;
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
    bg: "bg-error-100",
    text: "text-error-800",
    Icon: CloseCircle,
  },
};

export function Alert({ variant = "warning", title, message }: AlertProps) {
  const { bg, text, Icon } = styles[variant];

  return (
    <Box className={`flex gap-3 rounded-2xl p-4 ${bg}`}>
      <Icon className={`min-h-6 min-w-6 ${text}`} />

      <Box className={`flex flex-col gap-2 ${text}`}>
        {title && (
          <Typography className="!font-poppins !text-base !font-semibold leading-6">
            {title}
          </Typography>
        )}

        <Typography className="!font-poppins !text-sm !font-normal leading-4">
          {message}
        </Typography>
      </Box>
    </Box>
  );
}
