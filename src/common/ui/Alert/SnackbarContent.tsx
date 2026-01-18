import { Box, Typography } from "@mui/material";
import { CloseCircle, Danger, InfoCircle, TickCircle } from "iconsax-react";
import { CustomContentProps } from "notistack";
import { forwardRef } from "react";

export const SnackbarContent = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ message, variant }, ref) => {
    const variantStyles = {
      success: {
        bg: "bg-success-50",
        iconBg: "bg-success-500",
        textColor: "text-success-700",
        icon: <TickCircle size={18} variant="Linear" color="white" />,
      },
      error: {
        bg: "bg-danger-50",
        iconBg: "bg-danger-500",
        textColor: "text-danger-700",
        icon: <CloseCircle size={18} variant="Linear" color="white" />,
      },
      info: {
        bg: "bg-info-50",
        iconBg: "bg-info-500",
        textColor: "text-info-700",
        icon: <InfoCircle size={18} variant="Linear" color="white" />,
      },
      warning: {
        bg: "bg-warning-50",
        iconBg: "bg-warning-500",
        textColor: "text-warning-700",
        icon: <Danger size={18} variant="Linear" color="white" />,
      },
    };

    const style =
      variantStyles[variant as keyof typeof variantStyles] ||
      variantStyles.info;

    return (
      <Box
        ref={ref}
        className={`flex flex-row py-4 px-5 rounded-xl ${style.bg} shadow-lg min-w-[320px] max-w-[600px] transition-all notification show`}
        role="alert"
      >
        <Box
          className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-full ${style.iconBg} shadow-sm`}
        >
          {style.icon}
        </Box>
        <Box className="ml-3 flex flex-col justify-center">
          <Typography
            variant="subtitle2"
            className={`${style.textColor} !font-poppins !font-semibold !text-[15px] leading-tight`}
          >
            {variant === "success" && "Sucesso"}
            {variant === "error" && "Erro"}
            {variant === "info" && "Informação"}
            {variant === "warning" && "Atenção"}
          </Typography>
          <Typography
            variant="body2"
            className="text-neutral-700 !text-[13px] mt-0.5 !font-poppins"
          >
            {message}
          </Typography>
        </Box>
      </Box>
    );
  }
);

SnackbarContent.displayName = "SnackbarContent";
