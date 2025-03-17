import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, CircularProgress, Collapse, Divider, Fade, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, Modal, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect } from 'react';
import { AiOutlineClockCircle, AiOutlineDollar, AiOutlineInfoCircle } from 'react-icons/ai';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoIosCloseCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdCurrencyExchange, MdDeleteOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { TbProgressAlert } from 'react-icons/tb';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { usePlanAlterForm } from '../../hooks';

export const PlanAlterDrawer = ({
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
    responsePeriodicityOptions,
    responseModalitiesOptions,
    responseCustomServiceOptions,
    focusedFields,
    handleFocus,
    handleTextFieldChange,
    handleSelectChange,
    handleBack,
    handleContinue,
    handleFinish,
    charactersRemaining,
    alertStartDate,
    handleRadioChange,
    selectedChargeValue,
    selectedFeesFrequencyValue,
    selectedCalculationBaseValue,
    planDataSummary,
    frequencyOptions,
    accessOptions,
    selectedHoursValue,
    daysOfWeek,
    openModalHours,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    handleOpenModal,
    handleCloseModal,
    handleAddTimeSlot,
    handleRemoveTimeSlot,
    selectedDay
  } = usePlanAlterForm({ closeDrawer, enqueueSnackbar, data, refresh });

  useEffect(() => {
    setActiveStep(initialStep);
  }, [initialStep, setActiveStep]);

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Alterar Plano
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
          {dynamicSteps[activeStep] !== 'Resumo' && (
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
                          placeholder='e.g.: Musculação'
                          name='name'
                          label='Nome do Plano'
                          variant='outlined'
                          value={formData.name}
                          onChange={handleTextFieldChange}
                          error={!!errors.nameError}
                          helperText={errors.nameError}
                          inputProps={{ maxLength: 100 }}
                        />
                      </FormControl>
                      <Box className='!mt-5 z-[4]'>
                        <InputLabel
                          id="periodicity"
                          className={`!absolute z-[1] bg-white ml-2 -mt-3 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.periodicity?.length || focusedFields.periodicity
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          } ${focusedFields.periodicity || errors.periodicityError ? '!text-[#d32f2f]' : '!text-[#0009]'}`}
                        >
                          Periodicidade <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <Select
                          placeholder={
                            focusedFields.periodicity
                              ? ''
                              : (
                                <>
                                  Periodicidade <span style={{ color: 'red' }}>*</span>
                                </>
                              )
                          }
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          options={responsePeriodicityOptions}
                          styles={customStyles}
                          isMulti
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('periodicity', true)}
                          onBlur={() => handleFocus('periodicity', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'periodicity')}
                          value={responsePeriodicityOptions.filter(option => formData.periodicity?.includes(option.value))}
                          className={`${errors.periodicityError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.periodicityError && <FormHelperText className='!text-[#d32f2f]'>{errors.periodicityError}</FormHelperText>}
                      <Box className='w-full flex flex-row justify-between z-[2] mt-5'>
                        <FormControl fullWidth>
                          <TextField
                            name='startDate'
                            label='Início da Vigência'
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
                            label='Fim da Vigência'
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
                              O início e o fim da vigência definem o período durante o qual este plano estará disponível para matrícula.
                            </Typography>
                            <Typography className='!text-[.9rem] !mt-2'>
                              Após o término da vigência, os alunos já matriculados permanecerão ativos neste plano, mas, se necessário, será possível migrá-los para outro plano durante o processo de edição da matrícula.
                            </Typography>
                          </Box>
                        </Fade>
                      )}
                      <FormControl fullWidth>
                        <TextField
                          name='observation'
                          multiline
                          rows={4}
                          label='Observações do Plano'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.observation}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 300 }}
                        />
                        <Box
                          className='mt-2 font-light text-[.9rem]'
                          sx={{
                            color: (charactersRemaining[`observation`] || 300) <= 10 ? 'red' : 'inherit',
                          }}
                        >
                          Restam {charactersRemaining[`observation`] || 300} caracteres
                        </Box>
                      </FormControl>
                    </>
                  );

                case 1:
                  return (
                    <>
                      <Box className='z-[2]'>
                        <InputLabel
                          id="frequency"
                          className={`!absolute z-[1] bg-white ml-2 -mt-3 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.frequency?.length || focusedFields.frequency
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          } ${focusedFields.frequency || errors.frequencyError ? '!text-[#d32f2f]' : '!text-[#0009]'}`}
                        >
                          Poderá frequentar <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <Select
                          placeholder={
                            focusedFields.frequency
                              ? ''
                              : (
                                <>
                                  Poderá frequentar <span style={{ color: 'red' }}>*</span>
                                </>
                              )
                          }
                          closeMenuOnSelect={true}
                          components={animatedComponents}
                          options={frequencyOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('frequency', true)}
                          onBlur={() => handleFocus('frequency', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'frequency')}
                          value={frequencyOptions.filter(option => formData.frequency?.includes(option.value))}
                          className={`${errors.frequencyError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.frequencyError && <FormHelperText className='!text-[#d32f2f]'>{errors.frequencyError}</FormHelperText>}
                      <Box className='mt-5 z-[1]'>
                        <InputLabel
                          id="access"
                          className={`!absolute z-[1] bg-white ml-2 -mt-3 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.access?.length || focusedFields.access
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          } ${focusedFields.access || errors.accessError ? '!text-[#d32f2f]' : '!text-[#0009]'}`}
                        >
                          Poderá acessar no mesmo dia <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <Select
                          placeholder={
                            focusedFields.access
                              ? ''
                              : (
                                <>
                                  Poderá acessar no mesmo dia <span style={{ color: 'red' }}>*</span>
                                </>
                              )
                          }
                          closeMenuOnSelect={true}
                          components={animatedComponents}
                          options={accessOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('access', true)}
                          onBlur={() => handleFocus('access', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'access')}
                          value={accessOptions.filter(option => formData.access?.includes(option.value))}
                          className={`${errors.accessError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.accessError && <FormHelperText className='!text-[#d32f2f]'>{errors.accessError}</FormHelperText>}
                      <Box className='flex justify-start items-center mt-5'>
                        <AiOutlineClockCircle className='w-[30px] h-[30px] text-[#424242]' />
                        <Box className='text-[1.3rem] ml-[1vw] text-[#424242]'>Horários para Acesso</Box>
                      </Box>
                      <Divider className='!my-5' />
                      <Box className='w-full flex flex-row ml-[0.7rem] justify-between'>
                        <Box className='w-full'>
                          <RadioGroup
                            name="hours"
                            className='flex justify-between'
                            row
                            onChange={handleRadioChange}
                          >
                            <FormControlLabel
                              value="isAllHours"
                              control={<Radio color="primary" />}
                              label="Qualquer horário"
                              className='bg-white md:w-[48%] w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-0'
                              checked={selectedHoursValue === 'isAllHours'}
                            />
                            <FormControlLabel
                              value="isCustomHours"
                              control={<Radio color="primary" />}
                              label="Definir por dia"
                              className='bg-white md:w-[48%] md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-[0.7rem]'
                              checked={selectedHoursValue === 'isCustomHours'}
                            />
                          </RadioGroup>
                        </Box>
                      </Box>
                      <Collapse in={selectedHoursValue === 'isCustomHours'} timeout={300}>
                        {errors.customHoursError && <FormHelperText className='!text-[#d32f2f] !mt-5'>{errors.customHoursError}</FormHelperText>}
                        <Box className="flex flex-wrap justify-between mt-5">
                          {daysOfWeek.map(({ key, label }) => (
                            <Box key={key} className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] mb-3">
                              <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 uppercase">{label}</Typography>
                              <Divider className="!my-3" />
                              {formData[key].map((slot, index) => (
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
                      </Collapse>
                    </>
                  );
                
                case 2:
                  return (
                    <>
                      <Box className='z-[2]'>
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
                      <Fade in={activeStep === 2}>
                        <Box className='bg-[#fef7e5] text-[#744600] p-5 rounded-3xl mt-5 text-[.9rem]'>
                          <Box className='flex flex-row items-center mb-2'>
                            <TbProgressAlert className="text-[#744600] text-[1.5rem] mr-2" />
                            <Typography variant="h6" component="h2">Muita atenção</Typography>
                          </Box>
                          <Typography className='!text-[.9rem]'>
                            Nesta etapa, você selecionará as modalidades que os alunos matriculados neste plano terão acesso. Vale lembrar que essas modalidades podem ter valores pré-definidos em suas configurações.
                          </Typography>
                          <Typography className='!text-[.9rem] !mt-2'>
                            <b>Por exemplo</b>, foram selecionadas as modalidades Musculação e Natação: se para Musculação você definiu o valor de R$ 5,00 e para Natação não houver valor pré-definido, o valor de R$ 5,00 será acrescentado ao valor final deste plano.
                          </Typography>
                          <Typography className='!text-[.9rem] !mt-2'>
                            Caso deseje definir valores individualmente para as modalidades, essa configuração pode ser feita no menu à esquerda em <b>Administrativo</b> &gt; <b>Modalidades</b>.
                          </Typography>
                        </Box>
                      </Fade>
                    </>
                  );

                case 3:
                  return (
                    <>
                      <Box className='z-[2]'>
                        <InputLabel
                          id="customService"
                          className={`!absolute z-[1] bg-white ml-2 -mt-3 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.customService?.length || focusedFields.customService
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          } ${focusedFields.customService || '!text-[#0009]'}`}
                        >
                          Serviços Personalizados
                        </InputLabel>
                        <Select
                          placeholder={
                            focusedFields.customService
                              ? ''
                              : (
                                <>
                                  Serviços Personalizados
                                </>
                              )
                          }
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={responseCustomServiceOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('customService', true)}
                          onBlur={() => handleFocus('customService', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'customService')}
                          value={responseCustomServiceOptions.filter(option => formData.customService?.includes(option.value))}
                        />
                      </Box>
                      <Fade in={activeStep === 3}>
                        <Box className='bg-[#cce8f4] text-[#4b7fa9] p-5 rounded-3xl my-5 text-[.9rem]'>
                          <Box className='flex flex-row items-center mb-2'>
                            <AiOutlineInfoCircle className="text-[#4b7fa9] text-[1.5rem] mr-2" />
                            <Typography variant="h6" component="h2">Informação</Typography>
                          </Box>
                          <Typography className='!text-[.9rem]'>
                            Esta etapa é opcional. Aqui, você pode selecionar serviços personalizados que os alunos matriculados neste plano terão acesso exclusivo. Vale lembrar que esses serviços podem ter valores pré-definidos em suas configurações.
                          </Typography>
                          <Typography className='!text-[.9rem] !mt-2'>
                            <b>Por exemplo</b>, foram selecionados os serviços Poltrona de Massagem e Sucos: se para Poltrona de Massagem você definiu o valor de R$ 1,00 e para Sucos não houver valor pré-definido, o valor de R$ 1,00 será acrescentado ao valor final deste plano.
                          </Typography>
                          <Typography className='!text-[.9rem] !mt-2'>
                            Caso deseje criar serviços personalizados, acesse o menu à esquerda em <b>Administrativo</b> &gt; <b>Serviços</b>.
                          </Typography>
                        </Box>
                      </Fade>
                    </>
                  );

                case 4:
                  return (
                    <>
                      <Box className='flex flex-col justify-between'>
                        <Box className='flex justify-start items-center'>
                          <AiOutlineDollar className='w-[30px] h-[30px] text-[#424242]' />
                          <Box className='text-[1.3rem] ml-[1vw] text-[#424242]'>Taxa de Matricula</Box>
                          <Tooltip
                            title={
                              <>
                                Você pode definir a taxa de matrícula de duas formas: aplicando o mesmo valor para todas as periodicidades através do plano ou configurando valores individuais para cada periodicidade.
                              </>
                            } placement="left" arrow>
                            <IconButton
                              size="small"
                              sx={{ marginLeft: '5px' }}
                            >
                              <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Divider className='!my-5' />
                        <Box className='w-full flex flex-row ml-[0.7rem] mb-5 justify-between'>
                          <Box className='w-full'>
                              <RadioGroup
                                name="charge"
                                className='flex justify-between'
                                row
                                onChange={handleRadioChange}
                              >
                                <FormControlLabel
                                  value="isPlan"
                                  control={<Radio color="primary" />}
                                  label="Plano"
                                  className='bg-white md:w-[48%] w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-0'
                                  checked={selectedChargeValue === 'isPlan'}
                                />
                                <FormControlLabel
                                  value="isPeriodicity"
                                  control={<Radio color="primary" />}
                                  label="Periodicidade"
                                  className='bg-white md:w-[48%] md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-[0.7rem]'
                                  checked={selectedChargeValue === 'isPeriodicity'}
                                />
                              </RadioGroup>
                          </Box>
                        </Box>
                        <Collapse in={selectedChargeValue === 'isPlan'} timeout={300}>
                          <FormControl fullWidth>
                            <TextField
                              disabled={selectedChargeValue !== 'isPlan'}
                              name='chargeRegistration'
                              placeholder='0,00'
                              label='Taxa de Matrícula'
                              variant='outlined'
                              className='!mb-5'
                              value={formData.chargeRegistration}
                              onChange={handleTextFieldChange}
                              inputProps={{ maxLength: 9 }}
                              InputProps={{
                                startAdornment:
                                  <InputAdornment position="start">R$</InputAdornment>
                              }}
                            />
                          </FormControl>
                        </Collapse>
                        <Box className='flex justify-start items-center'>
                          <MdCurrencyExchange className='w-[30px] h-[30px] text-[#424242]' />
                          <Box className='text-[1.3rem] ml-[1vw] text-[#424242]'>Juros por Atraso</Box>
                          <Tooltip
                            title={
                              <>
                                Os juros por atraso podem ser configurados de duas formas:
                                <br /><br />
                                  <b>Apenas uma vez:</b> O valor será cobrado apenas uma única vez após o vencimento.<br /><br />
                                  <b>Diária:</b> O valor será cobrado diariamente e acumulado a cada dia de atraso.
                              </>
                            } placement="left" arrow>
                            <IconButton
                              size="small"
                              sx={{ marginLeft: '5px' }}
                            >
                              <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Divider className='!my-5' />
                        <Box className='w-full flex flex-row ml-[0.7rem] mb-5 justify-between'>
                          <Box className='w-full'>
                            <Box className='text-[1rem] -ml-[.8vw] text-[#424242]'>Frequência da Cobrança:</Box>
                            <RadioGroup
                              name="feesFrequency"
                              className='flex justify-between mt-3'
                              row
                              onChange={handleRadioChange}
                            >
                              <FormControlLabel
                                value="isUnique"
                                control={<Radio color="primary" />}
                                label="Apenas uma vez"
                                className='bg-white md:w-[48%] w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-0'
                                checked={selectedFeesFrequencyValue === 'isUnique'}
                              />
                              <FormControlLabel
                                value="isDaily"
                                control={<Radio color="primary" />}
                                label="Diária"
                                className='bg-white md:w-[48%] md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-[0.7rem]'
                                checked={selectedFeesFrequencyValue === 'isDaily'}
                              />
                            </RadioGroup>
                            <Box className='text-[1rem] -ml-[.8vw] text-[#424242] mt-5'>Base de Cálculo:</Box>
                            <RadioGroup
                              name="calculationBase"
                              className='flex justify-between mt-3'
                              row
                              onChange={handleRadioChange}
                            >
                              <FormControlLabel
                                value="isValue"
                                control={<Radio color="primary" />}
                                label="Valor fixo"
                                className='bg-white md:w-[48%] w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-0'
                                checked={selectedCalculationBaseValue === 'isValue'}
                              />
                              <FormControlLabel
                                value="isPercentage"
                                control={<Radio color="primary" />}
                                label="Porcentagem"
                                className='bg-white md:w-[48%] md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-[0.7rem]'
                                checked={selectedCalculationBaseValue === 'isPercentage'}
                              />
                            </RadioGroup>
                          </Box>
                        </Box>
                        <Box className='flex justify-start items-center'>
                          <FaCalendarDays className='w-[30px] h-[30px] text-[#424242]' />
                          <Box className='text-[1.3rem] ml-[1vw] text-[#424242]'>Periodicidade</Box>
                        </Box>
                        <Divider className='!my-5' />
                        {formData.periodicityDetails.map((selectedPeriodicity) => {
                          return (
                            <Box key={selectedPeriodicity.value} className='rounded-xl w-full mb-5 p-5 border border-[#EAECF0]'>
                              <Box className='flex flex-row justify-between'>
                                <Typography className='text-neutral-500'>{selectedPeriodicity.label}</Typography>
                              </Box>
                              <Divider className='!my-5' />
                              <Box className='flex md:flex-row flex-col justify-between'>
                                <Box className='md:w-[48%] w-full'>
                                  <FormControl fullWidth>
                                    <TextField
                                      required
                                      name={`amount-${selectedPeriodicity.value}`}
                                      label='Valor'
                                      placeholder='0,00'
                                      variant='outlined'
                                      className='!mt-1'
                                      value={selectedPeriodicity?.amount || ''}
                                      onChange={handleTextFieldChange}
                                      error={!!errors[`amount-${selectedPeriodicity.value}-Error`]}
                                      helperText={errors[`amount-${selectedPeriodicity.value}-Error`]}
                                      inputProps={{ maxLength: 9 }}
                                      InputProps={{
                                        startAdornment:
                                          <InputAdornment position="start">R$</InputAdornment>
                                      }}
                                    />
                                  </FormControl>
                                </Box>
                                <Fade in={selectedChargeValue === 'isPeriodicity'} timeout={300}>
                                  <Box className='md:w-[48%] w-full md:mt-0 mt-5'>
                                    <FormControl fullWidth>
                                      <TextField
                                        disabled={selectedChargeValue !== 'isPeriodicity'}
                                        name={`charge-${selectedPeriodicity.value}`}
                                        label='Taxa de Matrícula'
                                        placeholder='0,00'
                                        variant='outlined'
                                        className='!mt-1'
                                        value={selectedPeriodicity?.charge || ''}
                                        onChange={handleTextFieldChange}
                                        inputProps={{ maxLength: 9 }}
                                        InputProps={{
                                          startAdornment:
                                            <InputAdornment position="start">R$</InputAdornment>
                                        }}
                                      />
                                    </FormControl>
                                  </Box>
                                </Fade>
                              </Box>
                              <FormControl fullWidth>
                                <TextField
                                  name={`fees-${selectedPeriodicity.value}`}
                                  label='Juros por Atraso'
                                  placeholder={selectedCalculationBaseValue === 'isValue' ? '0,00' : '0'}
                                  variant='outlined'
                                  className='!mt-5'
                                  value={selectedPeriodicity?.fees || ''}
                                  onChange={handleTextFieldChange}
                                  inputProps={{
                                    maxLength: selectedCalculationBaseValue === 'isValue' ? 9 : 3,
                                  }}
                                  InputProps={{
                                    startAdornment:
                                      selectedCalculationBaseValue === 'isValue' && (
                                        <InputAdornment position="start">R$</InputAdornment>
                                      ),
                                    endAdornment:
                                      selectedCalculationBaseValue === 'isPercentage' && (
                                        <InputAdornment position="end">%</InputAdornment>
                                      ),
                                  }}
                                />
                              </FormControl>
                              <Box className='w-full flex flex-row justify-between z-[2] mt-5'>
                                <FormControl fullWidth>
                                  <TextField
                                    name={`startDate-${selectedPeriodicity.value}`}
                                    label='Início da Vigência'
                                    variant='outlined'
                                    className='!mr-5'
                                    type='date'
                                    value={selectedPeriodicity?.startDate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      if (e.target.value.length <= 10) {
                                        handleTextFieldChange(e);
                                      }
                                    }}
                                    error={!!errors[`startDate-${selectedPeriodicity.value}-Error`]}
                                    helperText={errors[`startDate-${selectedPeriodicity.value}-Error`]}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </FormControl>
                                <FormControl fullWidth>
                                  <TextField
                                    name={`startHours-${selectedPeriodicity.value}`}
                                    label='Hora'
                                    variant='outlined'
                                    type='time'
                                    value={selectedPeriodicity?.startHours}
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
                                    name={`endDate-${selectedPeriodicity.value}`}
                                    label='Fim da Vigência'
                                    variant='outlined'
                                    className='!mr-5'
                                    type='date'
                                    value={selectedPeriodicity?.endDate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      if (e.target.value.length <= 10) {
                                        handleTextFieldChange(e);
                                      }
                                    }}
                                    error={!!errors[`endDate-${selectedPeriodicity.value}-Error`]}
                                    helperText={errors[`endDate-${selectedPeriodicity.value}-Error`]}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </FormControl>
                                <FormControl fullWidth>
                                  <TextField
                                    name={`endHours-${selectedPeriodicity.value}`}
                                    label='Hora'
                                    variant='outlined'
                                    type='time'
                                    value={selectedPeriodicity?.endHours}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      if (e.target.value.length <= 10) {
                                        handleTextFieldChange(e);
                                      }
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </FormControl>
                              </Box>
                              <FormControl fullWidth>
                                <TextField
                                  name={`observation-${selectedPeriodicity.value}`}
                                  multiline
                                  rows={4}
                                  label='Observações'
                                  variant='outlined'
                                  className='!mt-5'
                                  value={selectedPeriodicity?.observation || ''}
                                  onChange={handleTextFieldChange}
                                  inputProps={{ maxLength: 300 }}
                                />
                                <Box
                                  className='mt-2 font-light text-[.9rem]'
                                  sx={{
                                    color: (charactersRemaining[`observation-${selectedPeriodicity.value}`] || 300) <= 10 ? 'red' : 'inherit',
                                  }}
                                >
                                  Restam {charactersRemaining[`observation-${selectedPeriodicity.value}`] || 300} caracteres
                                </Box>
                              </FormControl>
                            </Box>
                          );
                        })}
                      </Box>
                    </>
                  );

                case 5:
                  return (
                    <>
                      <Box>
                        {planDataSummary?.setDataPlanSummary && (
                          <Box className='flex flex-col rounded-xl w-full p-5 border border-[#EAECF0]'>
                            <Box className='flex flex-col'>
                              <Typography className='!text-[.9rem] !font-light'>Nome do Plano</Typography>
                              <Typography className='!font-light !text-[1.5rem]'>{planDataSummary.setDataPlanSummary.name}</Typography>
                            </Box>
                            <Divider className='!my-5' />
                            <Typography className='!text-[.9rem] !mb-3'>Modalidades</Typography>
                            <Box className='flex flex-col'>
                              {planDataSummary.setDataPlanSummary.modalities.map((modality, index) => (
                                <>
                                  <Box key={index} className="w-full flex flex-row justify-between items-center">
                                    <Typography className="!font-light">{modality.label}</Typography>
                                    <Typography className="!font-light !text-[1.1rem] !font-poppins">
                                      R$ {modality.amount ? modality.amount : '0,00'}
                                    </Typography>
                                  </Box>
                                  <Divider className='!my-2' />
                                </>
                              ))}
                            </Box>
                            <Typography className='!text-[.9rem] !mb-3 !mt-5'>Serviços Personalizados</Typography>
                            <Box className='flex flex-col'>
                            {planDataSummary.setDataPlanSummary.customService.length === 0 ? (
                              <Box className="w-full flex flex-row justify-between items-center">
                                <Typography className="!font-light">Nenhum serviço personalizado</Typography>
                              </Box>
                            ) : (
                              planDataSummary.setDataPlanSummary.customService.map((service, index) => (
                                <>
                                  <Box key={index} className="w-full flex flex-row justify-between items-center">
                                    <Typography className="!font-light">{service.label}</Typography>
                                    <Typography className="!font-light !text-[1.1rem] !font-poppins">
                                      R$ {service.amount ? service.amount : 'R$ 0,00'}
                                    </Typography>
                                  </Box>
                                  <Divider className='!my-2' />
                                </>
                              ))
                            )}
                            </Box>
                          </Box>
                        )}
                        {Array.isArray(planDataSummary?.setDataPlanSummary?.periodicities) &&
                          planDataSummary.setDataPlanSummary.periodicities.length > 0 ? (
                            planDataSummary.setDataPlanSummary.periodicities.map((periodicity, index) => (
                              <Box
                                key={index}
                                className="flex flex-col rounded-xl w-full mt-5 p-5 border border-[#EAECF0]"
                              >
                                <Box className="flex flex-col">
                                  <Typography className="!text-[.9rem] !font-light">Periodicidade</Typography>
                                  <Typography className="!font-light !text-[1.5rem]">
                                    {periodicity.name}
                                  </Typography>
                                </Box>
                                <Divider className="!my-5" />
                                <Box className="flex flex-col">
                                  <Box className="w-full flex flex-row justify-between items-center">
                                    <Typography className="!font-light">
                                      Taxa de Matrícula
                                      <Tooltip
                                        title={
                                          <>
                                            A taxa de matrícula é um valor único cobrado no momento da
                                            adesão ao plano, garantindo sua inscrição inicial.<br />
                                            <br />
                                            Não haverá cobranças adicionais dessa taxa no futuro.
                                          </>
                                        }
                                        placement="left"
                                        arrow
                                      >
                                        <IconButton
                                          size="small"
                                          className="!-mt-1"
                                          sx={{ marginLeft: "5px" }}
                                        >
                                          <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </Typography>
                                    <Typography className="!font-light !text-[1.1rem] !font-poppins">
                                      R$ {periodicity.charge || "0,00"}
                                    </Typography>
                                  </Box>
                                  <Box className="w-full flex flex-row justify-between items-center">
                                    <Typography className="!font-light">
                                      Juros por atraso
                                      <Tooltip
                                        title={
                                          <>
                                            O juros por atraso será aplicado apenas se o aluno não realizar o pagamento da matrícula até a data de vencimento.
                                            </>
                                        }
                                        placement="left"
                                        arrow
                                      >
                                        <IconButton
                                          size="small"
                                          className="!-mt-1"
                                          sx={{ marginLeft: "5px" }}
                                        >
                                          <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </Typography>
                                    <Typography className="!font-light !text-[1.1rem] !font-poppins">
                                      R$ {periodicity.fees || "0,00"}
                                    </Typography>
                                  </Box>
                                  <Divider className="!my-5" />
                                  <Typography className="!text-[.9rem] !font-light">
                                    Os valores abaixo serão somados ao valor final:
                                  </Typography>
                                  <Box className="w-full flex flex-row justify-between items-center mt-2.5">
                                    <Typography className="!font-light">
                                      {isNaN(Number(periodicity.name.charAt(0))) 
                                        ? `Valor ${periodicity.name}` 
                                        : `Valor a cada ${periodicity.name.toLowerCase()}`}
                                    </Typography>
                                    <Typography className="!font-light !text-[1.1rem] !font-poppins">
                                      R$ {periodicity.amount}
                                    </Typography>
                                  </Box>
                                  <Box className="w-full flex flex-row justify-between items-center">
                                    <Typography className="!font-light">Total de Modalidades</Typography>
                                    <Typography className="!font-light !text-[1.1rem] !font-poppins">
                                      {periodicity.totalModalities || "0,00"}
                                    </Typography>
                                  </Box>
                                  <Box className="w-full flex flex-row justify-between items-center">
                                    <Typography className="!font-light">
                                      Total de Serviços Personalizados
                                    </Typography>
                                    <Typography className="!font-light !text-[1.1rem] !font-poppins">
                                      {periodicity.totalCustomService || "0,00"}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Divider className="!my-2" />
                                <Box className="w-full flex flex-row justify-end items-end">
                                  <Typography className="!font-light !mr-2">Total:</Typography>
                                  <Typography className="!font-light !text-[1.1rem] !font-poppins">
                                  {(periodicity.totalValue || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </Typography>
                                </Box>
                                <Divider className="!my-2" />
                                <Box className="w-full flex flex-row justify-end items-end mt-2">
                                  <Typography className="!font-light !mr-2">Valor final:</Typography>
                                  <Typography className="!font-light !text-[1.3rem] !font-poppins">
                                    {(periodicity.totalValue || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </Typography>
                                </Box>
                              </Box>
                            ))
                          ) : (
                            <Typography className="!text-[1rem] !font-light text-center !mt-5">
                              Ocorreu um erro ao recuperar as periodicidades.
                            </Typography>
                          )}
                      </Box>
                    </>
                  );

                default:
                  return null;
              }
            })()}

            <Box className={`flex flex-row justify-between ${activeStep === 3 ? 'mt-3' : 'mt-8'}`}>
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