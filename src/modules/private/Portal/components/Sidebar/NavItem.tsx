import { Box, Button, Tooltip } from "@mui/material";
import { iconMap } from "@sr/common/constants/icon-map.const";
import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import { ElementType } from "react";

interface NavItemProps {
  name: string;
  icon?: ElementType | string;
  onClick: () => void;
  isSelected?: boolean;
  isCollapsed?: boolean;
  isExpanded?: boolean;
  hasSubMenu?: boolean;
  variant?: "main" | "sub";
}

export const NavItem = ({
  name,
  icon,
  onClick,
  isSelected,
  isCollapsed,
  isExpanded,
  hasSubMenu,
  variant = "main",
}: NavItemProps) => {
  const Icon =
    typeof icon === "string" ? iconMap[icon as keyof typeof iconMap] : icon;
  const isSub = variant === "sub";

  return (
    <Tooltip title={isCollapsed ? name : ""} placement="right" arrow>
      <Button
        onClick={onClick}
        fullWidth
        className={`font-poppins !normal-case !transition-all !h-12 !rounded-xl !my-0.5 !px-5
          ${
            isSelected && !isSub
              ? "!bg-[var(--color-primary)] !text-white"
              : "!text-gray-500"
          }
          ${isSelected && isSub ? "!bg-gray-100" : ""}
          ${isCollapsed ? "!justify-center" : "!justify-between"}
          hover:!bg-[var(--color-primary)] hover:!text-white group
        `}
      >
        <Box
          className={`flex items-center gap-3 min-w-0 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          {Icon && (
            <Icon
              size={20}
              variant="Linear"
              className={`${
                isSelected && !isSub ? "text-white" : "text-gray-500"
              } group-hover:text-white`}
            />
          )}

          {!isCollapsed && (
            <Box className="truncate text-[0.95rem] font-normal !mt-[.1rem]">
              {name}
            </Box>
          )}
        </Box>

        {!isCollapsed &&
          hasSubMenu &&
          (isExpanded ? <ArrowDown2 size={18} /> : <ArrowRight2 size={18} />)}
      </Button>
    </Tooltip>
  );
};
