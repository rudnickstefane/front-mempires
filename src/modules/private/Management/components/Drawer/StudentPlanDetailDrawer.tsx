import { Box, Button, Divider, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { DrawerProps } from '../../../../common/types';
import { PaymentBadge, RulesAccessMapper, RulesFrequencyMapper } from '../Badges/PaymentBadge';

export const StudentPlanDetailDrawer = ({
  closeDrawer,
  data,
}: DrawerProps) => {

  const daysOfWeek = [
    { key: "sundayHours", label: "Domingo" },
    { key: "mondayHours", label: "Segunda" },
    { key: "tuesdayHours", label: "Terça" },
    { key: "wednesdayHours", label: "Quarta" },
    { key: "thursdayHours", label: "Quinta" },
    { key: "fridayHours", label: "Sexta" },
    { key: "saturdayHours", label: "Sábado" },
    { key: "holidayHours", label: "Feriado"},
  ];

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Detalhes do Plano
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
                  {data.name}
                </Typography>
              </Box>
            </Box>
            <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
              <Box className='flex flex-col'>
                <Typography className='!font-light !text-[1.5rem]'>Informações</Typography>
              </Box>
              <Divider className='!my-5' />
              <Box className='flex flex-col'>
                <Box className="w-full flex flex-row justify-between items-center">
                  <Typography className="!font-light text-gray-600">Código do plano</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">PLN-{data.planCode}</Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Pagamento</Typography>
                  <Typography className="!text-[.9rem]">
                    <PaymentBadge payment={data.planPayment} />
                  </Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Status</Typography>
                  <Typography className="!text-[1.1rem]">{data.status === 'ACTIVE' ? 'Ativo' : 'Cancelado'}</Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Matrículado em</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{data.createdAt}</Typography>
                </Box>
                  <Box className="w-full flex flex-row justify-between items-center mt-3">
                    <Typography className="!font-light text-gray-600">Vencimento</Typography>
                    <Typography className="!text-[1.1rem] !font-poppins">Todo dia {data.paymentDay.split('/')[0]}</Typography>
                  </Box>
              </Box>
            </Box>
            <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
              <Box className='flex flex-col'>
                <Typography className='!font-light !text-[1.5rem]'>Regras</Typography>
              </Box>
              <Divider className='!my-5' />
              <Box className='flex flex-col'>
                <Box className="w-full flex flex-row justify-between items-center">
                  <Typography className="!font-light text-gray-600">Poderá frequentar</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins"><RulesFrequencyMapper rules={{ frequency: data.frequency || '' }} /></Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Poderá acessar no mesmo dia</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins"><RulesAccessMapper rules={{ access: data.access || '' }} /></Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Horário para acesso</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{data.hours === 'FULL_DAY' ? 'Qualquer horário' : 'Definido por dia'}</Typography>
                </Box>
                  {data.hours === 'CUSTOM' && (
                    <Box className="flex flex-wrap justify-between mt-2">
                        {daysOfWeek.map(({ key, label }) => (
                        <Box key={key} className="bg-[#F3F3F4] md:w-[24%] w-full rounded-lg p-5 pt-[14px] mt-3">
                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 uppercase">{label}</Typography>
                            <Divider className="!my-3" />
                            {data[key].map((slot, index) => (
                            <>
                                <Box key={index} className='flex flex-row items-center justify-between'>
                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-[.1rem] !font-semibold">{slot}</Typography>
                                </Box>
                                <Divider className="!my-3" />
                            </>
                            ))}
                        </Box>
                        ))}
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