import { Box, Button } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { Edit, ExportSquare, Eye, EyeSlash } from "iconsax-react";
import { Show } from "../Show";

interface CardHeaderProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  iconClass?: string;
  variant?: string;
  gradient?: boolean;
  labelButton?: string;
  hasSensitiveData?: boolean;
  isVisible?: boolean;
  onToggleVisible?: () => void;
  noEdit?: boolean;
  onOpenContent?: () => void;
}

export const CardHeader = ({
  title,
  description,
  icon,
  iconClass,
  gradient,
  labelButton,
  hasSensitiveData,
  isVisible,
  onToggleVisible,
  noEdit,
  onOpenContent,
}: CardHeaderProps) => (
  <Show hidden={!title}>
    <Box className={`flex justify-between items-start gap-4 w-full`}>
      <Box
        className={`flex ${labelButton ? "flex-col" : "flex-row items-center"} ${gradient ? "text-white" : "text-rhino-950"} gap-3 w-full`}
      >
        {icon && (
          <Box
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClass || "bg-primary-50 text-primary"}`}
          >
            {icon}
          </Box>
        )}
        <Box className="flex flex-col">
          <Typography
            translateId={title}
            className={`${labelButton ? "text-base" : "text-lg"} font-semibold`}
          />
          {description && (
            <Typography
              translateId={description}
              className={`text-sm ${gradient ? "text-white/80" : "text-rhino-820"}`}
            />
          )}
        </Box>

        {labelButton && (
          <Typography
            translateId={labelButton}
            className={`text-sm flex flex-row gap-2 items-center ${gradient ? "text-white" : "text-primary"}`}
          >
            <ExportSquare type="linear" size={15} />
          </Typography>
        )}
      </Box>

      <Box className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        {hasSensitiveData && (
          <Button
            className="min-w-8 h-8 text-neutral-900 hover:text-primary transition-all p-0 bg-white hover:bg-neutral-100 hover:scale-105 rounded-lg mr-1"
            onClick={onToggleVisible}
          >
            {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
          </Button>
        )}
        {onOpenContent && !noEdit && !labelButton && (
          <Button
            className="min-w-8 h-8 text-neutral-900 hover:text-primary transition-all p-0 bg-white hover:bg-neutral-100 hover:scale-105 rounded-lg"
            onClick={onOpenContent}
          >
            <Edit size={22} variant="Linear" />
          </Button>
        )}
      </Box>
    </Box>
  </Show>
);
