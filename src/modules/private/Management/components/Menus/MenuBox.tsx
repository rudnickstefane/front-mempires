import { Box, Button } from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { iconMap } from "../../../../common/ui/Icons/IconsMap";
import { ResourceBoxProps } from "../../pages/Gym/types/gym-resource-box.types";

const MenuBox = ({
    icon,
    name,
    onClick,
    isSelected,
    isMenuCollapsed,
    hasSubMenu,
    isExpanded,
}: ResourceBoxProps & { onClick: () => void; isSelected: boolean; isExpanded: boolean }) => {
    const Icon = iconMap[icon];

    return (
        <Button
            startIcon={!isMenuCollapsed && Icon ? <Icon className="!text-[1.5rem] w-[20px] h-[20px]" /> : null}
            endIcon={
                hasSubMenu ? (
                    isExpanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />
                ) : null
            }
            className="font-poppins !text-[1rem] !rounded-xl !px-5 !mx-5"
            style={{
                textTransform: "none",
                width: isMenuCollapsed ? '5.2rem' : '13.5rem',
                color: isSelected ? "#ff0336" : "#08041b",
                justifyContent: isMenuCollapsed ? "center" : "flex-start",
                height: "50px",
                transition: 'width 0.3s ease',
            }}
            sx={{
                fontWeight: "light",
                transition: "transform 0.3s, background-color 0.3s, color 0.3s",
                "&:hover": {
                    background: "#f3f3f3 !important",
                    color: "#ff0336 !important",
                },
            }}
            onClick={onClick}
        >
            {isMenuCollapsed ? (
                Icon && <Icon className="w-[20px] h-[20px]" />
            ) : (
                <Box className="transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis">{name}</Box>
            )}
        </Button>
    );
};

export default MenuBox;
