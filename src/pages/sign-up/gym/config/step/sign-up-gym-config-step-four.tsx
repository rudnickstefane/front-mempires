import { Box, Button, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import { PiBarbellBold } from 'react-icons/pi';
import { useGymConfigFormStepFour } from '../../../../../hooks/use-gym-config-form-step-four';
import { StepFourProps } from '../../types/gym-steps.types';

export const StepFour = ({ formData, setFormData, handleContinue, handleBack }: StepFourProps) => {

    const {
        modalities,
        handleCheckboxChange
    } = useGymConfigFormStepFour(formData, setFormData);

    const half = Math.ceil(modalities.length / 2);
    const leftModalities = modalities.slice(0, half);
    const rightModalities = modalities.slice(half);

    const onContinue = () => {
        handleContinue();
    };

    return (
        <Box className='flex flex-col w-[80vw]'>
            <Box className='w-full rounded-lg shadow-lg bg-white p-6 md:p-10'>
                <Box className='flex justify-start items-center'>
                    <PiBarbellBold className='w-[30px] h-[30px] text-[#424242]' />
                    <Box className='text-2xl ml-[1vw] text-[#424242]'>Modalidades</Box>
                </Box>
                <Divider className='!my-5' />
                <Box className='flex w-full flex-wrap'>
                    {/* Lado Esquerdo */}
                    <Box className='w-1/2 pr-10'>
                        {leftModalities.map((modality, index) => (
                            <Box key={index} className='mb-3'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.selectedModalities?.includes(modality.name) || false}
                                            onChange={(event) => handleCheckboxChange(event, modality.name)}
                                        />
                                    }
                                    label={modality.name}
                                />
                                <Typography className='!text-[14px]'>{modality.description}</Typography>
                            </Box>
                        ))}
                    </Box>
                    {/* Lado Direito */}
                    <Box className='w-1/2 pl-10'>
                        {rightModalities.map((modality, index) => (
                            <Box key={index} className='mb-3'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.selectedModalities?.includes(modality.name) || false}
                                            onChange={(event) => handleCheckboxChange(event, modality.name)}
                                        />
                                    }
                                    label={modality.name}
                                />
                                <Typography className='!text-[14px]'>{modality.description}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box className='flex flex-row justify-between mt-5'>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBack}
                        sx={{
                            backgroundColor: '#4b5563',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#3b4a57',
                            },
                        }}
                    >
                        Voltar
                    </Button>
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
                        Continuar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};