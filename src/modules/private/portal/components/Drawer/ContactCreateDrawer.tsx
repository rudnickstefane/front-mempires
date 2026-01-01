import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, TextField, Tooltip, Typography } from '@mui/material';
import { FiPhoneCall } from "react-icons/fi";
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight, MdOutlineMarkEmailRead, MdOutlineMobileFriendly } from 'react-icons/md';
import { SiWhatsapp } from "react-icons/si";
import Select from 'react-select';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { useContactCreateForm } from '../../hooks/useContactCreateForm';

export const ContactCreateDrawer = ({
  closeDrawer,
  enqueueSnackbar
}: DrawerProps) => {

  const {
    isLoading,
    isScheduling,
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
    handleContactSelected,
    handleSchedulingToggle,
    handleBack,
    handleContinue,
    handleFinish
  } = useContactCreateForm({ closeDrawer, enqueueSnackbar });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Novo Contato
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
                      <Button
                        variant="outlined"
                        startIcon={<MdOutlineMobileFriendly className='mx-2.5'/>}
                        className='flex flex-row text-left !justify-start'
                        onClick={() => handleContactSelected('Aplicativo')}
                        sx={{
                          textTransform: 'none',
                          backgroundColor: 'transparent',
                          color: '#4b5563',
                          borderColor: '#0000003b',
                          '&:hover': {
                            backgroundColor: '#d4d4d8',
                            borderColor: '#4b5563',
                          },
                        }}
                      >
                        <Box className='flex flex-col font-poppins'>Aplicativo
                          <Typography className='!text-[0.8rem]'>
                            Envie notificações para o Aplicativo do Aluno
                          </Typography>
                        </Box>
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<MdOutlineMarkEmailRead className='mx-2.5'/>}
                        className='flex flex-row text-left !justify-start !mt-5'
                        onClick={() => handleContactSelected('E-mail')}
                        sx={{
                          textTransform: 'none',
                          backgroundColor: 'transparent',
                          color: '#4b5563',
                          borderColor: '#0000003b',
                          '&:hover': {
                            backgroundColor: '#d4d4d8',
                            borderColor: '#4b5563',
                          },
                        }}
                      >
                        <Box className='flex flex-col font-poppins'>E-mail
                          <Typography className='!text-[0.8rem]'>
                            Agende e registre o envio de e-mails
                          </Typography>
                        </Box>
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<FiPhoneCall className='mx-2.5'/>}
                        className='flex flex-row text-left !justify-start !mt-5'
                        onClick={() => handleContactSelected('Ligação')}
                        sx={{
                          textTransform: 'none',
                          backgroundColor: 'transparent',
                          color: '#4b5563',
                          borderColor: '#0000003b',
                          '&:hover': {
                            backgroundColor: '#d4d4d8',
                            borderColor: '#4b5563',
                          },
                        }}
                      >
                        <Box className='flex flex-col font-poppins'>Ligação
                          <Typography className='!text-[0.8rem]'>
                            Agende chamadas e salve os detalhes da conversa
                          </Typography>
                        </Box>
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<SiWhatsapp className='mx-2.5'/>}
                        className='flex flex-row text-left !justify-start !mt-5'
                        onClick={() => handleContactSelected('WhatsApp')}
                        sx={{
                          textTransform: 'none',
                          backgroundColor: 'transparent',
                          color: '#4b5563',
                          borderColor: '#0000003b',
                          '&:hover': {
                            backgroundColor: '#d4d4d8',
                            borderColor: '#4b5563',
                          },
                        }}
                      >
                        <Box className='flex flex-col font-poppins'>WhatsApp
                          <Typography className='!text-[0.8rem]'>
                            Registre contatos e converse pelo WhatsApp Web
                          </Typography>
                        </Box>
                      </Button>
                    </>
                  );
                
                case 1:
                  return (
                    <>
                      <Box className='z-[3]'>
                        <InputLabel id="searchStudent"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.searchStudent || focusedFields.searchStudent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          } ${focusedFields.searchStudent ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                        >Digite o Nome, CPF ou Matrícula *</InputLabel>
                        <Select
                          placeholder={focusedFields.searchStudent ? '' : 'Digite o Nome, CPF ou Matrícula *'}
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
                      <Box className='!mt-5 z-[3]'>
                        <InputLabel id="reason"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.reason || focusedFields.reason ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          } ${focusedFields.reason ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                        >Motivo *</InputLabel>
                        <Select
                          placeholder={focusedFields.reason ? '' : 'Motivo *'}
                          components={animatedComponents}
                          options={searchStudentOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('reason', true)}
                          onBlur={() => handleFocus('reason', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'reason')}
                          value={searchStudentOptions.find(option => option.value === formData.reason)}
                          className={`${errors.reasonError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.reasonError && <FormHelperText className='!text-[#d32f2f]'>{errors.reasonError}</FormHelperText>}
                      <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                        <Box className='md:w-[54%] w-full'>
                          <InputLabel id="priority"
                            className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                              formData.priority || focusedFields.priority ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            } ${focusedFields.priority ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                          >Prioridade</InputLabel>
                          <Select
                            placeholder={focusedFields.priority ? '' : 'Prioridade'}
                            components={animatedComponents}
                            options={searchStudentOptions}
                            styles={customStyles}
                            noOptionsMessage={customNoOptionsMessage}
                            onFocus={() => handleFocus('priority', true)}
                            onBlur={() => handleFocus('priority', false)}
                            onChange={(newValue) => handleSelectChange(newValue, 'priority')}
                            value={searchStudentOptions.find(option => option.value === formData.priority)}
                            className={`${errors.priorityError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                          />
                        {errors.priorityError && <FormHelperText className='!text-[#d32f2f]'>{errors.priorityError}</FormHelperText>}
                        </Box>
                        <Box className='md:w-[42.7%] md:mt-2 md:ml-4 w-full mt-5'>
                          <FormControl component="fieldset" className="flex justify-center" fullWidth>
                              <FormControlLabel
                                control={
                                <Checkbox 
                                  checked={isScheduling}
                                  value=''
                                  onChange={handleSchedulingToggle} 
                                />} 
                                  label={'Agendar Contato'}
                              />
                          </FormControl>
                        </Box>
                      </Box>

                      {formData.contactType === 'E-mail' && (
                        <>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='email'
                              label='E-mail'
                              variant='outlined'
                              className='!mt-5'
                              value={formData.email}
                              onChange={handleTextFieldChange}
                              error={!!errors.emailError}
                              helperText={errors.emailError}
                            />
                          </FormControl>
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
                        </>
                      )}

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
                          placeholder='Esta informação será exibida nos detalhes deste contato.'
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

            {activeStep === dynamicSteps.indexOf('Agendamento') && (
              <>
                <Box className='z-[3]'>
                  <InputLabel id="responsible"
                    className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                      formData.responsible || focusedFields.responsible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } ${focusedFields.responsible ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                  >Responsável</InputLabel>
                  <Box className='w-full flex flex-row items-center'>
                    <Select
                      placeholder={focusedFields.responsible ? '' : 'Responsável'}
                      components={animatedComponents}
                      options={searchStudentOptions}
                      styles={customStyles}
                      className='w-full'
                      noOptionsMessage={customNoOptionsMessage}
                      onFocus={() => handleFocus('responsible', true)}
                      onBlur={() => handleFocus('responsible', false)}
                      onChange={(newValue) => handleSelectChange(newValue, 'responsible')}
                      value={searchStudentOptions.find(option => option.value === formData.responsible)}
                    />
                    <Tooltip title="Deixe em branco para considerar você como responsável.">
                      <IconButton
                        size="small"
                        className='!ml-3'
                      >
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                    <Box className='md:w-[48%] w-full'>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='date'
                          label='Data'
                          variant='outlined'
                          type='date'
                          value={formData.date}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length <= 10) {
                              handleTextFieldChange(e);
                            }
                          }}
                          error={Boolean(errors.dateError)}
                          helperText={errors.dateError}
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>
                  </Box>
                  <Box className='md:w-[48%] md:mt-0 md:ml-4 w-full mt-5'>
                    <FormControl fullWidth>
                      <TextField
                        required
                        name='hours'
                        label='Hora'
                        value={formData.hours}
                        onChange={handleTextFieldChange}
                        variant='outlined'
                        error={!!errors.hoursError}
                        helperText={errors.hoursError}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </>
            )}

            <Box className='flex flex-row justify-between mt-8'>
              {activeStep === 0 && (
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
                      height: '3rem',
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
              {activeStep > 0 && activeStep < dynamicSteps.length - 1 && (
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