import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ResourceBoxProps } from "../../types/gym-resource-box.types";
import GroupsGymAdmin from "./GroupsGymAdmin";
import HoursGymAdmin from "./HoursGymAdmin";
import { HomeGymAdminType } from "./types/AdminGym.types";
import UsersGymAdmin from "./UsersGymAdmin";

const subResources: ResourceBoxProps[] = [
    {
        icon: MdKeyboardArrowRight,
        type: 'Users',
        menu: 'Settings',
        name: 'Usuários',
        description: 'Usuários',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'Groups',
        menu: 'Settings',
        name: 'Grupos de Acesso',
        description: 'Grupos de <span class="color-primary">Acesso</span>',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'Hours',
        menu: 'Settings',
        name: 'Funcionamento',
        description: 'Horário de <span class="color-primary">Funcionamento</span>',
    },
];

const SubResourceBox = ({ icon: Icon, name, onClick, isSelected }: ResourceBoxProps & { onClick: () => void, isSelected: boolean }) => (
    <Button
        endIcon={<Icon />}
        className='font-poppins !text-[1rem] !px-5 !rounded-xl !mt-4'
        style={{
            textTransform: 'none',
            textAlign: 'left',
            color: '#08041b',
            justifyContent: 'space-between',
            height: '50px',
            background: isSelected ? '#f6fbef' : 'transparent',
        }}
        sx={{
            fontWeight: 'light',
            transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
            '&:hover': {
                background: '#f6fbef !important'
            },
        }}
        onClick={onClick}
    >
        {name}
    </Button>
);

const renderComponents: { [key in HomeGymAdminType]: React.ComponentType } = {
    Users: UsersGymAdmin,
    Groups: GroupsGymAdmin,
    Hours: HoursGymAdmin
};

export default function SettingsGymAdmin() {
    const [selectedType, setSelectedType] = useState<HomeGymAdminType>('Users'); // Default to 'Visits'
    
    const relationshipResources = subResources.filter(resource => resource.menu === 'Settings');
    const SelectedComponent = renderComponents[selectedType];

    return (
        <Box>
            <Box className="overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]">
                <Box className="flex flex-row w-full">
                    <Box className="bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]">
                        <Box className='flex flex-row'>
                            <Box className='flex flex-col min-w-[13.5rem] h-full mr-0'>
                                <Typography className='flex flex-row items-center !text-[.75rem] !m-3 !mb-0 uppercase'>
                                    Configurações
                                </Typography>
                                {relationshipResources.map((resource) => (
                                    <SubResourceBox
                                        key={resource.type}
                                        {...resource}
                                        onClick={() => setSelectedType(resource.type as HomeGymAdminType)}
                                        isSelected={selectedType === resource.type}
                                    />
                                ))}
                            </Box>
                            <Box className="w-full pl-5">
                                <SelectedComponent />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}