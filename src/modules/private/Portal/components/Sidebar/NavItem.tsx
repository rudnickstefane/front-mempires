import { Box, Button, Tooltip } from "@mui/material";
import { iconMap } from "@sr/common/constants/icon-map.const";
import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import { ElementType } from "react";
import { useTruncated } from "../../hooks";

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
  const isSub = variant === "sub";
  const { ref: textRef, isTruncated } = useTruncated([
    isCollapsed,
    isExpanded,
    name,
  ]);

  const Icon =
    typeof icon === "string" ? iconMap[icon as keyof typeof iconMap] : icon;
  const showTooltip = isCollapsed || (isSub && isTruncated);

  const styles = {
    button:
      isSelected && !isSub
        ? "!bg-primary !text-white"
        : isSelected && isSub
        ? "!bg-gray-100 !text-gray-700"
        : "!text-gray-500",
    hover: isSub
      ? "!w-[11.95rem] hover:!bg-gray-100 hover:!text-gray-700"
      : "hover:!bg-primary hover:!text-white",
    icon:
      isSelected && !isSub
        ? "text-white"
        : isSelected && isSub
        ? "text-gray-700"
        : "text-gray-500",
  };

  return (
    <Tooltip
      title={showTooltip ? name : ""}
      placement="right"
      arrow
      disableHoverListener={!showTooltip}
    >
      <Button
        onClick={onClick}
        fullWidth
        className={`!font-poppins !normal-case !transition-all !h-12 !rounded-xl !my-0.5 !px-5 
          ${styles.button} ${styles.hover} ${
          isCollapsed
            ? "!w-[5.2rem] !justify-center"
            : "!w-[13.5rem] !justify-between"
        } group`}
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
              className={`${styles.icon} ${
                !isSub ? "group-hover:text-white" : "group-hover:text-gray-700"
              } min-w-5`}
            />
          )}

          {!isCollapsed && (
            <Box
              ref={textRef}
              className="truncate text-[0.95rem] font-normal !mt-[.1rem]"
            >
              {name}
            </Box>
          )}
        </Box>

        {hasSubMenu && (
          <Box
            className={`transition-all duration-300 ${
              isCollapsed ? "-mr-1.5 ml-3" : ""
            }`}
          >
            {isExpanded ? <ArrowDown2 size={18} /> : <ArrowRight2 size={18} />}
          </Box>
        )}
      </Button>
    </Tooltip>
  );
};
