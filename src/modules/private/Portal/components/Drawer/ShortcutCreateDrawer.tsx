import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle } from 'react-icons/md';
import { DrawerProps } from '../../../../common/types';
import { useShortcutCreateForm } from '../../hooks';

export const ShortcutCreateDrawer = ({
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
    handleSelectChange,
    handleFinish,
    responseShortcuts
  } = useShortcutCreateForm({ closeDrawer, enqueueSnackbar, refresh });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Novo Atalho
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
            <Box className='w-full'>
              <Box className='w-full'>
                <FormControl error={!!errors.shortcutsError} required className='w-full'>
                  <InputLabel id="shortcuts">Atalhos</InputLabel>
                  <Select
                    labelId="shortcuts"
                    id="shortcutsSelect"
                    name="shortcuts"
                    value={formData.shortcutCode}
                    onChange={handleSelectChange}
                    label="Atalhos"
                  >
                    <MenuItem value="" disabled>Selecione um atalho</MenuItem>
                    {!responseShortcuts?.findShortcuts ? (
                      <MenuItem disabled>Carregando atalhos...</MenuItem>
                    ) : responseShortcuts.findShortcuts.length === 0 ? (
                      <MenuItem disabled>Nenhum atalho disponível.</MenuItem>
                    ) : (
                      responseShortcuts.findShortcuts.map((shortcut) => (
                        <MenuItem key={shortcut.shortcutCode} value={shortcut.shortcutCode}>
                          {shortcut.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {errors.shortcutsError && <FormHelperText>{errors.shortcutsError}</FormHelperText>}
                </FormControl>
              </Box>
            </Box>
            <Box className='w-full flex justify-between mt-5'>
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