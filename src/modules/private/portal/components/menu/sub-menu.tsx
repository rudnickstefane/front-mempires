import { Box, Button, Divider } from "@mui/material";
import { iconMap } from "@sr/common/constants/icon-map.const";
import { ResourceBoxProps } from "../../pages/home/types/gym-resource-box.types";

const SubMenu = ({
  icon,
  name,
  onClick,
  isSelected,
  isMenuCollapsed,
}: ResourceBoxProps & { onClick: () => void; isSelected: boolean }) => {
  const Icon = iconMap[icon as unknown as keyof typeof iconMap];

  return (
    <Box>
      <Button
        startIcon={
          !isMenuCollapsed && Icon ? (
            <Icon className="w-[20px] h-[20px]" variant="Linear" />
          ) : null
        }
        className="font-poppins !text-[1rem] !px-5 !rounded-xl !my-1"
        style={{
          textTransform: "none",
          width: isMenuCollapsed ? "5.2rem" : "13.5rem",
          color: isSelected ? "#6B6F7B" : "#6B6F7B",
          justifyContent: isMenuCollapsed ? "center" : "flex-start",
          height: "50px",
          background: isSelected ? "#f3f3f3" : "transparent",
          transition: "width 0.3s ease",
        }}
        sx={{
          fontWeight: "light",
          transition: "transform 0.3s, background-color 0.3s, color 0.3s",
          "&:hover": {
            background: "#f3f3f3 !important",
          },
        }}
        onClick={onClick}
      >
        {isMenuCollapsed ? (
          Icon && <Icon className="color-primary w-[20px] h-[20px]" />
        ) : (
          <Box className="transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </Box>
        )}
      </Button>
      <Divider className="!my-1" />
    </Box>
  );
};

export default SubMenu;
