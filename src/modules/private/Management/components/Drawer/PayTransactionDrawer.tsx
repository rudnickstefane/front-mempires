import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import { memo, useRef, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight } from 'react-icons/md';
import { DrawerProps } from '../../../../common/types';
import { usePayTransactionForm } from '../../hooks';
import { PaymentPage } from '../../pages/Payments';

const MemoizedPaymentPage = memo(
  PaymentPage,
  (prevProps, nextProps) => {
    return (
      prevProps.data?.amount === nextProps.data?.amount &&
      prevProps.data?.description === nextProps.data?.description &&
      prevProps.preference?.createPaymentPreference?.id === nextProps.preference?.createPaymentPreference?.id &&
      prevProps.enqueueSnackbar === nextProps.enqueueSnackbar
    );
  }
);

export const PayTransactionDrawer = ({
  closeDrawer,
  data,
  refreshInternal,
  enqueueSnackbar,
  refresh
}: DrawerProps) => {

  const {
    isLoading,
    preferenceCode,
    activeStep,
    dynamicSteps,
    handleBack,
    handleContinue,
    handleFinish,
  } = usePayTransactionForm({ closeDrawer, enqueueSnackbar, data, refreshInternal, refresh });

  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const calledRef = useRef(false);

  if (paymentStatus === 'approved') {
    if (!calledRef.current) {
        calledRef.current = true;
      refresh?.()
      }
  }

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Pagar Transação
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
                          <Typography className='!font-light !text-[1.5rem]'>{data.description}</Typography>
                        </Box>
                        <Divider className='!my-5' />
                        <Box className="w-full flex flex-row justify-between items-center">
                          <Typography className="!font-light">Valor</Typography>
                          <Typography className="!font-light !text-[1.1rem] !font-poppins">
                            R$ {data.amount}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  );

                case 1:
                  return (
                    <MemoizedPaymentPage
                      data={data}
                      preference={preferenceCode}
                      enqueueSnackbar={enqueueSnackbar}
                      onStatusChange={(status) => setPaymentStatus(status)}
                    />
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

              {activeStep > 0 && paymentStatus !== 'approved' && (
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
              {activeStep < dynamicSteps.length - 1 && (
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="primary"
                  onClick={handleContinue}
                  endIcon={isLoading ? '' : <MdKeyboardArrowRight />}
                  sx={{
                    backgroundColor: '#ff0336',
                    color: '#fff',
                    height: '3rem',
                    '&:hover': {
                      backgroundColor: '#e6001b',
                    },
                  }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continuar'}
                </Button>
              )}

              {/* Botão Concluir - Exibido apenas na última etapa */}
              {activeStep === dynamicSteps.length - 1 && paymentStatus === 'approved' && (
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