import { Box, Button, CircularProgress, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight } from 'react-icons/md';
import { DrawerProps } from '../../../../common/types';
import { useEditTransactionForm } from '../../hooks';

export const EditTransactionDrawer = ({
  closeDrawer,
  data,
  refreshInternal,
  enqueueSnackbar
}: DrawerProps) => {

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    handleTextFieldChange,
    handleBack,
    handleContinue,
    handleFinish,
    handleSelectChange,
  } = useEditTransactionForm({ closeDrawer, enqueueSnackbar, data, refreshInternal });

  const totalAmount = formData.amount ? parseFloat(formData.amount.replace(/\./g, '').replace(',', '.')) : 0;
  const totalTransaction = parseFloat(data.amount.replace(/\./g, '').replace(',', '.')) || 0;

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Alterar Transação
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
          {dynamicSteps[activeStep] !== 'Opções' && (
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
                      <FormControl error={!!errors.paymentMethodError} required className='w-full'>
                        <InputLabel id="paymentMethod">Tipo de Transação</InputLabel>
                        <Select
                          labelId="paymentMethod"
                          id="paymentMethodSelect"
                          name="paymentMethod"
                          value={formData.type}
                          onChange={handleSelectChange}
                          label="Tipo de Transação"
                        >
                          <MenuItem value="" disabled>Selecione um método de recebimento</MenuItem>
                          <MenuItem value='CHARGE'>Cobrança</MenuItem>
                          <MenuItem value='PURCHASE'>Compra</MenuItem>
                          <MenuItem value='RECEIPT'>Recebimento</MenuItem>
                        </Select>
                        {errors.paymentMethodError && <FormHelperText>{errors.paymentMethodError}</FormHelperText>}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          // disabled={data.originPayment === ''}
                          required
                          name='description'
                          label={'Descrição'}
                          placeholder='0,00'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.description}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 9 }}
                          error={!!errors.descriptionError}
                          helperText={errors.descriptionError}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='amount'
                          label={'Valor da Transação'}
                          placeholder='0,00'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.amount}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 9 }}
                          error={!!errors.amountError}
                          helperText={errors.amountError}
                          InputProps={{
                            startAdornment:
                              <InputAdornment position="start">R$</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='dueDate'
                          label='Data de Vencimento'
                          variant='outlined'
                          className='!mt-5'
                          type='date'
                          value={formData.dueDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length <= 10) {
                              handleTextFieldChange(e);
                            }
                          }}
                          InputLabelProps={{ shrink: true }}
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
                  disabled={isLoading || !(totalAmount >= totalTransaction)}
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