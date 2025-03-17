import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, Divider, FormControlLabel, IconButton, Switch, Tooltip } from '@mui/material';
import { BsCardChecklist } from "react-icons/bs";
import { StepThreeProps } from '../../../../../../pages/sign-up/gym/types';
import { useThreeStepConfigGym } from '../hooks';

export const ThreeStepConfigGym = ({ formData, setFormData, errors, setErrors, handleContinue, handleBack }: StepThreeProps) => {

    const {
        handleWorkFormChange,
        validateForm
    } = useThreeStepConfigGym(formData, setFormData, setErrors);

    const onContinue = () => {
        if (validateForm()) {
            handleContinue();
        }
    };

    return (
        <Box className='flex flex-col w-[80vw]'>
            <Box className='w-full rounded-lg shadow-lg bg-white p-6 md:p-10'>
                <Box className='flex justify-start items-center'>
                    <BsCardChecklist className='w-[30px] h-[30px] text-[#424242]' />
                    <Box className='text-2xl ml-[1vw] text-[#424242]'>Formas de Trabalho</Box>
                </Box>
                <Box className='w-full flex flex-col'>
                    <Divider className='!my-5' />
                    <Box className='w-full flex flex-row flex-wrap'>
                        <Box className='w-full mx-1'>
                            <Box className='flex flex-col'>
                                {['Mensalidades', 'Aulas ou Sessões'].map(workForm => (
                                    <FormControlLabel
                                        className='w-full'
                                        key={workForm}
                                        control={
                                            <Switch
                                                checked={formData.workForms.includes(workForm)}
                                                onChange={() => handleWorkFormChange(workForm)}
                                                sx={{
                                                    '& .MuiSwitch-switchBase': {
                                                        '&.Mui-checked': {
                                                            color: '#ff0336',
                                                            '& + .MuiSwitch-track': {
                                                                backgroundColor: '#ff0336',
                                                            },
                                                        },
                                                    },
                                                    '& .MuiSwitch-track': {
                                                        backgroundColor: '#bdbdbd',
                                                    },
                                                    '& .MuiSwitch-thumb': {
                                                        backgroundColor: '#ff0336',
                                                    },
                                                }}
                                            />
                                        }
                                        label={
                                            <span>
                                                {workForm}
                                                {workForm === 'Mensalidades' && (
                                                    <Tooltip title="Cobrança realizada por períodos.">
                                                        <IconButton
                                                            size="small"
                                                            sx={{ marginTop: '-5px', marginLeft: '5px' }}
                                                        >
                                                            <HelpOutlineIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                                {workForm === 'Aulas ou Sessões' && (
                                                    <Tooltip title="Cobrança realizada por número de aulas ou sessões.">
                                                        <IconButton
                                                            size="small"
                                                            sx={{ marginTop: '-5px', marginLeft: '5px' }}
                                                        >
                                                            <HelpOutlineIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </span>
                                        }
                                    />
                                ))}
                                {errors.workFormError && <p className='text-[#d32f2f] text-[0.75rem]'>{errors.workFormError}</p>}
                            </Box>
                        </Box>
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