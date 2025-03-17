import { Box, Button } from "@mui/material";
import { iconMap } from "../../../../common/ui/Icons/IconsMap";
import { ResourceBoxProps } from "../../pages/Gym/types/gym-resource-box.types";

const SubMenuBox = ({
    icon,
    name,
    onClick,
    isSelected,
    isMenuCollapsed,
}: ResourceBoxProps & { onClick: () => void; isSelected: boolean }) => {
    const Icon = iconMap[icon];

    return (
        <Button
            startIcon={!isMenuCollapsed && Icon ? <Icon className="color-primary w-[20px] h-[20px]" /> : null}
            className="font-poppins !text-[1rem] !px-5 !rounded-xl !mx-5 !my-1"
            style={{
                textTransform: "none",
                width: isMenuCollapsed ? '5.2rem' : '13.5rem',
                color: '#08041b',
                justifyContent: isMenuCollapsed ? 'center' : 'flex-start',
                height: "50px",
                background: isSelected ? '#f3f3f3' : 'transparent',
                transition: 'width 0.3s ease',
            }}
            sx={{
                fontWeight: 'light',
                transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
                '&:hover': {
                    background: '#f3f3f3 !important'
                },
            }}
            onClick={onClick}
        >
            {isMenuCollapsed ? (
                Icon && <Icon className="color-primary w-[20px] h-[20px]" />
            ) : (
                <Box className="transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis">{name}</Box>
            )}
        </Button>
    );
};

export default SubMenuBox;
