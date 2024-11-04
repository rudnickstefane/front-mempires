import { Box, Button, Typography } from "@mui/material";
import { CgMenuRightAlt } from "react-icons/cg";
import { IconType } from "react-icons/lib";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiIdentificationCardThin } from "react-icons/pi";

interface ResourceBoxProps {
    icon: IconType;
    name: string;
    link: string;
}

const resources: ResourceBoxProps[] = [
    {
        icon: PiIdentificationCardThin,
        name: 'Descontos',
        link: '#',
    }
];

const ResourceBox = ({ icon: Icon, name, link }: ResourceBoxProps) => (
    <Button
        startIcon={<Icon className='color-primary' />}
        className='font-poppins !text-[1rem] !rounded-none !px-5'
        style={{ textTransform: 'none', color: '#08041b', justifyContent: 'flex-start', height: '50px' }}
        sx={{
            fontWeight: 'light',
            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
            '&:hover': {
                background: '#f3f3f3'
            },
        }}
        href={link}
    >
        {name}
    </Button>
);

export default function GymProgramManagement() {
    return (
        <Box className='flex flex-row bg-white rounded-3xl shadow-md w-full'>
            <Box className='flex flex-col w-[16rem] h-full py-5 bg-[#fbfbfb] rounded-l-3xl border-r-[1px] border-[##efefef]'>
                <Button
                    endIcon={<CgMenuRightAlt />}
                    className='font-poppins !text-[1rem] !rounded-none !px-5'
                    style={{ textTransform: 'none', color: '#08041b', justifyContent: 'space-between', height: '50px' }}
                    sx={{
                        fontWeight: 'light',
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                        '&:hover': {
                            background: '#f3f3f3'
                        },
                    }}>Navegue abaixo
                </Button>
                {resources.map((resource, index) => (
                    <ResourceBox
                        key={index}
                        icon={resource.icon}
                        name={resource.name}
                        link={resource.link}
                    />
                ))}
            </Box>
            <Box className='m-5'>
                <Box>
                    <Typography className='flex flex-row items-center !text-[1rem]'>Programas <MdKeyboardArrowRight />Incentivo</Typography>
                </Box>
            </Box>
        </Box>
    );
}
