import { Box, Button } from "@mui/material";
import { iconMap } from "@sr/common/constants/icon-map.const";
import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import { ResourceBoxProps } from "../../pages/Gym/types/gym-resource-box.types";

const MenuBox = ({
  icon,
  name,
  onClick,
  isSelected,
  isMenuCollapsed,
  hasSubMenu,
  isExpanded,
}: ResourceBoxProps & {
  onClick: () => void;
  isSelected: boolean;
  isExpanded: boolean;
}) => {
  const Icon = iconMap[icon as unknown as keyof typeof iconMap];

  return (
    <Button
      className="font-poppins !text-[1rem] !rounded-xl !px-5 !mx-5 !my-1 !transition-all"
      style={{
        textTransform: "none",
        width: isMenuCollapsed ? "5.2rem" : "13.5rem",
        color: isSelected ? "#fff" : "#6B6F7B",
        background: isSelected ? "#4c0cfd" : "#fff",
        justifyContent: isMenuCollapsed ? "center" : "space-between",
        height: "50px",
        transition: "width 0.3s ease",
      }}
      sx={{
        fontWeight: "light",
        transition: "transform 0.3s, background-color 0.3s, color 0.3s",
        "&:hover": {
          background: "#4c0cfd !important",
          color: "#fff !important",
        },
      }}
      onClick={onClick}
    >
      {/* LADO ESQUERDO */}
      <Box className="flex items-center gap-3 min-w-0">
        {Icon && (
          <Icon
            size={20}
            variant="Linear"
            className={isSelected ? "text-white" : ""}
          />
        )}

        {!isMenuCollapsed && (
          <Box className="whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </Box>
        )}
      </Box>

      {/* LADO DIREITO */}
      {!isMenuCollapsed &&
        hasSubMenu &&
        (isExpanded ? (
          <ArrowDown2 size={20} variant="Linear" />
        ) : (
          <ArrowRight2 size={20} variant="Linear" />
        ))}
    </Button>
  );
};

export default MenuBox;
