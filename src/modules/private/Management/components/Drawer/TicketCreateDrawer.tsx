import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect, TextField, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle } from 'react-icons/md';
import { DrawerProps } from '../../../../common/types';
import { useTicketCreateForm } from '../../hooks';

export const TicketCreateDrawer = ({
  closeDrawer,
  enqueueSnackbar,
  refresh,
}: DrawerProps) => {

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    queueOptions,
    handleTextFieldChange,
    handleSelectMuiChange,
    handleFinish,
    charactersRemaining,
  } = useTicketCreateForm({ closeDrawer, enqueueSnackbar, refresh });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Novo Protocolo
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
          <Typography className='!text-[.8rem] !absolute right-[2rem] top-[4.7rem] text-gray-500'>(<span className='text-[#ff0000]'>*</span>) Campos Obrigatórios</Typography>
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
                      <FormControl className='w-full' error={!!errors.queueError}>
                        <InputLabel id="queue" required>Você deseja abrir o protocolo para qual área?</InputLabel>
                        <MuiSelect
                          required
                          labelId="queue"
                          id="queue"
                          name="queue"
                          value={String(formData.queue)}
                          onChange={handleSelectMuiChange}
                          label="Você deseja abrir o protocolo para qual área?"
                          className="w-full"
                          error={Boolean(errors.queueError)}
                        >
                          {queueOptions.map((queue) => (
                            <MenuItem 
                              key={queue.value} 
                              value={queue.value}
                              disabled={queue.isDisabled || false}
                            >
                              {queue.label}
                            </MenuItem>
                          ))}
                        </MuiSelect>
                      </FormControl>
                      {errors.queueError && <FormHelperText className='!text-[#d32f2f]'>{errors.queueError}</FormHelperText>}
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='name'
                          label='Assunto'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.name}
                          onChange={handleTextFieldChange}
                          error={!!errors.nameError}
                          helperText={errors.nameError}
                          inputProps={{ maxLength: 100 }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='message'
                          multiline
                          rows={4}
                          label='Mensagem'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.message}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 300 }}
                          error={Boolean(errors.messageError)}
                          helperText={errors.messageError}
                        />
                        <Box
                          className='mt-2 font-light text-[.9rem]'
                          sx={{
                            color: charactersRemaining <= 10 ? 'red' : 'inherit',
                          }}
                        >
                          Restam {charactersRemaining} caracteres
                        </Box>
                      </FormControl>
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
                disabled={isLoading || !formData.message}
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