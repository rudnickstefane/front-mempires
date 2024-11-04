import { Box, Button, Typography } from '@mui/material';
import { GiMuscleFat } from "react-icons/gi";
import { StepFiveProps } from '../../types/gym-steps.types';

export const StepFinished = ({ handleContinue }: StepFiveProps) => {

    const onContinue = () => {
        handleContinue();
    };

    return (
        <Box className='flex flex-col w-[80vw]'>
            <Box className='w-full rounded-lg shadow-lg bg-white p-6 md:p-10'>
                <Box className='w-full'>
                    <Box className='w-full flex flex-col'>
                        <Box className='w-full flex flex-row flex-wrap items-center justify-center'>
                            <Box className='md:w-[70%] w-full mt-6 md:mt-0'>
                                <Box className='flex items-center justify-start'>
                                    <Typography className='!text-[2.5rem] !font-bold text-[#424242]'>Parabéns!<br />Você completou seu cadastro.</Typography>
                                </Box>
                                <Box className='mt-[1.56vh]'>
                                    <Typography className=''>Você poderá alterar seus dados a qualquer momento acessando o seu cadastro.</Typography>
                                </Box>
                            </Box>
                            <Box className='md:w-[20%] w-full mt-6 md:mt-0'>
                                <Box className='flex items-center justify-start'>
                                    <GiMuscleFat className='text-[7rem] text-[#ff0336]' />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className='flex flex-row justify-center mt-10'>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onContinue}
                        sx={{
                            backgroundColor: '#ff0336',
                            color: '#fff',
                            height: '3rem',
                            '&:hover': {
                                backgroundColor: '#e6001b',
                            },
                        }}
                    >
                        Acessar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};