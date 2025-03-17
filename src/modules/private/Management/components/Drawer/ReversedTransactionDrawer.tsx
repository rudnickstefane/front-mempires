import { Box, Button, CircularProgress, Divider, FormControl, InputAdornment, TextField, Typography } from '@mui/material';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoCardOutline } from 'react-icons/io5';
import { MdCheckCircle, MdKeyboardArrowRight, MdOutlinePix } from 'react-icons/md';
import { TbTransformFilled } from 'react-icons/tb';
import { DrawerProps } from '../../../../common/types';
import { useReversedTransactionForm } from '../../hooks';
import { PaymentBadge, PaymentNameBadge } from '../Badges/PaymentBadge';

export const ReversedTransactionDrawer = ({
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
    handleReversedSelected,
    handleBack,
    handleContinue,
    handleFinish,
    charactersRemaining
  } = useReversedTransactionForm({ closeDrawer, enqueueSnackbar, data, refreshInternal });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Reembolsar
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
                      <Button
                        variant="outlined"
                        startIcon={<AiOutlineUserSwitch className='mx-2.5'/>}
                        className='flex flex-row text-left !justify-start'
                        onClick={() => handleReversedSelected('Manual')}
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
                        <Box className='flex flex-col font-poppins'>Manual
                          <Typography className='!text-[0.8rem]'>
                            Realizado pessoalmente, com devolução imediata do valor
                          </Typography>
                        </Box>
                      </Button>
                      <Button
                        variant="outlined"
                        disabled
                        startIcon={<IoCardOutline className='mx-2.5'/>}
                        className='flex flex-row text-left !justify-start !mt-5'
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
                        <Box className='flex flex-col font-poppins'>Cartão
                          <Typography className='!text-[0.8rem]'>
                            O valor será estornado no cartão utilizado na transação
                          </Typography>
                          <Box className='absolute -mt-4 bg-white color-primary py-1 px-3 font-sans rounded-lg text-[.65rem] uppercase border border-[#ff0336] right-2'>Em Breve</Box>
                        </Box>
                      </Button>
                      <Button
                        variant="outlined"
                        disabled
                        startIcon={<MdOutlinePix className='mx-2.5'/>}
                        className='flex flex-row text-left !justify-start !mt-5'
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
                        <Box className='flex flex-col font-poppins'>Pix
                          <Typography className='!text-[0.8rem]'>
                            O reembolso será enviado para a chave PIX informada
                          </Typography>
                          <Box className='absolute -mt-4 bg-white color-primary py-1 px-3 font-sans rounded-lg text-[.65rem] uppercase border border-[#ff0336] right-2'>Em Breve</Box>
                        </Box>
                      </Button>
                      <Button
                        variant="outlined"
                        disabled
                        startIcon={<TbTransformFilled className='mx-2.5'/>}
                        className='flex flex-row text-left !justify-start !mt-5'
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
                        <Box className='flex flex-col font-poppins'>Transferência Bancária
                          <Typography className='!text-[0.8rem]'>
                            O valor será transferido para a conta bancária indicada
                          </Typography>
                          <Box className='absolute -mt-4 bg-white color-primary py-1 px-3 font-sans rounded-lg text-[.65rem] uppercase border border-[#ff0336] right-2'>Em Breve</Box>
                        </Box>
                      </Button>
                    </>
                  );
                
                case 1:
                  return (
                    <>
                      <Box className='flex flex-col rounded-xl w-full p-1'>
                        <Box className='flex flex-col'>
                          <Typography className='!font-light !text-[1.5rem]'>Informações</Typography>
                        </Box>
                        <Divider className='!my-5' />
                        <Box className='flex flex-col'>
                          <Box className="w-full flex flex-row justify-between items-center">
                            <Typography className="!font-light text-gray-600">Descrição</Typography>
                            <Typography className="!text-[1.1rem]">{data.description}</Typography>
                          </Box>
                          <Box className="w-full flex flex-row justify-between items-center mt-3">
                            <Typography className="!font-light text-gray-600">Número da Transação</Typography>
                            <Typography className="!text-[1.1rem]">TRA-{data.transactionCode}</Typography>
                          </Box>
                          <Box className="w-full flex flex-row justify-between items-center mt-3">
                            <Typography className="!font-light text-gray-600">Status</Typography>
                            <Typography className="!text-[.9rem]">
                              <PaymentBadge payment={data.paymentStatus} />
                            </Typography>
                          </Box>
                          <Box className="w-full flex flex-row justify-between items-center mt-3">
                            <Typography className="!font-light text-gray-600">Valor Pago em <PaymentNameBadge payment={data.paymentMethod} /></Typography>
                            <Typography className="!text-[1.1rem] !font-poppins">R$ {data.mainAmount}</Typography>
                          </Box>
                          {data.secondaryAmount && (
                            <Box className="w-full flex flex-row justify-between items-center mt-3">
                              <Typography className="!font-light text-gray-600">Valor Pago em <PaymentNameBadge payment={data.secondaryPaymentMethod} /></Typography>
                              <Typography className="!text-[1.1rem] !font-poppins">R$ {data.secondaryAmount}</Typography>
                            </Box>
                          )}
                          <Box className='flex flex-row justify-between items-center mt-3'>
                            <Typography className="!font-light text-gray-600">Valor Total</Typography>
                            <Typography className='!text-[1.1rem]'>
                              R$ {
                              (() => {
                                const mainAmount = parseFloat(data.mainAmount.replace(/\./g, '').replace(',', '.')) || 0;
                                const secondaryAmount = parseFloat(data.secondaryAmount.replace(/\./g, '').replace(',', '.')) || 0;
                                const total = mainAmount + secondaryAmount;

                                // Formata o total como moeda (exemplo: "2.155,67")
                                return total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                              })()
                            }
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='reversed'
                          label='Valor a Reembolsar'
                          placeholder='0,00'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.reversed}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 9 }}
                          error={!!errors.reversedError}
                          helperText={errors.reversedError}
                          InputProps={{
                            startAdornment:
                              <InputAdornment position="start">R$</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          placeholder='Esta informação será exibida nos detalhes da transação.'
                          name='reversedReason'
                          multiline
                          rows={4}
                          label='Motivo'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.reversedReason}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 300 }}
                          error={!!errors.reversedReasonError}
                          helperText={errors.reversedReasonError}
                        />
                        <Box
                          className='mt-2 font-light text-[.9rem]'
                          sx={{
                            color: (charactersRemaining['reversedReason'] || 300) <= 10 ? 'red' : 'inherit',
                          }}
                        >
                          Restam {charactersRemaining['reversedReason'] || 300} caracteres
                        </Box>
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