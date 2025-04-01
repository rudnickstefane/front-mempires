import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, TextField, Tooltip, Typography } from '@mui/material';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GrUserManager } from 'react-icons/gr';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight } from 'react-icons/md';
import Select from 'react-select';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { useVisitRegisterForm } from '../../hooks';

export const VisitRegisterDrawer = ({
  closeDrawer,
  enqueueSnackbar,
  refresh,
}: DrawerProps) => {

  const {
    isLoading,
    isNoEmail,
    handleNoEmailToggle,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    referralSourceOptions,
    responseModalitiesOptions,
    focusedFields,
    animatedComponents,
    handleFocus,
    handleTextFieldChange,
    handleSelectChange,
    handleBack,
    handleContinue,
    handleFinish,
    charactersRemaining,
    referralSelected,
    responseStudent
  } = useVisitRegisterForm({ closeDrawer, enqueueSnackbar, refresh });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Novo Visitante
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
                          name='name'
                          label='Nome Completo'
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
                          name='identity'
                          label='CPF, RG ou outro documento de identificação'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.identity}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.identityError)}
                          helperText={errors.identityError}
                          inputProps={{ maxLength: 18 }}
                        />
                      </FormControl>
                      <Box className='!mt-5 z-[3]'>
                        <InputLabel id="referralSource"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.referralSource || focusedFields.referralSource ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          } ${focusedFields.referralSource ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                        >Como nos conheceu? <span style={{ color: 'red' }}>*</span></InputLabel>
                        <Select
                          placeholder={
                            focusedFields.referralSource
                              ? ''
                              : (
                                <>
                                  Como nos conheceu? <span style={{ color: 'red' }}>*</span>
                                </>
                              )
                          }
                          components={animatedComponents}
                          options={referralSourceOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('referralSource', true)}
                          onBlur={() => handleFocus('referralSource', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'referralSource')}
                          value={referralSourceOptions.find(option => option.value === formData.referralSource)}
                          className={`${errors.referralSourceError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.referralSourceError && <FormHelperText className='!text-[#d32f2f]'>{errors.referralSourceError}</FormHelperText>}
                      {referralSelected === 'student' && (
                          <>
                            <Box className='flex flex-row items-center justify-center'>
                              <FormControl fullWidth>
                                <TextField
                                  required
                                  name='indicationSearch'
                                  label="Buscar Aluno"
                                  placeholder='Documento, Matrícula, Email ou Nome'
                                  variant='outlined'
                                  className='!mt-5'
                                  value={formData.indicationSearch}
                                  onChange={handleTextFieldChange}
                                  error={!!errors.indicationSearchError}
                                  helperText={errors.indicationSearchError}
                                />
                              </FormControl>
                              <Tooltip
                                title={
                                  <>
                                    Caso sua academia esteja participando do nosso <b>programa de incentivo</b>, tanto você quanto o aluno que fez a indicação terão a chance de ganhar recompensas incríveis!.<br /><br />
                                    Para mais detalhes, acesse no menu: <br />
                                    <b>Programas &gt; Incentivo &gt; Regulamento</b>
                                  </>
                                } placement="left" arrow>
                                <IconButton
                                  size="small"
                                  sx={{ marginTop: '20px', marginLeft: '5px' }}
                                >
                                  <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                            {responseStudent ? (
                              <Box className='flex flex-col gap-4 p-6 bg-neutral-100 rounded-xl mt-5'>
                                <Box className='flex flex-row'>
                                  <Box className='flex flex-col flex-grow'>
                                    <Typography className='text-left !font-roboto !font-semibold !text-xl text-neutral-900'>
                                      {responseStudent.findStudent.name}
                                    </Typography>
                                    <Typography className='text-left !font-roboto !font-medium !text-base text-neutral-500'>
                                      {responseStudent.findStudent.identity}
                                    </Typography>
                                  </Box>
                                  <Box>
                                  <GrUserManager className='text-[2.5rem] text-[#282929]' />
                                  </Box>
                                </Box>
                                <Box className='flex flex-row flex-grow items-center gap-2'>
                                  <HiOutlineLocationMarker className='text-[1.5rem] text-[#282929]' />
                                  <Typography className='text-left !font-roboto !font-normal !text-sm text-neutral-500'>
                                    {responseStudent.findStudent.address}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : errors.searchFindStudentError && (
                              <Box className='flex flex-col gap-4 p-6 rounded-xl text-rose-900 bg-rose-50 mt-5'>
                                <Box className='flex flex-row items-center'>
                                  <AiOutlineCloseCircle className='text-[2.5rem]' />
                                  <Typography className='!ml-3 text-left !font-roboto !font-semibold !text-xl'>
                                    {errors.searchFindStudentError}
                                  </Typography>
                                </Box>
                                <Typography className='text-left !font-roboto !font-normal !text-sm'>
                                  Por favor, verifique os dados inseridos ou entre em contato com o nosso suporte.
                                </Typography>
                              </Box>
                            )}
                          </>
                        )
                      }
                      <Box className='!mt-5 z-[2]'>
                        <InputLabel
                          id="modalities"
                          className={`!absolute z-[1] bg-white ml-2 -mt-3 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.modalities?.length || focusedFields.modalities
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          } ${focusedFields.modalities || errors.modalitiesError ? '!text-[#d32f2f]' : '!text-[#0009]'}`}
                        >
                          Modalidades de Interesse <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <Select
                          placeholder={
                            focusedFields.modalities
                              ? ''
                              : (
                                <>
                                  Modalidades de Interesse <span style={{ color: 'red' }}>*</span>
                                </>
                              )
                          }
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={responseModalitiesOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('modalities', true)}
                          onBlur={() => handleFocus('modalities', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'modalities')}
                          value={responseModalitiesOptions.filter(option => formData.modalities?.includes(option.value))}
                          className={`${errors.modalitiesError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.modalitiesError && <FormHelperText className='!text-[#d32f2f]'>{errors.modalitiesError}</FormHelperText>}
                      <FormControl fullWidth>
                        <TextField
                          name='observation'
                          multiline
                          rows={4}
                          label='Observações'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.observation}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 300 }}
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
                      <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                        <Box className='md:w-[65.7%] w-full'>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='email'
                              label='E-mail'
                              variant='outlined'
                              value={formData.email}
                              onChange={handleTextFieldChange}
                              error={!!errors.emailError}
                              helperText={errors.emailError}
                              disabled={isNoEmail}
                              inputProps={{ maxLength: 100 }}
                            />
                          </FormControl>
                        </Box>
                        <Box className='md:w-[30%] md:mt-2 md:ml-4 w-full mt-5'>
                          <FormControl component="fieldset" className="flex justify-center" fullWidth>
                            <FormControlLabel
                              control={
                              <Checkbox 
                                checked={isNoEmail} 
                                onChange={handleNoEmailToggle} 
                              />} 
                                label={'Sem e-mail'}
                            />
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