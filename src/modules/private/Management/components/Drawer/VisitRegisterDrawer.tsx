import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, TextField, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight } from 'react-icons/md';
import Select from 'react-select';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { useVisitRegisterForm } from '../../hooks';

export const VisitRegisterDrawer = ({
  closeDrawer,
  enqueueSnackbar
}: DrawerProps) => {

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    gymPlanOptions,
    modalitiesOptions,
    focusedFields,
    animatedComponents,
    handleFocus,
    handleTextFieldChange,
    handleSelectChange,
    handleBack,
    handleContinue,
    handleFinish
  } = useVisitRegisterForm({ closeDrawer, enqueueSnackbar });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Nova Visita
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
                          name='name'
                          label='Nome Completo'
                          variant='outlined'
                          value={formData.name}
                          onChange={handleTextFieldChange}
                          error={!!errors.nameError}
                          helperText={errors.nameError}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='identity'
                          label='CPF, RG ou outro documento de identificação'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.identity}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.identityError)}
                          helperText={errors.identityError}
                        />
                      </FormControl>
                      <Box className='!mt-5 z-[3]'>
                        <InputLabel id="referralSource"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.referralSource || focusedFields.referralSource ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          } ${focusedFields.referralSource ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                        >Como nos conheceu? *</InputLabel>
                        <Select
                          placeholder={focusedFields.referralSource ? '' : 'Como nos conheceu? *'}
                          components={animatedComponents}
                          options={gymPlanOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('referralSource', true)}
                          onBlur={() => handleFocus('referralSource', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'referralSource')}
                          value={gymPlanOptions.find(option => option.value === formData.referralSource)}
                          className={`${errors.referralSourceError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.referralSourceError && <FormHelperText className='!text-[#d32f2f]'>{errors.referralSourceError}</FormHelperText>}
                      <Box className='!mt-5 z-[2]'>
                        <InputLabel
                          id="modalities"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.modalities?.length || focusedFields.modalities
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          } ${focusedFields.modalities || errors.modalitiesError ? '!text-[#d32f2f]' : '!text-[#0009]'}`}
                        >
                          Modalidades de Interesse *
                        </InputLabel>
                        <Select
                          placeholder={focusedFields.modalities ? '' : 'Modalidades de Interesse *'}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={modalitiesOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('modalities', true)}
                          onBlur={() => handleFocus('modalities', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'modalities')}
                          value={modalitiesOptions.filter(option => formData.modalities?.includes(option.value))}
                          className={`${errors.modalitiesError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.modalitiesError && <FormHelperText className='!text-[#d32f2f]'>{errors.modalitiesError}</FormHelperText>}
                      <FormControl fullWidth>
                        <TextField
                          name='details'
                          multiline
                          rows={4}
                          label='Observações'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.details}
                          onChange={handleTextFieldChange}
                        />
                      </FormControl>
                    </>
                  );
                
                case 1:
                  return (
                    <>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='phone'
                          label='Telefone'
                          variant='outlined'
                          value={formData.phone}
                          onChange={handleTextFieldChange}
                          error={!!errors.phoneError}
                          helperText={errors.phoneError}
                        />
                      </FormControl>
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