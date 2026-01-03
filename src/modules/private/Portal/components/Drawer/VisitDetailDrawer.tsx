import { Box, Button, Divider, Typography } from '@mui/material';
import { Key } from 'react';
import { GrUserManager } from 'react-icons/gr';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { DrawerProps } from '../../../../common/types';

export const VisitDetailDrawer = ({
  closeDrawer,
  data,
}: DrawerProps) => {

  const referralSourceOptions = [
    { value: 'billboard', label: 'Outdoor' },
    { value: 'call', label: 'Ligação' },
    { value: 'email', label: 'E-mail Marketing' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'flyer', label: 'Panfleto' },
    { value: 'friend', label: 'Indicação de amigo' },
    { value: 'google', label: 'Google' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'student', label: 'Indicação de aluno ou colaborador' },
    { value: 'website', label: 'Site' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'others', label: 'Outros' },
  ];

  const selectedReferral = referralSourceOptions.find(option => option.value === data.referralSource);

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Detalhes do Visitante
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
            <Box className='flex flex-col rounded-xl w-full p-1'>
              <Box className='flex flex-col'>
                <Box className="w-full flex flex-row justify-between items-center">
                  <Typography className="!font-light text-gray-600">Nome</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{data.name}</Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Documento</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">
                    {(() => {
                        const id = data.identity;
                        const len = id.length;
                        const start = Math.floor((len - 5) / 2); // Início dos 5 do meio
                        const end = start + 5; // Fim dos 5 do meio
                        let result = "";
                        for (let i = 0; i < len; i++) {
                        if (i >= start && i < end) {
                            result += id[i]; // Mantém os 5 do meio
                        } else if (id[i].match(/[.,-]/)) {
                            result += id[i]; // Mantém pontos, vírgulas e hífen
                        } else {
                            result += "*"; // Substitui por *
                        }
                        }
                        return result;
                    })()}
                  </Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Matrícula temporária</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">VST-{data.visitCode}</Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Data de cadastro</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{data.createdAt}</Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">Como nos conheceu?</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{selectedReferral?.label}</Typography>
                </Box>
                {data.indicationCode && (
                  <Box className='flex flex-col gap-4 p-6 bg-neutral-100 rounded-xl mt-5'>
                    <Box className='flex flex-row'>
                      <Box className='flex flex-col flex-grow'>
                        <Typography className='text-left !font-roboto !text-sm'>Indicado por:</Typography>
                        <Typography className='text-left !font-roboto !font-semibold !text-xl text-neutral-900'>
                          {data.nameIndication}
                        </Typography>
                      </Box>
                      <Box>
                        <GrUserManager className='text-[2.5rem] text-[#282929]' />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
              <Box className='flex flex-col'>
                <Typography className='!font-light !text-[1.5rem]'>Contato</Typography>
              </Box>
              <Divider className='!my-5' />
              <Box className='flex flex-col'>
                <Box className="w-full flex flex-row justify-between items-center">
                  <Typography className="!font-light text-gray-600">Telefone</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{data.phone ? data.phone : ''}</Typography>
                </Box>
                <Box className="w-full flex flex-row justify-between items-center mt-3">
                  <Typography className="!font-light text-gray-600">E-mail</Typography>
                  <Typography className="!text-[1.1rem] !font-poppins">{data.email}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
              <Box className='flex flex-col'>
                <Typography className='!font-light !text-[1.5rem]'>Interesses</Typography>
              </Box>
              <Divider className='!my-5' />
              <Box className='flex flex-col'>
                <Box className="flex flex-wrap justify-between">
                  {Array.isArray(data.categories) && data.categories.length > 0 && (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data.categories.map((category: { name: any; description: any; }, index: Key | null | undefined) => (
                      <Box
                        key={index}
                        className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] grid grid-cols-[6.5rem,1fr]"
                        >
                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Modalidade</Typography>
                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                          {category.name || ''}
                        </Typography>
                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Descrição</Typography>
                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                          {category.description || ''}
                        </Typography>
                      </Box>
                  )))}
                </Box>
              </Box>
            </Box>
            <Box className='flex flex-col rounded-xl w-full p-1 mt-5'>
              <Box className='flex flex-col'>
                <Typography className='!font-light !text-[1.5rem]'>Observações</Typography>
              </Box>
              <Divider className='!my-5' />
              <Box className='flex flex-col'>
                <Box className="flex flex-wrap justify-between">
                  {data.observation}
                </Box>
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