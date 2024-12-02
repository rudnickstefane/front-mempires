import { Box, Button, CircularProgress, FormControl, TextField, Typography } from '@mui/material';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { LiaIndustrySolid } from 'react-icons/lia';
import { MdCheckCircle } from 'react-icons/md';
import { DrawerProps } from '../../../../common/types';
import { useSupplierRegisterForm } from '../../hooks';

export const SupplierRegisterDrawer = ({
  closeDrawer,
  enqueueSnackbar
}: DrawerProps) => {

  const {
    isLoading,
    isFinishDisabled,
    supplierData,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    handleTextFieldChange,
    handleFinish
  } = useSupplierRegisterForm({ closeDrawer, enqueueSnackbar });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Novo Fornecedor
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
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='codeAndIdentity'
                          label='CPF ou CNPJ'
                          variant='outlined'
                          value={formData.codeAndIdentity}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.codeAndIdentityError)}
                          helperText={errors.codeAndIdentityError}
                        />
                      </FormControl>

                      {supplierData ? (
                        <Box className='flex flex-col gap-4 p-6 bg-neutral-100 rounded-xl mt-5'>
                          <Box className='flex flex-row'>
                            <Box className='flex flex-col flex-grow'>
                              <Typography className='text-left !font-roboto !font-semibold !text-xl text-neutral-900'>
                                {supplierData.name}
                              </Typography>
                              <Typography className='text-left !font-roboto !font-medium !text-base text-neutral-500'>
                                {supplierData.cnpj || supplierData.cpf}
                              </Typography>
                            </Box>
                            <Box>
                            {supplierData.cpf ? (
                              <GrUserManager className='text-[2.5rem] text-[#282929]' />
                            ) : supplierData.cnpj ? (
                              <LiaIndustrySolid className='text-[2.5rem] text-[#282929]' />
                            ) : null}
                            </Box>
                          </Box>
                          <Box className='flex flex-row flex-grow items-center gap-2'>
                            <HiOutlineLocationMarker className='text-[1.5rem] text-[#282929]' />
                            <Typography className='text-left !font-roboto !font-normal !text-sm text-neutral-500'>
                              {supplierData.address}
                            </Typography>
                          </Box>
                        </Box>
                      ) : errors.searchCodeAndIdentityError && (
                        <Box className='flex flex-col gap-4 p-6 rounded-xl text-rose-900 bg-rose-50 mt-5'>
                          <Box className='flex flex-row items-center'>
                            <AiOutlineCloseCircle className='text-[2.5rem]' />
                            <Typography className='!ml-3 text-left !font-roboto !font-semibold !text-xl'>
                              {errors.searchCodeAndIdentityError}
                            </Typography>
                          </Box>
                          <Typography className='text-left !font-roboto !font-normal !text-sm'>
                            Por favor, verifique os dados inseridos ou entre em contato com o nosso SAC para suporte.
                          </Typography>
                        </Box>
                      )}
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
                disabled={isFinishDisabled || isLoading}
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