import { Box, Button, Divider, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField } from '@mui/material';
import { LuCalendarClock } from "react-icons/lu";
import { TbClock24 } from "react-icons/tb";
import { useGymConfigFormStepOne } from '../../../../../hooks/use-gym-config-form-step-one';
import { StepOneProps } from '../../types';

export const StepOne = ({ formData, setFormData, errors, setErrors, handleContinue }: StepOneProps) => {
    const {
        selectedValue,
        handleTextFieldChange,
        handleRadioChange,
        handleSelectChange,
        handleDayChange,
        validateForm
    } = useGymConfigFormStepOne(formData, setFormData, setErrors);

    const onContinue = () => {
        if (validateForm()) {
            handleContinue();
        }
    };

    return (
        <Box className='flex flex-col w-[80vw]'>
            <Box className='w-full rounded-lg shadow-lg bg-white p-6 md:p-10'>
                <Box className='flex justify-start items-center'>
                    <TbClock24 className='w-[30px] h-[30px] text-[#424242]' />
                    <Box className='text-2xl ml-[1vw] text-[#424242]'>Expediente</Box>
                </Box>
                <Box className='w-full flex flex-col'>
                    <Divider className='!my-5' />
                    <Box className='w-full flex flex-row ml-[0.7rem]'>
                        <Box className='w-full mx-1'>
                            <RadioGroup
                                name="radio-buttons-group"
                                row
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel
                                    value="isPersonalizable"
                                    control={<Radio color="primary" />}
                                    label="Horário Personalizado"
                                    className='bg-white md:w-[49%] w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg'
                                    checked={selectedValue === 'isPersonalizable'}
                                />
                                <FormControlLabel
                                    value="is24Hours"
                                    control={<Radio color="primary" />}
                                    label="24 Horas"
                                    className='bg-white md:w-[49%] md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg'
                                    checked={selectedValue === 'is24Hours'}
                                />
                            </RadioGroup>
                        </Box>
                    </Box>
                    <Box className='w-full flex flex-row flex-wrap mt-7'>
                        <Box className='md:w-[100%] w-full mx-1'>
                            <FormControl error={!!errors.timeZoneError} required className='w-full'>
                                <InputLabel id="timeZone">Fuso Horário</InputLabel>
                                <Select
                                    labelId="timeZone"
                                    id="timeZoneSelect"
                                    name="timeZone"
                                    value={formData.timeZone}
                                    onChange={handleSelectChange}
                                    label="Fuso Horário"
                                >
                                    <MenuItem value="" disabled>Selecione um fuso horário</MenuItem>
                                    <MenuItem value="UTC-2">(UTC-02:00) Horário de Fernando de Noronha (FNT)</MenuItem>
                                    <MenuItem value="UTC-3">(UTC-03:00) Horário de Brasília (BRT)</MenuItem>
                                    <MenuItem value="UTC-4">(UTC-04:00) Horário de Manaus (AMT)</MenuItem>
                                    <MenuItem value="UTC-5">(UTC-05:00) Horário de Rio Branco (ACT)</MenuItem>
                                </Select>
                                {errors.timeZoneError && <FormHelperText>{errors.timeZoneError}</FormHelperText>}
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className='flex justify-between w-full flex-wrap mt-5'>
                        <Box className='md:w-[30%]'>
                            <Box className="flex mt-3 w-full">
                                <Box className='w-full mx-1'>
                                    <FormControl>
                                        <TextField
                                            required
                                            name='startTimeMondayToFriday'
                                            label='Segunda à Sexta'
                                            placeholder='Início'
                                            value={formData.startTimeMondayToFriday}
                                            onChange={handleTextFieldChange}
                                            variant='outlined'
                                            error={!!errors.startTimeMondayToFridayError}
                                            helperText={errors.startTimeMondayToFridayError}
                                            disabled={formData.is24Hours}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </FormControl>
                                </Box>
                                <Divider className='w-2 mx-1 self-center' />
                                <Box className='w-full mx-1'>
                                    <FormControl>
                                        <TextField
                                            required
                                            name='endTimeMondayToFriday'
                                            placeholder='Fim'
                                            value={formData.endTimeMondayToFriday}
                                            onChange={handleTextFieldChange}
                                            variant='outlined'
                                            error={!!errors.endTimeMondayToFridayError}
                                            helperText={errors.endTimeMondayToFridayError}
                                            disabled={formData.is24Hours}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='md:w-[30%] md:mt-0 mt-5'>
                            <Box className="flex mt-3 w-full">
                                <Box className='w-full mx-1'>
                                    <FormControl>
                                        <TextField
                                            name='startTimeSaturday'
                                            label='Sábado'
                                            placeholder='Início'
                                            value={formData.startTimeSaturday}
                                            onChange={handleTextFieldChange}
                                            variant='outlined'
                                            error={!!errors.startTimeSaturdayError}
                                            helperText={errors.startTimeSaturdayError}
                                            disabled={formData.is24Hours}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </FormControl>
                                </Box>
                                <Divider className='w-2 mx-1 self-center' />
                                <Box className='w-full mx-1'>
                                    <FormControl>
                                        <TextField
                                            name='endTimeSaturday'
                                            placeholder='Fim'
                                            value={formData.endTimeSaturday}
                                            onChange={handleTextFieldChange}
                                            variant='outlined'
                                            error={!!errors.endTimeSaturdayError}
                                            helperText={errors.endTimeSaturdayError}
                                            disabled={formData.is24Hours}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='md:w-[35%] md:mt-0 mt-5'>
                            <Box className="flex mt-3 w-full">
                                <Box className='w-full mx-1'>
                                    <FormControl>
                                        <TextField
                                            name='startTimeSunday'
                                            label='Domingos e Feriados'
                                            placeholder='Início'
                                            value={formData.startTimeSunday}
                                            onChange={handleTextFieldChange}
                                            variant='outlined'
                                            error={!!errors.startTimeSundayError}
                                            helperText={errors.startTimeSundayError}
                                            disabled={formData.is24Hours}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </FormControl>
                                </Box>
                                <Divider className='w-2 mx-1 self-center' />
                                <Box className='w-full mx-1'>
                                    <FormControl>
                                        <TextField
                                            name='endTimeSunday'
                                            placeholder='Fim'
                                            value={formData.endTimeSunday}
                                            onChange={handleTextFieldChange}
                                            variant='outlined'
                                            error={!!errors.endTimeSundayError}
                                            helperText={errors.endTimeSundayError}
                                            disabled={formData.is24Hours}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className='flex justify-start items-center mt-10'>
                    <LuCalendarClock className='w-[30px] h-[30px] text-[#424242]' />
                    <Box className='text-2xl ml-[1vw] text-[#424242]'>Dias da Semana</Box>
                </Box>
                <Box className='w-full flex flex-col'>
                    <Divider className='!my-5' />
                    <Box className='w-full flex flex-row'>
                        <Box className='w-full mx-1'>
                            <Box className='flex flex-col'>
                                {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map(day => (
                                    <FormControlLabel
                                        className='w-[10%]'
                                        key={day}
                                        control={
                                            <Switch
                                                checked={formData.selectedDays.includes(day)}
                                                onChange={() => handleDayChange(day)}
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
                                        label={day}
                                    />
                                ))}
                                {errors.dayError && <p className='text-[#d32f2f] text-[0.75rem] w-full ml-[14px]'>{errors.dayError}</p>}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className='flex flex-row justify-center'>
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