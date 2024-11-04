import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, Divider, FormControlLabel, IconButton, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { BsCardChecklist } from "react-icons/bs";
import { FaCalendarDays } from 'react-icons/fa6';
import { useGymConfigFormStepThree } from '../../../../../hooks/use-gym-config-form-step-three';
import { StepThreeProps } from '../../types';

export const StepThree = ({ formData, setFormData, errors, setErrors, handleContinue, handleBack }: StepThreeProps) => {

    const {
        plans,
        selectedPlans,
        handlePlanSelect,
        handleRemovePlans,
        handleWorkFormChange,
        validateForm
    } = useGymConfigFormStepThree(formData, setFormData, setErrors);

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
                <Box className='flex justify-start items-center mt-10'>
                    <FaCalendarDays className='w-[30px] h-[30px] text-[#424242]' />
                    <Box className='text-2xl ml-[1vw] text-[#424242]'>Planos de Frequência</Box>
                </Box>
                <Box className='w-full flex flex-col'>
                    <Divider className='!my-5' />
                    <Box className='w-full flex flex-row flex-wrap'>
                        <Box className='md:mt-0 w-full mx-1'>
                            <Select
                                value={selectedPlans}
                                onChange={handlePlanSelect}
                                displayEmpty
                                fullWidth
                            >
                                <MenuItem value="" disabled>
                                    Selecione o plano
                                </MenuItem>
                                {[...Array(24)].map((_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        {i + 1} {i + 1 === 1 ? 'Mês' : 'Meses'}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                    <Box className='w-full flex flex-row flex-wrap'>
                        <Box className='w-full mx-1 mt-5'>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Plano</TableCell>
                                            <TableCell>Descrição</TableCell>
                                            <TableCell align="right">Excluir</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {plans.map(plans => (
                                            <TableRow key={plans.value}>
                                                <TableCell component="th" scope="row">
                                                    {plans.label}
                                                </TableCell>
                                                <TableCell>
                                                    {plans.description}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => handleRemovePlans(plans.value)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {errors.plansError && <p className='text-[#d32f2f] text-[0.75rem] mt-5'>{errors.plansError}</p>}
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