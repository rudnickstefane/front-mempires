import { Box, Button, Skeleton } from '@mui/material';
import { useState } from 'react';
import { PiUserCircleLight } from 'react-icons/pi';
import notification from '../../../../../assets/svg/notification.svg';
import settings from '../../../../../assets/svg/settings.svg';
import '../../../../../input.css';
import { useGymData } from '../../pages/Gym/hooks/dbHome';
import { GymManagementType } from '../../pages/Gym/types/gym-management.types';
import { RoutesIcons } from './RoutesIcons';

interface ManagementGymHeaderProps {
    setActiveComponent: (component: GymManagementType) => void;
}

interface Route {
    id: number;
    type: string;
    name: string;
    button: GymManagementType;
    route: string;
}

export function ManagementGymHeader({ setActiveComponent }: ManagementGymHeaderProps) {
    const [activeButton, setActiveButton] = useState<GymManagementType>('Home');

    const { data: routes, loading } = useGymData<Route[]>('http://localhost:5000/RoutesManagement');
    
    const handleButtonClick = (component: GymManagementType) => {
        setActiveButton(component);
        setActiveComponent(component);
    };

    return (
        <Box className='flex flex-row w-full my-7 justify-between'>
            <Box className='flex flex-row'>
                {loading ? (
                    routes?.map((_, index) => (
                        <Box className="flex flex-row items-center mr-5 mb-1">
                            <Skeleton
                                key={index}
                                variant="circular"
                                animation="wave"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            <Skeleton
                                key={index}
                                variant="text"
                                animation="wave"
                                width={88}
                                height={38}
                            />
                        </Box>
                    ))
                ) : (
                    routes?.map((route) => (
                        <Button
                            key={route.id}
                            onClick={() => handleButtonClick(route.button)}
                            startIcon={<img src={RoutesIcons[route.button as keyof typeof RoutesIcons]} style={{ width: '1.25rem'}} alt={route.name}/>}
                            className='flex flex-row items-center ml-5 font-poppins !text-[16px] !mx-1 !rounded-none'
                            style={{ textTransform: 'none', color: '#08041b' }}
                            sx={{
                                borderBottom: activeButton === route.button ? '2px solid #ff0336' : '2px solid #f8fafb',
                                fontWeight: 'light',
                                transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
                                '&:hover': {
                                    borderBottom: '2px solid #ff0336',
                                },
                            }}
                        >{route.name}</Button>
                    ))
                )
                }
            </Box>
            <Box className='flex flex-row items-center'>
                <Button
                    className='flex flex-row items-center font-poppins !min-w-5 !mx-1 !rounded-full !min-h-9'
                    style={{ color: '#08041b' }}>
                    <img src={notification} className='w-5' />
                </Button>
                <Button
                    className='flex flex-row items-center font-poppins !text-[1.3rem] !min-w-5 !ml-1 !rounded-full !min-h-9'
                    style={{ color: '#08041b' }}>
                    <img src={settings} className='w-5' />
                </Button>
                <Button
                    onClick={() => handleButtonClick('Profile')}
                    className='flex flex-row items-center font-poppins !text-[1.3rem] !min-w-5 !ml-1 !rounded-full !min-h-9'
                    style={{ color: '#08041b' }}>
                    <PiUserCircleLight className='w-5' />
                </Button>
            </Box>
        </Box>
    );
}
