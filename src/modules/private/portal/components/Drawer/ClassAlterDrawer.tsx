/* eslint-disable @typescript-eslint/no-explicit-any */
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, CircularProgress, Divider, Fade, FormControl, FormHelperText, IconButton, InputLabel, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { IoIosCloseCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdDeleteOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { TbProgressAlert } from 'react-icons/tb';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { useClassAlterForm } from '../../hooks';

export const ClassAlterDrawer = ({
  closeDrawer,
  enqueueSnackbar,
  data,
  initialStep = 0,
  refresh,
}: DrawerProps) => {

  const animatedComponents = makeAnimated();

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    setActiveStep,
    dynamicSteps,
    handleTextFieldChange,
    handleSelectChange,
    handleFinish,
    alertStartDate,
    charactersRemaining,
    handleBack,
    handleContinue,
    handleAddTimeSlot,
    handleRemoveTimeSlot,
    selectedDay,
    daysOfWeek,
    openModalHours,
    startTime,
    setEndTime,
    setStartTime,
    endTime,
    handleCloseModal,
    handleOpenModal,
    responseModalitiesOptions,
    focusedFields,
    handleFocus
  } = useClassAlterForm({ closeDrawer, enqueueSnackbar, data, refresh });

  useEffect(() => {
    setActiveStep(initialStep);
  }, [initialStep, setActiveStep]);

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Alterar Turma
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
          {dynamicSteps[activeStep] !== 'Regras' && (
            <Typography className='!text-[.8rem] !absolute right-[2rem] top-[4.7rem] text-gray-500'>(<span className='text-[#ff0000]'>*</span>) Campos Obrigatórios</Typography>
          )}
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
                          name='name'
                          label='Turma'
                          variant='outlined'
                          value={formData.name}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.nameError)}
                          helperText={errors.nameError}
                        />
                      </FormControl>
                      <Box className='z-[3] mt-5'>
                        <InputLabel
                          id="modalities"
                          className={`!absolute z-[1] bg-white ml-2 -mt-3 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.modalities?.length || focusedFields.modalities
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          } ${focusedFields.modalities || errors.modalitiesError ? '!text-[#d32f2f]' : '!text-[#0009]'}`}
                        >
                          Modalidades <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <Select
                          placeholder={
                            focusedFields.modalities
                              ? ''
                              : (
                                <>
                                  Modalidades <span style={{ color: 'red' }}>*</span>
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
                      <Box className='w-full flex flex-row justify-between z-[2] mt-5'>
                        <FormControl fullWidth>
                          <TextField
                            name='startDate'
                            label='Início da vigência'
                            variant='outlined'
                            className='!mr-5'
                            type='date'
                            value={formData.startDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if (e.target.value.length <= 10) {
                                handleTextFieldChange(e);
                              }
                            }}
                            error={!!errors.startDateError}
                            helperText={errors.startDateError}
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                        <FormControl fullWidth>
                          <TextField
                            name='startHours'
                            label='Hora'
                            variant='outlined'
                            type='time'
                            value={formData.startHours}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if (e.target.value.length <= 10) {
                                handleTextFieldChange(e);
                              }
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                      </Box>
                      <Box className='w-full flex flex-row justify-between mt-5 z-[2]'>
                        <FormControl fullWidth>
                          <TextField
                            name='endDate'
                            label='Fim da vigência'
                            variant='outlined'
                            className='!mr-5'
                            type='date'
                            value={formData.endDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if (e.target.value.length <= 10) {
                                handleTextFieldChange(e);
                              }
                            }}
                            error={!!errors.endDateError}
                            helperText={errors.endDateError}
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                        <FormControl fullWidth>
                          <TextField
                            name='endHours'
                            label='Hora'
                            variant='outlined'
                            type='time'
                            value={formData.endHours}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if (e.target.value.length <= 10) {
                                handleTextFieldChange(e);
                              }
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                      </Box>
                      {alertStartDate && (
                        <Fade in={alertStartDate}>
                          <Box className='bg-[#fef7e5] text-[#744600] p-5 rounded-3xl mt-5 text-[.9rem]'>
                            <Box className='flex flex-row items-center mb-2'>
                              <TbProgressAlert className="text-[#744600] text-[1.5rem] mr-2" />
                              <Typography variant="h6" component="h2">Atenção</Typography>
                            </Box>
                            <Typography className='!text-[.9rem]'>
                              O início e o fim da vigência definem o período durante o qual esta turma estará disponível.
                            </Typography>
                            <Typography className='!text-[.9rem] !mt-2'>
                              Após o término da vigência, os alunos associados às modalidades dessa turma perderão o acesso às dependências internas da academia.
                            </Typography>
                          </Box>
                        </Fade>
                      )}
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
                              color: (charactersRemaining[`observation`]) <= 10 ? 'red' : 'inherit',
                          }}
                          >
                          Restam {charactersRemaining[`observation`]} caracteres
                        </Box>
                      </FormControl>
                    </>
                  );

                case 1:
                  return (
                    <>
                      <Box className='w-full flex flex-row items-center'>
                        <FormControl fullWidth>
                          <TextField
                            name='studentsPerHour'
                            label='Qtde. de alunos por horário'
                            variant='outlined'
                            value={formData.studentsPerHour}
                            onChange={handleTextFieldChange}
                          />
                        </FormControl>
                        <Tooltip title="Deixe em branco para considerar o número de alunos como ilimitado.">
                          <IconButton
                            size="small"
                            className='!ml-3'
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
                      <Box className='flex justify-start items-center mt-5'>
                        <AiOutlineClockCircle className='w-[30px] h-[30px] text-[#424242]' />
                        <Box className='text-[1.3rem] ml-[1vw] text-[#424242]'>Horários para acesso</Box>
                        <Tooltip title="Se os horários não forem preenchidos, o sistema seguirá as configurações definidas pelo plano.">
                          <IconButton
                            size="small"
                            className='!ml-3'
                          >
                            <HelpOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Divider className='!my-5' />
                      <Box className="flex flex-wrap justify-between">
                        {daysOfWeek.map(({ key, label }) => (
                          <Box key={key} className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] mb-3">
                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 uppercase">{label}</Typography>
                            <Divider className="!my-3" />
                            {(formData[key] as string[]).map((slot: string, index: number) => (
                              <>
                                <Box key={index} className='flex flex-row items-center justify-between'>
                                  <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-[.1rem] !font-semibold">{slot}</Typography>
                                  <Button
                                    className='!min-w-5 !text-[1.5rem]'
                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                    sx={{
                                        color: '#4b5563',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                        '&:hover': {
                                            color: '#ff0336',
                                        },
                                    }}
                                    onClick={() => handleRemoveTimeSlot(key, index)}
                                  >
                                    <MdDeleteOutline />
                                  </Button>
                                </Box>
                                <Divider className="!my-3" />
                              </>
                            ))}
                            <Button
                              className="w-full"
                              style={{ textTransform: "none", fontFamily: "Poppins" }}
                              sx={{
                                color: "#4b5563",
                                fontWeight: "normal",
                                padding: 0,
                                transition: "transform 0.3s, background-color 0.3s, color 0.3s",
                                "&:hover": { color: "#ff0336" },
                              }}
                              onClick={() => handleOpenModal(key)}
                            >
                              Adicionar
                            </Button>
                          </Box>
                        ))}
                      </Box>
                      <Modal open={openModalHours} onClose={handleCloseModal}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="h6">Novo Horário para {daysOfWeek.find((day) => day.key === selectedDay)?.label ?? ""}</Typography>
                          <TextField
                            label="Horário de Início"
                            type="time"
                            fullWidth
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            className='!mt-5'
                          />
                          <TextField
                            label="Horário de Fim"
                            type="time"
                            fullWidth
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            className='!mt-5'
                            error={!!errors.endTimeError}
                            helperText={errors.endTimeError}
                          />
                          <Box className='mt-5 flex justify-between'>
                            <Button
                              onClick={handleCloseModal}
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
                              disabled={startTime === '' || endTime === ''}
                              variant="contained"
                              color="primary"
                              onClick={handleAddTimeSlot}
                              startIcon={<IoMdAddCircleOutline />}
                              sx={{
                                backgroundColor: '#ff0336',
                                color: '#fff',
                                height: '3rem',
                                '&:hover': {
                                  backgroundColor: '#e6001b',
                                },
                              }}
                            >
                              Adicionar
                            </Button>
                          </Box>
                        </Box>
                      </Modal>
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