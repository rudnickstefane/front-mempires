import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle } from 'react-icons/md';
import { DrawerProps } from '../../../../common/types';
import { useClassCreateForm } from '../../hooks';

export const ClassCreateDrawer = ({
  closeDrawer,
  enqueueSnackbar
}: DrawerProps) => {

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    handleTextFieldChange,
    handleSelectChange,
    handleFinish
  } = useClassCreateForm({ closeDrawer, enqueueSnackbar });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Nova Turma
        </Typography>
        <Box className='flex justify-end items-center'>
          <Typography className='!py-1 !px-2 !text-xs !text-neutral1900 leading-3 bg-gray-200 rounded-full'>
            Etapa {activeStep + 1} de {dynamicSteps.length}
          </Typography>
          <Button
            onClick={closeDrawer}
            className='flex flex-row items-center font-poppins !min-w-10 !mx-1 !rounded-full !min-h-10'
            sx={{
                color: '#4b5563',
                transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                '&:hover': {
                    color: '#ff0336',
                },
            }}
          >
            <IoIosCloseCircleOutline className='text-[1.5rem]' />
          </Button>
        </Box>
      </Box>
      <Box className='w-full flex flex-col justify-start items-center gap-4 mt-8'>
        <Box className='flex w-full'>
          <Box className='min-w-[200px] mr-[24px]'>
            {dynamicSteps.map((step, index) => (
              <Box
                className='flex items-center p-7 pl-5'
                key={index}
                sx={{
                  backgroundColor: activeStep === index ? '#f3f3f4' : 'transparent',
                  fontWeight: activeStep === index ? 'normal' : '300',
                  height: '50px',
                  borderRadius: '8px',
                  transition: 'background-color 0.3s',
                  marginBottom: '.5rem'
                }}
              >
                {step}
              </Box>
            ))}
          </Box>
          <Box className='flex flex-col w-full md:pr-0 pr-2'>
            {(() => {
              switch (activeStep) {
                case 0:
                  return (
                    <>
                      <FormControl fullWidth>
                        <TextField
                          required
                          placeholder='Exemplo: Musculação Livre'
                          InputLabelProps={{ shrink: true }}
                          name='class'
                          label='Turma'
                          variant='outlined'
                          value={formData.class}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.classError)}
                          helperText={errors.classError}
                        />
                      </FormControl>
                      <FormControl fullWidth required className='!mt-5'>
                        <InputLabel id="modalities" className={errors.modalitiesError ? '!text-[#d32f2f]' : ''}>Modalidade</InputLabel>
                        <Select
                          labelId="modalities"
                          id="modalitiesSelect"
                          name="modalities"
                          label="Modalidade"
                          value={formData.modalities}
                          onChange={handleSelectChange}
                          error={Boolean(errors.modalitiesError)}
                        >
                          <MenuItem value="" disabled>Selecione uma modalidade</MenuItem>
                          <MenuItem value="Single">Natação</MenuItem>
                          <MenuItem value="Married">Ballet</MenuItem>
                        </Select>
                        {errors.modalitiesError && <FormHelperText className='!text-[#d32f2f]'>{errors.modalitiesError}</FormHelperText>}
                      </FormControl>
                      <Box className='w-full flex flex-row items-center'>
                        <FormControl fullWidth>
                          <TextField
                            name='numberStudent'
                            label='Qtde. de alunos por horário'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.numberStudent}
                            onChange={handleTextFieldChange}
                          />
                        </FormControl>
                        <Tooltip title="Deixe em branco para considerar o número de alunos como ilimitado.">
                          <IconButton
                            size="small"
                            className='!mt-5 !ml-3'
                          >
                            <HelpOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box className='w-full flex flex-row items-center'>
                        <FormControl fullWidth>
                          <TextField
                            name='minimumAlert'
                            label='Limite mínimo para alerta'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.minimumAlert}
                            onChange={handleTextFieldChange}
                          />
                        </FormControl>
                        <Tooltip title="Defina o número mínimo de alunos para exibir um alerta. Quando o número de alunos atingir este valor, o sistema enviará uma notificação.">
                          <IconButton
                            size="small"
                            className='!mt-5 !ml-3'
                          >
                            <HelpOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </>
                  );

                default:
                  return null;
              }
            })()}

            <Box className='flex flex-row justify-between mt-8'>
              <Button
                onClick={closeDrawer}
                variant="outlined"
                sx={{
                  backgroundColor: 'transparent',
                  color: '#4b5563',
                  borderColor: '#4b5563',
                  '&:hover': {
                      backgroundColor: '#d4d4d8',
                      borderColor: '#4b5563',
                  },
                }}
              >
                Cancelar
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
      </Box>
    </Box>
  );
}