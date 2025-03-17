import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, CircularProgress, Collapse, Divider, Fade, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, Modal, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { AiOutlineDollar } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle } from 'react-icons/md';
import { TbProgressAlert } from 'react-icons/tb';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { useStudentPlanCreateForm } from '../../hooks';

export const StudentPlanCreateDrawer = ({
  closeDrawer,
  enqueueSnackbar,
  data,
  refreshInternal,
}: DrawerProps) => {

const animatedComponents = makeAnimated();

  const {
    isLoading,
    isNoConfigPlans,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    responsePlansOptions,
    focusedFields,
    isFinishDisabled,
    handleFocus,
    handleTextFieldChange,
    handleSelectChange,
    handleFinish,
    charactersRemaining,
    handleCloseModal,
    handleRadioChange,
    selectedPaymentValue
  } = useStudentPlanCreateForm({ closeDrawer, enqueueSnackbar, data, refreshInternal });

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isNoConfigPlans}
        onClose={handleCloseModal}
        closeAfterTransition
        className='flex items-center justify-center'
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isNoConfigPlans}>
          <Box className="bg-white rounded-lg w-[500px] flex flex-col items-end">
            <Button
              onClick={handleCloseModal}
              className='flex flex-row items-center font-poppins !min-w-10 !mx-1 !rounded-full !min-h-10 top-3 right-2'
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
              <Box className="p-10 pt-2">
                <TbProgressAlert className="text-yellow-500 text-[5rem] mx-auto" />
                <Divider className='!my-5' />
                <Typography variant="h5" component="h2" className='text-center'>Atenção</Typography>
                <Typography sx={{ mt: 3 }}>
                  Para realizar a matrícula de um aluno, é necessário que pelo menos um plano esteja configurado.
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '16px' }}>
                  Para configurar os planos, acesse no menu à esquerda em: <strong>Administrativo &gt; Planos</strong>
                </Typography>
              </Box>
          </Box>
        </Fade>
      </Modal>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Associar Plano
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
                      <Box className='z-[3]'>
                        <InputLabel id="periodicityCode"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.periodicityCode || focusedFields.periodicityCode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          } ${focusedFields.periodicityCode ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                        >Plano <span style={{ color: 'red' }}>*</span></InputLabel>
                        <Select
                          placeholder={
                            focusedFields.periodicityCode
                              ? ''
                              : (
                                <>
                                  Plano <span style={{ color: 'red' }}>*</span>
                                </>
                              )
                          }
                          components={animatedComponents}
                          options={responsePlansOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('periodicityCode', true)}
                          onBlur={() => handleFocus('periodicityCode', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'periodicityCode')}
                          value={responsePlansOptions.find(option => option.value === formData.periodicityCode)}
                          className={`${errors.periodicityCodeError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.periodicityCodeError && <FormHelperText className='!text-[#d32f2f]'>{errors.periodicityCodeError}</FormHelperText>}
                      <Box className='flex justify-start items-center mt-5'>
                        <AiOutlineDollar className='w-[30px] h-[30px] text-[#424242]' />
                        <Box className='text-[1.3rem] ml-[1vw] text-[#424242]'>Cobrança</Box>
                        <Tooltip
                          title={
                            <>
                              Você pode definir a cobrança de duas formas: Imediata ou programada.<br /><br />
                              <b>Cobrança imediata:</b> O pagamento é processado imediatamente, e o vencimento ocorre no mesmo dia da matrícula.<br /><br />
                              <b>Cobrança programada:</b> Você define a data das próximas cobranças, com o primeiro pagamento realizado hoje.
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
                      <Box className='w-full flex flex-row ml-[0.7rem] justify-between'>
                        <Box className='w-full'>
                            <RadioGroup
                              name="paymentDay"
                              className='flex justify-between'
                              row
                              onChange={handleRadioChange}
                            >
                              <FormControlLabel
                                value="today"
                                control={<Radio color="primary" />}
                                label="Imediata"
                                className='bg-white md:w-[48%] w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-0'
                                checked={selectedPaymentValue === 'today'}
                              />
                              <FormControlLabel
                                value="programmed"
                                control={<Radio color="primary" />}
                                label="Programado"
                                className='bg-white md:w-[48%] md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-[0.7rem]'
                                checked={selectedPaymentValue === 'programmed'}
                              />
                            </RadioGroup>
                        </Box>
                      </Box>
                      <Collapse in={selectedPaymentValue === 'programmed'} timeout={300}>
                        <FormControl fullWidth>
                          <TextField
                            disabled={selectedPaymentValue !== 'programmed'}
                            name='paymentDay'
                            label='Data de Vencimento'
                            variant='outlined'
                            className='!mt-5'
                            type='date'
                            value={formData.paymentDay}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if (e.target.value.length <= 10) {
                                handleTextFieldChange(e);
                              }
                            }}
                            error={!!errors.paymentDayError}
                            helperText={errors.paymentDayError}
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                      </Collapse>
                      <FormControl fullWidth>
                        <TextField
                          name='detailsPlan'
                          multiline
                          rows={4}
                          label='Observações do Plano'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.detailsPlan}
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
                disabled={ isFinishDisabled || isLoading}
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