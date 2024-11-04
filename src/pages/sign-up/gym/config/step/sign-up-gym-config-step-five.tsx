import { Box, Button, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import { MdMiscellaneousServices, MdSegment } from 'react-icons/md';
import { useGymConfigFormStepFive } from '../../../../../hooks/use-gym-config-form-step-five';
import { StepFiveProps } from '../../types/gym-steps.types';

export const StepFive = ({ formData, setFormData, handleContinue, handleBack }: StepFiveProps) => {

    const {
        services,
        segments,
        handleCheckboxChange
    } = useGymConfigFormStepFive(formData, setFormData);

    const onContinue = () => {
        handleContinue();
    };

    return (
        <Box className='flex flex-col w-[80vw]'>
            <Box className='w-full rounded-lg shadow-lg bg-white p-6 md:p-10'>
                <Box className='flex justify-start items-center'>
                    <MdMiscellaneousServices className='w-[30px] h-[30px] text-[#424242]' />
                    <Box className='text-2xl ml-[1vw] text-[#424242]'>Serviços</Box>
                </Box>
                <Divider className='!my-5' />
                <Box className='flex w-full flex-wrap'>
                    {/* Lado Esquerdo */}
                    <Box className='w-1/2 pr-10'>
                        {services.slice(0, Math.ceil(services.length / 2)).map((service, index) => (
                            <Box key={index} className='mb-3'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.selectedServices?.includes(service.name) || false}
                                            onChange={(event) => handleCheckboxChange(event, service.name, 'service')}
                                        />
                                    }
                                    label={service.name}
                                />
                                <Typography className='!text-[14px]'>{service.description}</Typography>
                            </Box>
                        ))}
                    </Box>
                    {/* Lado Direito */}
                    <Box className='w-1/2 pl-10'>
                        {services.slice(Math.ceil(services.length / 2)).map((service, index) => (
                            <Box key={index} className='mb-3'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.selectedServices?.includes(service.name) || false}
                                            onChange={(event) => handleCheckboxChange(event, service.name, 'service')}
                                        />
                                    }
                                    label={service.name}
                                />
                                <Typography className='!text-[14px]'>{service.description}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box className='flex justify-start items-center mt-10'>
                    <MdSegment className='w-[30px] h-[30px] text-[#424242]' />
                    <Box className='text-2xl ml-[1vw] text-[#424242]'>Segmentos</Box>
                </Box>
                <Divider className='!my-5' />
                <Box className='flex w-full flex-wrap'>
                    {/* Lado Esquerdo */}
                    <Box className='w-1/2 pr-10'>
                        {segments.slice(0, Math.ceil(segments.length / 2)).map((segment, index) => (
                            <Box key={index} className='mb-3'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.selectedSegments?.includes(segment.name) || false}
                                            onChange={(event) => handleCheckboxChange(event, segment.name, 'segment')}
                                        />
                                    }
                                    label={segment.name}
                                />
                                <Typography className='!text-[14px]'>{segment.description}</Typography>
                            </Box>
                        ))}
                    </Box>
                    {/* Lado Direito */}
                    <Box className='w-1/2 pl-10'>
                        {segments.slice(Math.ceil(segments.length / 2)).map((segment, index) => (
                            <Box key={index} className='mb-3'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.selectedSegments?.includes(segment.name) || false}
                                            onChange={(event) => handleCheckboxChange(event, segment.name, 'segment')}
                                        />
                                    }
                                    label={segment.name}
                                />
                                <Typography className='!text-[14px]'>{segment.description}</Typography>
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
                        Concluir
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};