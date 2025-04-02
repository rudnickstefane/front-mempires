import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, Typography } from '@mui/material';
import { MdCheckCircle, MdMiscellaneousServices, MdSegment } from 'react-icons/md';
import { StepFiveProps } from '../../../../../../pages/sign-up/gym/types/gym-steps.types';
import { useFiveStepConfigGym } from '../hooks';

export const FiveStepConfigGym = ({ formData, setFormData, errors, handleFinish, handleBack, isLoading }: StepFiveProps) => {

    const {
        services,
        segments,
        handleCheckboxChange
    } = useFiveStepConfigGym(formData, setFormData);

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
                                            checked={
                                                formData.selectedServices?.some(
                                                    (selected) => selected.name === service.name
                                                ) || false
                                            }
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
                                            checked={
                                                formData.selectedServices?.some(
                                                    (selected) => selected.name === service.name
                                                ) || false
                                            }
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
                {errors.servicesError && <p className='text-[#d32f2f] text-[0.75rem]'>{errors.servicesError}</p>}
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
                                            checked={
                                                formData.selectedSegments?.some(
                                                    (selected) => selected.name === segment.name
                                                ) || false
                                            }
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
                                            checked={
                                                formData.selectedSegments?.some(
                                                    (selected) => selected.name === segment.name
                                                ) || false
                                            }
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
                {errors.segmentsError && <p className='text-[#d32f2f] text-[0.75rem]'>{errors.segmentsError}</p>}
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
                        disabled={isLoading}
                        variant="contained"
                        color="primary"
                        onClick={handleFinish}
                        endIcon={isLoading ? '' : <MdCheckCircle />}
                        sx={{
                            backgroundColor: '#ff0336',
                            color: '#fff',
                            height: '3rem',
                            '&:hover': {
                            backgroundColor: '#e6001b',
                            },
                        }}
                        >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Concluir'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};