import { Box } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { CloseCircle, Danger, InfoCircle, TickCircle } from "iconsax-react";
import { CustomContentProps } from "notistack";
import { forwardRef } from "react";
import { useIntl } from "react-intl";

interface MySnackbarProps extends CustomContentProps {
  title?: string;
}

export const SnackbarContent = forwardRef<HTMLDivElement, MySnackbarProps>(
  ({ message, variant, title }, ref) => {
    const intl = useIntl();

    const translate = (id?: string) => {
      if (!id) return id;
      return intl.formatMessage({ id, defaultMessage: id });
    };

    const variantStyles = {
      success: {
        bg: "bg-success-50",
        iconBg: "bg-success-500",
        textColor: "text-success-700",
        defaultTitleId: "success",
        icon: <TickCircle size={18} variant="Linear" color="white" />,
      },
      error: {
        bg: "bg-danger-50",
        iconBg: "bg-danger-500",
        textColor: "text-danger-700",
        defaultTitleId: "error",
        icon: <CloseCircle size={18} variant="Linear" color="white" />,
      },
      info: {
        bg: "bg-info-50",
        iconBg: "bg-info-500",
        textColor: "text-info-700",
        defaultTitleId: "info",
        icon: <InfoCircle size={18} variant="Linear" color="white" />,
      },
      warning: {
        bg: "bg-warning-50",
        iconBg: "bg-warning-500",
        textColor: "text-warning-700",
        defaultTitleId: "warning",
        icon: <Danger size={18} variant="Linear" color="white" />,
      },
    };

    const style =
      variantStyles[variant as keyof typeof variantStyles] ||
      variantStyles.info;

    const displayTitle = title
      ? translate(title)
      : intl.formatMessage({ id: style.defaultTitleId });

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
            translateId={displayTitle}
            className={`${style.textColor} font-manrope font-semibold text-base leading-tight`}
          />
          <Typography
            translateId={typeof message === "string" ? message : ""}
            className="text-neutral-700 text-sm mt-0.5 font-manrope"
          />
        </Box>
      </Box>
    );
  },
);

SnackbarContent.displayName = "SnackbarContent";
