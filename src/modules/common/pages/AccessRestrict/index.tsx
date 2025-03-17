import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { TbLockOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../../modules/assets/images/icon.png';
import { AccessRestrictProps } from "../../types";

export const AccessRestrict: React.FC<AccessRestrictProps> = ({ isAuthorized, children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <Box className='w-full absolute flex flex-col justify-center items-center h-full'>
                <Box className='flex flex-row w-[147px] justify-between items-center mb-2 !-ml-5'>
                    <img src={logo} alt="Logo" className='w-[3.7rem]' />
                    <Box className='ml-3 text-[2rem] color-primary font-intro mt-[.34rem]'>iFlex</Box>
                </Box>
                <LinearProgress
                className='!bg-[#ff03352f] absolute w-28 rounded-xl'
                sx={{ 
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#ff0336',
                    }
                }} 
                />
            </Box>
        );
    }
    
    if (!isAuthorized) {
        return (
            <Box className='flex items-center justify-center w-full h-full absolute'>
                <Box className='flex flex-row w-[70%] justify-between items-center'>
                    <Box className='flex flex-col'>
                        <Link to="/">
                            <Box className='flex w-[161px] items-center'>
                                <img src={logo} alt="Logo" className='w-[3.7rem]' />
                                <Box className='ml-3 text-[2rem] color-primary font-intro mt-[.34rem]'>iFlex</Box>
                            </Box>
                        </Link>
                        <Typography variant="h4" className='text-[#282929]'>Acesso restrito.</Typography>
                        <Box className="flex flex-col mt-5">
                            <Typography>Lamentamos, mas o acesso a esta área está restrito no momento.</Typography>
                            <Typography>O conteúdo que você está tentando acessar está disponível apenas para usuários autorizados ou requer permissões especiais.</Typography>
                            <Typography className='!mt-5'>Caso você acredite que deveria ter acesso, por favor, entre em contato com nossa equipe de suporte.</Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                className='w-[15rem] !mt-5'
                                endIcon={<MdOpenInNew />}
                                onClick={() => navigate('/')}
                                sx={{
                                backgroundColor: 'transparent',
                                color: '#4b5563',
                                borderColor: '#4b5563',
                                height: '3rem',
                                '&:hover': {
                                    backgroundColor: '#d4d4d8',
                                    borderColor: '#4b5563',
                                },
                                }}
                            >
                                Ir para página Inicial
                            </Button>
                        </Box>
                    </Box>
                    <Box className='ml-[5rem]'>
                        <TbLockOff className='text-[17rem] text-[#d7d7d8]'/>
                    </Box>
                </Box>
            </Box>
        );
    }

    return <>{children}</>;
};