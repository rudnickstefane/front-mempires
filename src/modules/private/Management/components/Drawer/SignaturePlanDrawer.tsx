import { Box, Button, CircularProgress, Divider, Fade, FormControl, TextField, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight } from 'react-icons/md';
import { TbProgressAlert } from 'react-icons/tb';
import { DrawerProps } from '../../../../common/types';
import { useSignaturePlanForm } from '../../hooks';

export const SignaturePlanDrawer = ({
  closeDrawer,
  data,
  enqueueSnackbar,
  refresh,
}: DrawerProps) => {

  const {
    formData,
    errors,
    isLoading,
    activeStep,
    dynamicSteps,
    handleBack,
    handleContinue,
    handleFinish,
    currentPlan,
    handleTextFieldChange
  } = useSignaturePlanForm({ closeDrawer, enqueueSnackbar, data, refresh });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Contratar Plano
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
                      <Box className='flex flex-col rounded-xl w-full p-5 border border-[#EAECF0]'>
                        <Box className='flex flex-col'>
                          <Typography className='!text-[.9rem] !font-light'>Nome do Plano</Typography>
                          <Typography className='!font-light !text-[1.5rem]'>{currentPlan.name}</Typography>
                        </Box>
                        <Divider className='!my-5' />
                        <Box className="w-full flex flex-row justify-between items-center">
                          <Typography className="!font-light">Periodicidade</Typography>
                          <Typography className="!font-light !text-[1.1rem] !font-poppins">
                            {data.periodicity === 'monthly' ? 'Mensal' : data.periodicity === 'quarterly' ? 'Trimestral' : 'Anual'}
                          </Typography>
                        </Box>
                        <Box className="w-full flex flex-row justify-between items-center">
                          <Typography className="!font-light">Valor</Typography>
                          <Typography className="!font-light !text-[1.1rem] !font-poppins">
                            {(data.periodicity === 'monthly' ? currentPlan.monthly : data.periodicity === 'quarterly' ? currentPlan.quarterly : currentPlan.yearly || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </Typography>
                        </Box>
                      </Box>
                      <Fade in={true} timeout={1000}>
                        <Box className='bg-[#fef7e5] text-[#744600] p-5 rounded-3xl mt-5 text-[.9rem]'>
                          <Box className='flex flex-row items-center mb-2'>
                            <TbProgressAlert className="text-[#744600] text-[1.5rem] mr-2" />
                            <Typography variant="h6" component="h2">Muita atenção</Typography>
                          </Box>
                          <Typography className='!text-[.9rem]'>
                            Se você estiver no período de teste gratuito, a primeira cobrança do plano será gerada após o término do período de testes.
                          </Typography>
                          <Typography className='!text-[.9rem] !mt-5'>
                            As faturas e informações de pagamento estarão disponíveis no menu à esquerda, em: <b>Administrativo</b> &gt; <b>Configurações</b> &gt; <b>Faturas</b>.
                          </Typography>
                          <Typography className='!text-[.9rem] !mt-5'>
                            Caso tenha qualquer dúvida, clique no botão <b>Central de Serviços</b> localizado no canto superior direito e em seguida: <b>Meus Protocolos</b> &gt; <b>Novo Protocolo</b>.
                          </Typography>
                        </Box>
                      </Fade>
                    </>
                  );
                
                case 1:
                  return (
                    <>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='code'
                          label='CNPJ'
                          variant='outlined'
                          value={formData.code}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.codeError)}
                          helperText={errors.codeError}
                          inputProps={{ maxLength: 14 }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='businessName'
                          label='Razão Social'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.businessName}
                          onChange={handleTextFieldChange}
                          error={!!errors.businessNameError}
                          helperText={errors.businessNameError}
                          disabled
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='zipCode'
                          label='CEP'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.zipCode}
                          onChange={handleTextFieldChange}
                          error={!!errors.zipCodeError}
                          helperText={errors.zipCodeError}
                          disabled
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='address'
                          label='Endereço'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.address}
                          onChange={handleTextFieldChange}
                          error={!!errors.addressError}
                          helperText={errors.addressError}
                          inputProps={{ maxLength: 200 }}
                          disabled
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='number'
                          label='Número'
                          className='!mt-5'
                          variant='outlined'
                          value={formData.number}
                          onChange={handleTextFieldChange}
                          error={!!errors.numberError}
                          helperText={errors.numberError}
                          inputProps={{ maxLength: 10 }}
                          disabled
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='complement'
                          label='Complemento'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.complement}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 200 }}
                          disabled
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='district'
                          label='Bairro'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.district}
                          onChange={handleTextFieldChange}
                          error={!!errors.districtError}
                          helperText={errors.districtError}
                          inputProps={{ maxLength: 200 }}
                          disabled
                        />
                      </FormControl>
                      <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                        <Box className='md:w-[61.7%] w-full'>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='city'
                              label='Cidade'
                              variant='outlined'
                              onChange={handleTextFieldChange}
                              value={formData.city}
                              disabled
                              error={!!errors.cityError}
                              helperText={errors.cityError}
                            />
                          </FormControl>
                        </Box>
                        <Box className='md:w-[35%] md:mt-0 md:ml-4 w-full mt-5'>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='state'
                              label='Estado'
                              variant='outlined'
                              onChange={handleTextFieldChange}
                              value={formData.state}
                              disabled
                              error={!!errors.stateError}
                              helperText={errors.stateError}
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