import { Box, Button, Checkbox, CircularProgress, Collapse, Divider, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { GiReceiveMoney } from 'react-icons/gi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoCardOutline } from 'react-icons/io5';
import { MdCheckCircle, MdCloudDone, MdCloudUpload, MdDeleteOutline, MdKeyboardArrowRight, MdOutlinePix } from 'react-icons/md';
import { SiFirewalla } from 'react-icons/si';
import { TbTransformFilled } from 'react-icons/tb';
import styled from 'styled-components';
import { DrawerProps } from '../../../../common/types';
import { useReceiveTransactionForm } from '../../hooks';
import { PaymentBadge } from '../Badges/PaymentBadge';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ReceiveTransactionDrawer = ({
  closeDrawer,
  data,
  refreshInternal,
  enqueueSnackbar,
  refresh
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
    handlePaymentMethodToggle,
    handleReversedSelected,
    combinePaymentMethod,
    getPaymentMethodLabel,
    handleProofPaymentUpload,
    proofPayment,
    fileName,
    handleDeleteProofPayment,
    handleRadioChange,
    selectedRewardsValue
  } = useReceiveTransactionForm({ closeDrawer, enqueueSnackbar, data, refreshInternal, refresh });

  const totalAmount = formData.amount ? parseFloat(formData.amount.replace(/\./g, '').replace(',', '.')) : 0;
  const totalTransaction = parseFloat(data.amount.replace(/\./g, '').replace(',', '.')) || 0;

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Receber Transação
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
                        startIcon={<GiReceiveMoney className='mx-2.5'/>}
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
                            Recebimento feito manualmente, sem integração com o sistema
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
                            Recebimento realizado com cartão de crédito ou débito
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
                            Recebimento instantâneo via chave PIX, disponível 24/7
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
                            Recebimento via transferência entre contas bancárias
                          </Typography>
                          <Box className='absolute -mt-4 bg-white color-primary py-1 px-3 font-sans rounded-lg text-[.65rem] uppercase border border-[#ff0336] right-2'>Em Breve</Box>
                        </Box>
                      </Button>
                    </>
                  );

                case 1:
                  return (
                    <>
                      <Box className='flex flex-col'>
                        <Typography className='!font-light !text-[1.5rem]'>Forma de Recebimento</Typography>
                      </Box>
                      <Divider className='!my-5' />
                      <FormControl error={!!errors.paymentMethodError} required className='w-full'>
                        <InputLabel id="paymentMethod">Método</InputLabel>
                        <Select
                          labelId="paymentMethod"
                          id="paymentMethodSelect"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleSelectChange}
                          label="Método"
                        >
                          <MenuItem value="" disabled>Selecione um método de recebimento</MenuItem>
                          <MenuItem value='CASH'>Dinheiro</MenuItem>
                          <MenuItem value='CARD'>Cartão</MenuItem>
                          <MenuItem value='BANK_TRANSFER'>Transferência Bancária</MenuItem>
                          <MenuItem value='PIX'>Pix</MenuItem>
                          {data.rewardsCredit > '0,00' && (
                            <MenuItem value='REWARDS_CREDIT'>iFlex Rewards</MenuItem>
                          )}
                        </Select>
                        {errors.paymentMethodError && <FormHelperText>{errors.paymentMethodError}</FormHelperText>}
                      </FormControl>
                      <Collapse in={combinePaymentMethod && formData.paymentMethod !== '' && formData.secondaryPaymentMethod !== '' || !combinePaymentMethod && formData.paymentMethod === 'CASH' || !combinePaymentMethod && formData.paymentMethod === 'REWARDS_CREDIT'} timeout={300}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            name='mainAmount'
                            label={`Valor em ${getPaymentMethodLabel(formData.paymentMethod)}`}
                            placeholder='0,00'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.mainAmount}
                            onChange={handleTextFieldChange}
                            inputProps={{ maxLength: 9 }}
                            error={!!errors.mainAmountError}
                            helperText={errors.mainAmountError}
                            InputProps={{
                              startAdornment:
                                <InputAdornment position="start">R$</InputAdornment>
                            }}
                          />
                        </FormControl>
                      </Collapse>
                      <Box className='w-full flex flex-row ml-[0.7rem] mt-5 justify-between'>
                        <Box className='w-full'>
                          <FormControl component="fieldset" className="flex justify-center" fullWidth>
                            <FormControlLabel
                              checked={combinePaymentMethod}
                              className='bg-white md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-[0.7rem]'
                              control={
                                <Checkbox
                                  value=''
                                  onChange={handlePaymentMethodToggle} 
                                />
                              }
                              label={'Combinar meios de recebimento'}
                            />
                          </FormControl>
                        </Box>
                      </Box>
                      <Collapse in={combinePaymentMethod} timeout={300}>
                        <FormControl error={!!errors.paymentMethodError} required className='w-full !mt-5'>
                          <InputLabel id="secondaryPaymentMethod">Segundo Método</InputLabel>
                          <Select
                            labelId="secondaryPaymentMethod"
                            id="secondaryPaymentMethodSelect"
                            name="secondaryPaymentMethod"
                            value={formData.secondaryPaymentMethod}
                            onChange={handleSelectChange}
                            label="Segundo Método"
                          >
                            <MenuItem value="" disabled>Selecione um método de recebimento</MenuItem>
                            {formData.paymentMethod !== 'CASH' && (
                              <MenuItem value='CASH'>Dinheiro</MenuItem>
                            )}
                            <MenuItem value='CARD'>Cartão</MenuItem>
                            {formData.paymentMethod !== 'BANK_TRANSFER' && (
                            <MenuItem value='BANK_TRANSFER'>Transferência Bancária</MenuItem>
                            )}
                            {formData.paymentMethod !== 'PIX' && (
                              <MenuItem value='PIX'>Pix</MenuItem>
                            )}
                            {data.rewardsCredit > '0,00' && formData.paymentMethod !== 'REWARDS_CREDIT' && (
                              <MenuItem value='REWARDS_CREDIT'>iFlex Rewards</MenuItem>
                            )}
                          </Select>
                          {errors.secondaryPaymentMethodError && <FormHelperText>{errors.secondaryPaymentMethodError}</FormHelperText>}
                        </FormControl>
                        <Collapse in={formData.secondaryPaymentMethod !== ''} timeout={300}>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='secondaryAmount'
                              label={`Valor em ${getPaymentMethodLabel(formData.secondaryPaymentMethod)}`}
                              placeholder='0,00'
                              variant='outlined'
                              className='!mt-5'
                              value={formData.secondaryAmount}
                              onChange={handleTextFieldChange}
                              inputProps={{ maxLength: 9 }}
                              error={!!errors.secondaryAmountError}
                              helperText={errors.secondaryAmountError}
                              InputProps={{
                                startAdornment:
                                  <InputAdornment position="start">R$</InputAdornment>
                              }}
                            />
                          </FormControl>
                        </Collapse>
                      </Collapse>
                      {formData.paymentMethod === 'CASH' && formData.missingValue !== '' && formData.missingValue !== '0,00' || formData.secondaryPaymentMethod === 'CASH' && formData.missingValue !== '' && formData.missingValue !== '0,00' || formData.secondaryPaymentMethod === 'REWARDS_CREDIT' && formData.missingValue !== '' && formData.missingValue !== '0,00' || formData.paymentMethod === 'REWARDS_CREDIT' && formData.missingValue !== '' && formData.missingValue !== '0,00' ? (
                        <Box className='flex flex-row justify-between items-center mt-5 color-primary'>
                          <Typography className="!font-light text-gray-600">Atenção, existem valores restantes</Typography>
                          <Typography className='!text-[1.1rem]'>
                            R$ {formData.missingValue}
                          </Typography>
                        </Box>
                      ) : (<></>)}
                      <Box className='p-1 mt-5'>
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
                          <Box className='flex flex-row justify-between items-center mt-3'>
                            <Typography className="!font-light text-gray-600">Valor da Transação</Typography>
                            <Typography className='!text-[1.1rem]'>
                              R$ {data.amount}
                            </Typography>
                          </Box>
                          {formData.amount !== '' && formData.amount !== '0,00' && (
                            <Box className='flex flex-row justify-between items-center mt-3'>
                              <Typography className="!font-light text-gray-600">Pago</Typography>
                              <Typography className='!text-[1.1rem]'>
                                R$ {formData.amount}
                              </Typography>
                            </Box>
                          )}
                          <Collapse in={formData.change !== '' && formData.change !== '0,00'} timeout={300}>
                            <Box className='flex flex-row justify-between items-center mt-3'>
                              <Typography className="!font-light text-gray-600">Troco</Typography>
                              <Typography className='!text-[1.1rem]'>
                                R$ {formData.change}
                              </Typography>
                            </Box>
                            <Box className='bg-[#fff2f4] text-[#ff0336] p-5 rounded-3xl mt-5 text-[.9rem]'>
                              <Box className='flex flex-row items-center mb-2'>
                                <SiFirewalla className="text-[#ff0336] text-[1.5rem] mr-2" />
                                <Typography variant="h6" component="h2">iFlex Rewards</Typography>
                              </Box>
                              <Typography className='!text-[.9rem]'>
                                Você sabia que pode reutilizar o valor do troco e convertê-lo em iFlex Rewards?
                              </Typography>
                              <Typography className='!text-[.9rem] !mt-3'>
                              Ao fazer isso, o valor de R$ {formData.change} será adicionado ao saldo de iFlex Rewards do aluno. Esse crédito poderá ser utilizado para o pagamento de próximas mensalidades ou em compras futuras!
                              </Typography>
                              <Typography className='!text-[.9rem] !mt-3'>
                              O aluno deseja converter o valor do troco em iFlex Rewards?
                              </Typography>
                            </Box>
                            <Box className='w-full flex flex-row ml-[0.7rem] mt-5 justify-between'>
                              <Box className='w-full'>
                                  <RadioGroup
                                    name="rewards"
                                    className='flex justify-between'
                                    row
                                    onChange={handleRadioChange}
                                  >
                                    <FormControlLabel
                                      value="yesConvert"
                                      control={<Radio color="primary" />}
                                      label="Sim, converter."
                                      className='bg-white md:w-[48%] w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-0'
                                      checked={selectedRewardsValue === 'yesConvert'}
                                    />
                                    <FormControlLabel
                                      value="noConvert"
                                      control={<Radio color="primary" />}
                                      label="Não, obrigado."
                                      className='bg-white md:w-[48%] md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-[0.7rem]'
                                      checked={selectedRewardsValue === 'noConvert'}
                                    />
                                  </RadioGroup>
                              </Box>
                            </Box>
                          </Collapse>
                        </Box>
                      </Box>
                      <Box className='p-1 mt-5'>
                        <Box className='flex flex-col'>
                          <Typography className='!font-light !text-[1.5rem]'>Comprovante</Typography>
                        </Box>
                        <Divider className='!my-5' />
                        <Box className='flex flex-col'>
                          <Box className="w-full flex flex-row justify-between items-center">
                            <Button
                              component="label"
                              variant="outlined"
                              startIcon={proofPayment ? (<MdCloudDone className='!text-[1.25rem]'/>) : (<MdCloudUpload className='!text-[1.25rem]'/>)}
                              className='!text-[1rem] !rounded-l-lg !rounded-r-none !px-4 !py-[.4rem] w-full'
                              style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                              sx={{
                                color: '#334555',
                                backgroundColor: '#eef3f7',
                                borderColor: '#4b5563',
                                '&:hover': {
                                    backgroundColor: '#f8e7eb',
                                    borderColor: '#ff0336',
                                    color: '#ff0336',
                                },
                              }}
                            >
                              {proofPayment ? (
                                <>Anexado: <Box className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[17vw] ml-2'> {fileName}</Box></>
                              ) : (
                                <>Anexar Comprovante</>
                              )}
                              <VisuallyHiddenInput
                                  type="file"
                                  onChange={handleProofPaymentUpload}
                                  multiple
                                  accept="image/*"
                              />
                            </Button>
                            <Button
                              disabled={proofPayment ? false : true}
                              variant="outlined"
                              className='!text-[1rem] !rounded-r-lg !rounded-l-none !px-4 !py-[1.27rem] w-[20%] h-[2.6rem]'
                              sx={{
                                  color: '#4b5563',
                                  backgroundColor: '#eef3f7',
                                  borderColor: '#4b5563',
                                  borderLeft: 0,
                                  transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                  '&:hover': {
                                      color: '#ff0336',
                                      borderColor: '#ff0336',
                                      borderLeft: 0,
                                      backgroundColor: '#f8e7eb',
                                  },
                              }}
                              onClick={() => handleDeleteProofPayment()}
                            >
                              <MdDeleteOutline className="text-[1.5rem]" />
                            </Button>
                          </Box>
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