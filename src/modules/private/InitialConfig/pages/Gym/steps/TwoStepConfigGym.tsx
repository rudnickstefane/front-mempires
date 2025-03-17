import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, TextField } from '@mui/material';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { StepTwoProps } from '../../../../../../pages/sign-up/gym/types';
import { useTwoStepConfigGym } from '../hooks';

export const TwoStepConfigGym = ({ formData, setFormData, errors, setErrors, handleContinue, handleBack }: StepTwoProps) => {

    const {
        isNoNumber,
        handleNoNumberToggle,
        handleTextFieldChange,
        validateForm
    } = useTwoStepConfigGym(formData, setFormData, setErrors);

    const onContinue = () => {
        if (validateForm()) {
            handleContinue();
        }
    };

    return (
        <Box className='flex flex-col w-[80vw]'>
            <Box className='w-full rounded-lg shadow-lg bg-white p-6 md:p-10'>
                <Box className='flex justify-start items-center'>
                    <FaMapMarkedAlt className='w-[30px] h-[30px] text-[#424242]' />
                    <Box className='text-2xl ml-[1vw] text-[#424242]'>Endereço</Box>
                </Box>
                <Box className='w-full flex flex-col'>
                    <Divider className='!my-5' />
                    <Box className='w-full flex flex-row flex-wrap'>
                        <Box className='md:w-[19%] w-full mx-1'>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name='zipCode'
                                    label='CEP'
                                    value={formData.zipCode}
                                    onChange={handleTextFieldChange}
                                    variant='outlined'
                                    error={!!errors.zipCodeError}
                                    helperText={errors.zipCodeError}
                                />
                            </FormControl>
                        </Box>
                        <Box className='md:w-[78%] md:mt-0 w-full mt-5 mx-1'>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name='address'
                                    label='Endereço'
                                    value={formData.address}
                                    onChange={handleTextFieldChange}
                                    variant='outlined'
                                    error={!!errors.addressError}
                                    helperText={errors.addressError}
                                    InputLabelProps={{ shrink: !!formData.address }}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className='w-full flex flex-row flex-wrap mt-5'>
                        <Box className='md:w-[29%] w-full mx-1'>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name='number'
                                    label='Número'
                                    value={formData.number}
                                    onChange={handleTextFieldChange}
                                    variant='outlined'
                                    error={!!errors.numberError}
                                    helperText={errors.numberError}
                                />
                            </FormControl>
                        </Box>
                        <Box className='md:w-[16%] md:mt-2 md:ml-4 w-full mt-5 ml-1'>
                            <FormControl component="fieldset" className="flex justify-center" fullWidth>
                                <FormControlLabel
                                  control={
                                  <Checkbox
                                    checked={isNoNumber} 
                                    onChange={handleNoNumberToggle} 
                                  />} 
                                    label={'Sem número'}
                                />
                            </FormControl>
                        </Box>
                        <Box className='md:w-[51.4%] md:mt-0 w-full mx-1 mt-5'>
                            <FormControl fullWidth>
                                <TextField
                                    name='complement'
                                    label='Complemento'
                                    value={formData.complement}
                                    onChange={handleTextFieldChange}
                                    variant='outlined'
                                    error={!!errors.complementError}
                                    helperText={errors.complementError}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className='w-full flex flex-row flex-wrap mt-5'>
                        <Box className='md:w-[39%] w-full mx-1'>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name='district'
                                    label='Bairro'
                                    value={formData.district}
                                    onChange={handleTextFieldChange}
                                    variant='outlined'
                                    error={!!errors.districtError}
                                    helperText={errors.districtError}
                                    InputLabelProps={{ shrink: !!formData.district }}
                                />
                            </FormControl>
                        </Box>
                        <Box className='md:w-[39%] md:mt-0 w-full mx-1 mt-5'>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name='city'
                                    label='Cidade'
                                    value={formData.city}
                                    onChange={handleTextFieldChange}
                                    variant='outlined'
                                    disabled
                                    InputLabelProps={{ shrink: !!formData.city }}
                                    error={!!errors.cityError}
                                    helperText={errors.cityError}
                                />
                            </FormControl>
                        </Box>
                        <Box className='md:w-[18%] md:mt-0 w-full mx-1 mt-5'>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name='state'
                                    label='Estado'
                                    value={formData.state}
                                    onChange={handleTextFieldChange}
                                    variant='outlined'
                                    disabled
                                    InputLabelProps={{ shrink: !!formData.state }}
                                    error={!!errors.stateError}
                                    helperText={errors.stateError}
                                />
                            </FormControl>
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
        </Box>
    );
};