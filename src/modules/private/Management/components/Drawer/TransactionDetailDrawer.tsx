import { Box, Button, Divider, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { PiReceiptBold } from 'react-icons/pi';
import { DrawerProps } from '../../../../common/types';
import { PaymentBadge, PaymentNameBadge, PaymentTypeBadge } from '../Badges/PaymentBadge';

export const TransactionDetailDrawer = ({
  closeDrawer,
  data,
}: DrawerProps) => {

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Detalhes da Transação
        </Typography>
        <Box className='flex justify-end items-center'>
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
          <Box className='flex flex-col w-full md:pr-0 pr-2'>
            <Box className='flex flex-col rounded-xl w-full p-5 border border-[#EAECF0]'>
              <Box className='flex flex-row justify-between items-center'>
                <Typography className='!font-light !text-[1.5rem]'>
                  <PaymentTypeBadge payment={data.type} />
                </Typography>
                <Typography className='!font-light !text-[1.5rem]'>R$ {data.amount}</Typography>
              </Box>
            </Box>
            <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
              <Box className='flex flex-col'>
                <Typography className='!font-light !text-[1.5rem]'>Informações</Typography>
              </Box>
              <Divider className='!my-5' />
              <Box className='flex flex-col'>
                <Box className="w-full flex flex-row justify-between items-center">
                  <Typography className="!font-light text-gray-600">Descrição</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{data.description}</Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Número da transação</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">TRA-{data.transactionCode}</Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Status</Typography>
                  <Typography className="!text-[.9rem]">
                    <PaymentBadge payment={data.paymentStatus} />
                  </Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Data de emissão</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{data.createdAt}</Typography>
                </Box>
                {data.dueDate && (
                  <Box className="w-full flex flex-row justify-between items-center mt-3">
                    <Typography className="!font-light text-gray-600">Data de vencimento</Typography>
                    <Typography className="!text-[1.1rem] !font-poppins">{data.dueDate}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
            {data.paymentMethod && (
              <>
                <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
                  <Box className='flex flex-col'>
                    <Typography className='!font-light !text-[1.5rem]'>Método de Pagamento</Typography>
                  </Box>
                  <Divider className='!my-5' />
                  <Box className='flex flex-col'>
                  <Box className="w-full flex flex-row justify-between items-center">
                      <Typography className="!font-light text-gray-600">Principal</Typography>
                      <Typography className="!text-[.9rem]">{data.paymentMethod !== '' && (
                          <PaymentBadge payment={data.paymentMethod} />
                        )}
                      </Typography>
                    </Box>
                    {data.secondaryPaymentMethod !== '' && (
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Outros</Typography>
                        <Typography className="!text-[.9rem]">{data.secondaryPaymentMethod !== '' && (
                            <PaymentBadge payment={data.secondaryPaymentMethod} />
                          )}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
                  <Box className='flex flex-col'>
                    <Typography className='!font-light !text-[1.5rem]'>Pagamento</Typography>
                  </Box>
                  <Divider className='!my-5' />
                  <Box className='flex flex-col'>
                    <Box className="w-full flex flex-row justify-between items-center">
                      <Typography className="!font-light text-gray-600">Data do pagamento</Typography>
                      <Typography className="!text-[1.1rem] !font-poppins">{data.receivedDate}</Typography>
                    </Box>
                    {data.originPayment !== null && (
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Pagamento efetuado via</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins"><PaymentNameBadge payment={data.originPayment} /></Typography>
                      </Box>
                    )}
                    <Box className="w-full flex flex-row justify-between items-center mt-3">
                      <Typography className="!font-light text-gray-600">Valor da transação</Typography>
                      <Typography className="!text-[1.1rem] !font-poppins">R$ {data.amount}</Typography>
                    </Box>
                    <Box className="w-full flex flex-row justify-between items-center mt-3">
                      <Typography className="!font-light text-gray-600">Valor pago em <PaymentNameBadge payment={data.paymentMethod} /></Typography>
                      <Typography className="!text-[1.1rem] !font-poppins">R$ {data.mainAmount}</Typography>
                    </Box>
                    {data.secondaryAmount && (
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Valor pago em <PaymentNameBadge payment={data.secondaryPaymentMethod} /></Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">R$ {data.secondaryAmount}</Typography>
                      </Box>
                    )}
                    {data.change && (
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Troco</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">R$ {data.change}</Typography>
                      </Box>
                    )}
                    {data.fees && (
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Multa ou juros</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">R$ {data.fees}</Typography>
                      </Box>
                    )}
                    {data.proofPayment && (
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Button
                            variant="outlined"
                            startIcon={<PiReceiptBold className='!text-[1.25rem]'/>}
                            className='!text-[1rem] rounded-lg !px-4 !py-[0rem] border border-red-900'
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
                            onClick={() => {
                              // Converter "21/01/2025" para "2025-01-21"
                              const [day, month, year] = data.receivedDate.split('/');
                              const formattedDate = `${year}${month}${day}`; // Gera "20250121"
                    
                              // Cria um link para o download da imagem
                              const link = document.createElement('a');
                              link.href = data.proofPayment;
                              link.download = `comprovante-de-pagamento-${formattedDate}.jpg`; // Nome do arquivo com a data formatada
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                        >
                          Download do Comprovante
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
                {data.reversed && (
                  <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
                    <Box className='flex flex-col'>
                      <Typography className='!font-light !text-[1.5rem]'>Reembolso</Typography>
                    </Box>
                    <Divider className='!my-5' />
                    <Box className='flex flex-col'>
                      <Box className="w-full flex flex-row justify-between items-center">
                        <Typography className="!font-light text-gray-600">Data do Reembolso</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">{data.reversedDate}</Typography>
                      </Box>
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Efetuado Por</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">{data.reversedUserName}</Typography>
                      </Box>
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Valor Reembolsado</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">R$ {data.reversed}</Typography>
                      </Box>
                      <Box className="w-full flex flex-col mt-3">
                        <Typography className="!font-light text-gray-600">Motivo</Typography>
                        <Box className='flex flex-col rounded-xl w-full p-5 border border-[#EAECF0] mt-3'>
                          <Box className='flex flex-row justify-between items-center'>
                            <Typography className='!font-light !text-[1.1rem]'>{data.reversedReason}</Typography>
                          </Box>
                        </Box>
                      </Box>
                      {data.reversedProofPayment && (
                        <Box className="w-full flex flex-row justify-between items-center mt-5">
                          <Button
                              variant="outlined"
                              startIcon={<PiReceiptBold className='!text-[1.25rem]'/>}
                              className='!text-[1rem] rounded-lg !px-4 !py-[0rem] border border-red-900'
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
                              onClick={() => {
                                // Converter "21/01/2025" para "2025-01-21"
                                const [day, month, year] = data.reversedDate.split('/');
                                const formattedDate = `${year}${month}${day}`; // Gera "20250121"
                      
                                // Cria um link para o download da imagem
                                const link = document.createElement('a');
                                link.href = data.reversedProofPayment;
                                link.download = `comprovante-de-reembolso-${formattedDate}.jpg`; // Nome do arquivo com a data formatada
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                          >
                            Download do Comprovante
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
              </>
            )}
            {data.canceledDate && (
              <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
                <Box className='flex flex-col'>
                  <Typography className='!font-light !text-[1.5rem]'>Cancelamento</Typography>
                </Box>
                <Divider className='!my-5' />
                <Box className='flex flex-col'>
                  <Box className="w-full flex flex-row justify-between items-center">
                    <Typography className="!font-light text-gray-600">Data do cancelamento</Typography>
                    <Typography className="!text-[1.1rem] !font-poppins">{data.canceledDate}</Typography>
                  </Box>
                  <Box className="w-full flex flex-row justify-between items-center mt-3">
                    <Typography className="!font-light text-gray-600">Efetuado por</Typography>
                    <Typography className="!text-[1.1rem] !font-poppins">{data.canceledUserName}</Typography>
                  </Box>
                  <Box className="w-full flex flex-row justify-between items-center mt-3">
                    <Typography className="!font-light text-gray-600">Valor cancelado</Typography>
                    <Typography className="!text-[1.1rem] !font-poppins">R$ {data.amount}</Typography>
                  </Box>
                  <Box className="w-full flex flex-col mt-3">
                    <Typography className="!font-light text-gray-600">Motivo</Typography>
                    <Box className='flex flex-col rounded-xl w-full p-5 border border-[#EAECF0] mt-3'>
                      <Box className='flex flex-row justify-between items-center'>
                        <Typography className='!font-light !text-[1.1rem]'>{data.canceledReason}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  {data.canceledProofPayment && (
                    <Box className="w-full flex flex-row justify-between items-center mt-5">
                      <Button
                          variant="outlined"
                          startIcon={<PiReceiptBold className='!text-[1.25rem]'/>}
                          className='!text-[1rem] rounded-lg !px-4 !py-[0rem] border border-red-900'
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
                          onClick={() => {
                            // Converter "21/01/2025" para "2025-01-21"
                            const [day, month, year] = data.canceledDate.split('/');
                            const formattedDate = `${year}${month}${day}`; // Gera "20250121"
                  
                            // Cria um link para o download da imagem
                            const link = document.createElement('a');
                            link.href = data.canceledProofPayment;
                            link.download = `comprovante-de-cancelamento-${formattedDate}.jpg`; // Nome do arquivo com a data formatada
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                      >
                        Download do Comprovante
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
            {!['PENDING', 'FAILED'].includes(data.paymentStatus) && (
              <>
                {data.cashBoxCode !== '' && (
                  <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
                    <Box className='flex flex-col'>
                      <Typography className='!font-light !text-[1.5rem]'>Recebedor</Typography>
                    </Box>
                    <Divider className='!my-5' />
                    <Box className='flex flex-col'>
                      <Box className="w-full flex flex-row justify-between items-center">
                        <Typography className="!font-light text-gray-600">Caixa</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">{data.cashBoxName}</Typography>
                      </Box>
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Código do caixa</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">CXR-{data.cashBoxCode}</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </>
            )}
            <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
              <Box className='flex flex-col'>
                <Typography className='!font-light !text-[1.5rem]'>Origem</Typography>
              </Box>
              <Divider className='!my-5' />
              <Box className='flex flex-col'>
                <Box className="w-full flex flex-row justify-between items-center">
                  <Typography className="!font-light text-gray-600">Origem da transação</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{data.name ? 'Manual' : 'iFlex'}</Typography>
                </Box>
                {data.name !== '' && (
                  <Box className="w-full flex flex-row justify-between items-center mt-3">
                    <Typography className="!font-light text-gray-600">Responsável</Typography>
                    <Typography className="!text-[1.1rem] !font-poppins">{data.name}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className='flex flex-row justify-between mt-8'>
              <Button
                onClick={closeDrawer}
                variant="outlined"
                sx={{
                  backgroundColor: 'transparent',
                  color: '#4b5563',
                  height: '3rem',
                  borderColor: '#4b5563',
                  '&:hover': {
                      backgroundColor: '#d4d4d8',
                      borderColor: '#4b5563',
                  },
                }}
              >
                Fechar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}