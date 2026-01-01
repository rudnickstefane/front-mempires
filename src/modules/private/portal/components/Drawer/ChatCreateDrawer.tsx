import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, TextField, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle } from 'react-icons/md';
import Select from 'react-select';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { useChatCreateForm } from '../../hooks';

export const ChatCreateDrawer = ({
  closeDrawer,
  enqueueSnackbar
}: DrawerProps) => {

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    focusedFields,
    searchStudentOptions,
    animatedComponents,
    handleFocus,
    handleTextFieldChange,
    handleSelectChange,
    handleFinish
  } = useChatCreateForm({ closeDrawer, enqueueSnackbar });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Nova Conversa
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
                      <Box className='z-[3]'>
                        <InputLabel id="searchStudent"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.searchStudent || focusedFields.searchStudent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          } ${focusedFields.searchStudent ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                        >Digite o Nome, CPF, CNPJ ou Matrícula *</InputLabel>
                        <Select
                          placeholder={focusedFields.searchStudent ? '' : 'Digite o Nome, CPF, CNPJ ou Matrícula *'}
                          components={animatedComponents}
                          options={searchStudentOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('searchStudent', true)}
                          onBlur={() => handleFocus('searchStudent', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'searchStudent')}
                          value={searchStudentOptions.find(option => option.value === formData.searchStudent)}
                          className={`${errors.searchStudentError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.searchStudentError && <FormHelperText className='!text-[#d32f2f]'>{errors.searchStudentError}</FormHelperText>}
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='title'
                          label='Titulo'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.title}
                          onChange={handleTextFieldChange}
                          error={!!errors.titleError}
                          helperText={errors.titleError}
                        />
                      </FormControl>

                      {(formData.contactType === 'Ligação' || formData.contactType === 'WhatsApp') && (
                        <FormControl fullWidth>
                          <TextField
                            required
                            name='phone'
                            label='Telefone'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.phone}
                            onChange={handleTextFieldChange}
                            error={!!errors.phoneError}
                            helperText={errors.phoneError}
                          />
                        </FormControl>
                      )}

                      {formData.contactType !== 'Ligação' && (
                        <FormControl fullWidth>
                          <TextField
                            required
                            placeholder='Escreva o que será enviado.'
                            name='message'
                            multiline
                            rows={4}
                            label='Mensagem'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.message}
                            onChange={handleTextFieldChange}
                            error={!!errors.messageError}
                            helperText={errors.messageError}
                          />
                        </FormControl>
                      )}

                      <FormControl fullWidth>
                        <TextField
                          placeholder='Esta informação será exibida nos detalhes dessa conversa.'
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
                  height: '3rem',
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