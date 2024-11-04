import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { PiUserCircleLight } from 'react-icons/pi';
import admin from '../../../../../assets/svg/admin.svg';
import finance from '../../../../../assets/svg/finance.svg';
import home from '../../../../../assets/svg/home.svg';
import integration from '../../../../../assets/svg/integration.svg';
import notification from '../../../../../assets/svg/notification.svg';
import report from '../../../../../assets/svg/report.svg';
import settings from '../../../../../assets/svg/settings.svg';
import userHeart from '../../../../../assets/svg/user-heart.svg';
import '../../../../../input.css';
import { GymManagementType } from '../../../gym/types/gym-management.types';

interface ManagementGymHeaderProps {
    setActiveComponent: (component: GymManagementType) => void;
}

export function ManagementGymHeader({ setActiveComponent }: ManagementGymHeaderProps) {
    const [activeButton, setActiveButton] = useState<GymManagementType>('Home');

    const handleButtonClick = (component: GymManagementType) => {
        setActiveButton(component);
        setActiveComponent(component);
    };

    return (
        <Box className='flex flex-row w-full my-7 justify-between'>
            <Box className='flex flex-row'>
                <Button
                    onClick={() => handleButtonClick('Home')}
                    startIcon={<img src={home} className='w-5' />}
                    className='flex flex-row items-center font-poppins !text-[16px] !mr-1 !rounded-none'
                    style={{ textTransform: 'none', color: '#08041b' }}
                    sx={{
                        borderBottom: activeButton === 'Home' ? '2px solid #ff0336' : '2px solid #f8fafb',
                        fontWeight: 'light',
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                        '&:hover': {
                            borderBottom: '2px solid #ff0336',
                        },
                    }}>Início
                </Button>
                <Button
                    onClick={() => handleButtonClick('Admin')}
                    startIcon={<img src={admin} className='w-5' />}
                    className='flex flex-row items-center ml-5 font-poppins !text-[16px] !mx-1 !rounded-none'
                    style={{ textTransform: 'none', color: '#08041b' }}
                    sx={{
                        borderBottom: activeButton === 'Admin' ? '2px solid #ff0336' : '2px solid #f8fafb',
                        fontWeight: 'light',
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                        '&:hover': {
                            borderBottom: '2px solid #ff0336',
                        },
                    }}>Administrativo
                </Button>
                <Button
                    onClick={() => handleButtonClick('Finance')}
                    startIcon={<img src={finance} className='w-5' />}
                    className='flex flex-row items-center ml-5 font-poppins !text-[16px] !mx-1 !rounded-none'
                    style={{ textTransform: 'none', color: '#08041b' }}
                    sx={{
                        borderBottom: activeButton === 'Finance' ? '2px solid #ff0336' : '2px solid #f8fafb',
                        fontWeight: 'light',
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                        '&:hover': {
                            borderBottom: '2px solid #ff0336',
                        },
                    }}>Financeiro
                </Button>
                <Button
                    onClick={() => handleButtonClick('Integration')}
                    startIcon={<img src={integration} className='w-5' />}
                    className='flex flex-row items-center ml-5 font-poppins !text-[16px] !mx-1 !rounded-none'
                    style={{ textTransform: 'none', color: '#08041b' }}
                    sx={{
                        borderBottom: activeButton === 'Integration' ? '2px solid #ff0336' : '2px solid #f8fafb',
                        fontWeight: 'light',
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                        '&:hover': {
                            borderBottom: '2px solid #ff0336',
                        },
                    }}>Integrações
                </Button>
                <Button
                    onClick={() => handleButtonClick('Dashboard')}
                    startIcon={<img src={report} className='w-5' />}
                    className='flex flex-row items-center ml-5 font-poppins !text-base !mx-1 !rounded-none'
                    style={{ textTransform: 'none', color: '#08041b' }}
                    sx={{
                        borderBottom: activeButton === 'Dashboard' ? '2px solid #ff0336' : '2px solid #f8fafb',
                        fontWeight: 'light',
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                        '&:hover': {
                            borderBottom: '2px solid #ff0336',
                        },
                    }}>Relatórios
                </Button>
                <Button
                    onClick={() => handleButtonClick('Program')}
                    startIcon={<img src={userHeart} className='w-5' />}
                    className='flex flex-row items-center ml-5 font-poppins !text-base !mx-1 !rounded-none'
                    style={{ textTransform: 'none', color: '#08041b' }}
                    sx={{
                        borderBottom: activeButton === 'Program' ? '2px solid #ff0336' : '2px solid #f8fafb',
                        fontWeight: 'light',
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                        '&:hover': {
                            borderBottom: '2px solid #ff0336',
                        },
                    }}>Programas
                </Button>
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
