import { Box, Button, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight } from 'react-icons/md';
import { DrawerProps } from '../../../../common/types';
import { useGroupEditForm } from '../../hooks';

export const EditGroupDrawer = ({
  closeDrawer,
  enqueueSnackbar,
  data,
  initialStep = 0,
  refresh,
}: DrawerProps) => {
  const {
    isLoading,
    formData,
    errors,
    activeStep,
    setActiveStep,
    dynamicSteps,
    handleTextFieldChange,
    handleSelectChange,
    handleBack,
    handleContinue,
    handleFinish,
    charactersRemaining,
  } = useGroupEditForm({ closeDrawer, enqueueSnackbar, data, refresh });

  useEffect(() => {
      setActiveStep(initialStep);
    }, [initialStep, setActiveStep]);

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Alterar Dados
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
                      <FormControl fullWidth>
                        <TextField
                          required
                          placeholder='Exemplo: Financeiro'
                          name='name'
                          label='Nome do grupo'
                          variant='outlined'
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
                          name='description'
                          multiline
                          rows={4}
                          label='Descrição'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.description}
                          onChange={handleTextFieldChange}
                          error={!!errors.descriptionError}
                          helperText={errors.descriptionError}
                          inputProps={{ maxLength: 300 }}
                        />
                        <Box
                          className='mt-2 font-light text-[.9rem]'
                          sx={{
                              color: (charactersRemaining[`description`]) <= 10 ? 'red' : 'inherit',
                          }}
                          >
                          Restam {charactersRemaining[`description`]} caracteres
                        </Box>
                      </FormControl>
                    </>
                  );

                case 1:
                  return (
                      <>
                        <Box className='rounded-xl w-full mb-5 p-5 border border-[#EAECF0]'>
                          <Box className='flex flex-row justify-between'>
                            <Box>
                              <Typography className='p-3 bg-[#28292914] rounded-lg'>Geral</Typography>
                            </Box>
                            <Typography className='p-3'>Permissões definidas abaixo</Typography>
                          </Box>
                          <Divider className='!my-5' />
                          <Box className='flex flex-row justify-between'>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Dados da academia</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="permissionProfileCompany"
                                value={String(formData.permissionProfileCompany)}
                                label="Dados da academia"
                                onChange={handleSelectChange}
                              >
                                <MenuItem value='NONE'>Restrito</MenuItem>
                                <MenuItem value='VIEW'>Visualização</MenuItem>
                                <MenuItem value='UPDATE'>Edição</MenuItem>
                                <MenuItem value='ADMIN'>Sem restrição</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                        <Box className='rounded-xl w-full mb-5 p-5 border border-[#EAECF0]'>
                          <Box className='flex flex-row justify-between'>
                            <Box>
                              <Typography className='p-3 bg-[#28292914] rounded-lg'>Menu</Typography>
                            </Box>
                            <Typography className='p-3'>Permissões definidas abaixo</Typography>
                          </Box>
                          <Divider className='!my-5' />
                          <Box className='flex flex-row justify-between items-center'>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Administrativo</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="permissionMenuAdmin"
                                value={String(formData.permissionMenuAdmin)}
                                label="Administrativo"
                                onChange={handleSelectChange}
                              >
                                <MenuItem value='NONE'>Restrito</MenuItem>
                                <MenuItem value='ADMIN'>Sem restrição</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box className='flex flex-row justify-between mt-5 items-center'>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Financeiro</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="permissionMenuFinance"
                                value={String(formData.permissionMenuFinance)}
                                label="Financeiro"
                                onChange={handleSelectChange}
                              >
                                <MenuItem value='NONE'>Restrito</MenuItem>
                                <MenuItem value='ADMIN'>Sem restrição</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box className='flex flex-row justify-between mt-5 items-center'>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Integrações</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="permissionMenuIntegration"
                                value={String(formData.permissionMenuIntegration)}
                                label="Integrações"
                                onChange={handleSelectChange}
                              >
                                <MenuItem value='NONE'>Restrito</MenuItem>
                                <MenuItem value='ADMIN'>Sem restrição</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box className='flex flex-row justify-between mt-5 items-center'>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Relatórios</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="permissionMenuDashboard"
                                value={String(formData.permissionMenuDashboard)}
                                label="Relatórios"
                                onChange={handleSelectChange}
                              >
                                <MenuItem value='NONE'>Restrito</MenuItem>
                                <MenuItem value='ADMIN'>Sem restrição</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box className='flex flex-row justify-between mt-5 items-center'>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Programas</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="permissionMenuPrograms"
                                value={String(formData.permissionMenuPrograms)}
                                label="Programas"
                                onChange={handleSelectChange}
                              >
                                <MenuItem value='NONE'>Restrito</MenuItem>
                                <MenuItem value='ADMIN'>Sem restrição</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      </>
                    );

                default:
                  return null;
              }
            })()}

            <Box className='flex flex-row justify-between mt-8'>
              {activeStep === 0 && (
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
              )}

              {activeStep > 0 && (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleBack}
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
                    Voltar
                </Button>
              )}

              {/* Botão Continuar - Exibido até a penúltima etapa */}
              {activeStep < dynamicSteps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleContinue}
                  endIcon={<MdKeyboardArrowRight />}
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
              )}

              {/* Botão Concluir - Exibido apenas na última etapa */}
              {activeStep === dynamicSteps.length - 1 && (
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
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}