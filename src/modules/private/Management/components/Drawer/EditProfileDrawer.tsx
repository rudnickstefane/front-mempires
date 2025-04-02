/* eslint-disable @typescript-eslint/no-explicit-any */
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect } from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdDeleteOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { DrawerProps } from '../../../../common/types';
import { useEditProfileForm } from '../../hooks';

export const EditProfileDrawer = ({
  closeDrawer,
  enqueueSnackbar,
  data,
  initialStep = 0,
  refresh,
}: DrawerProps) => {

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    setActiveStep,
    dynamicSteps,
    isNoNumber,
    handleTextFieldChange,
    handleNoNumberToggle,
    handleBack,
    handleContinue,
    handleFinish,
    isCheckingUsername,
    isUsernameAvailable,
    contacts,
    handleAddContact,
    handleEditContact,
    handleDeleteContact,
    editingContact,
    handleConfirmEditContact,
  } = useEditProfileForm({ closeDrawer, enqueueSnackbar, data, refresh });

  useEffect(() => {
    setActiveStep(initialStep);
  }, [initialStep, setActiveStep]);

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Alterar Dados
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
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='name'
                          label='Nome Completo'
                          variant='outlined'
                          value={formData.name}
                          onChange={handleTextFieldChange}
                          error={!!errors.nameError}
                          helperText={errors.nameError}
                          inputProps={{ maxLength: 100 }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='birthDate'
                          label='Data de Nascimento'
                          variant='outlined'
                          className='!mt-5'
                          type='date'
                          value={formData.birthDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length <= 10) {
                              handleTextFieldChange(e);
                            }
                          }}
                          error={Boolean(errors.birthDateError)}
                          helperText={errors.birthDateError}
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>
                      <Box className='flex flex-row items-center'>
                        <FormControl fullWidth>
                          <TextField
                            required
                            name='identity'
                            label='CPF'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.identity}
                            onChange={handleTextFieldChange}
                            error={Boolean(errors.identityError)}
                            helperText={errors.identityError}
                            inputProps={{ maxLength: 14 }}
                            disabled={Boolean(data?.findProfileDetails.identity)}
                          />
                        </FormControl>
                        <Tooltip
                          title={
                            <>
                              O CPF só pode ser alterado uma vez. Alterações subsequentes precisam ser solicitadas ao suporte.<br /><br />
                              Se precisar de ajuda, entre em contato conosco para solicitar a alteração.
                            </>
                          } placement="left" arrow>
                          <IconButton
                            size="small"
                            sx={{ marginTop: '20px', marginLeft: '5px' }}
                          >
                            <HelpOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='username'
                          label='Nome de Usuário'
                          variant='outlined'
                          className='!mt-5'
                          inputProps={{ maxLength: 30 }}
                          value={formData.username}
                          onChange={handleTextFieldChange}
                          error={!!errors.usernameError}
                          helperText={errors.usernameError}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                              {isCheckingUsername ? (
                                <CircularProgress size={24} color="inherit" />
                              ) : isUsernameAvailable ? (
                                <FaRegCircleCheck className="text-green-600 text-[1.6rem]" />
                              ) : null}
                            </InputAdornment>
                            ),
                        }}
                        />
                      </FormControl>
                    </>
                  );

                case 1:
                  return (
                    <>
                      <FormControl fullWidth>
                          <TextField
                            required
                            name='zipCode'
                            label='CEP'
                            variant='outlined'
                            value={formData.zipCode}
                            onChange={handleTextFieldChange}
                            error={!!errors.zipCodeError}
                            helperText={errors.zipCodeError}
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
                          />
                        </FormControl>
                        <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                          <Box className='md:w-[34%] w-full'>
                            <FormControl fullWidth>
                              <TextField
                                required
                                name='number'
                                label='Número'
                                variant='outlined'
                                value={formData.number}
                                onChange={handleTextFieldChange}
                                error={!!errors.numberError}
                                helperText={errors.numberError}
                                disabled={isNoNumber}
                                inputProps={{ maxLength: 10 }}
                              />
                            </FormControl>
                          </Box>
                          <Box className='md:w-[62.7%] md:mt-2 md:ml-4 w-full mt-5'>
                            <FormControl component="fieldset" className="flex justify-center" fullWidth>
                                <FormControlLabel
                                  control={
                                  <Checkbox 
                                    checked={isNoNumber} 
                                    onChange={handleNoNumberToggle} 
                                  />} 
                                    label={'Sem número'}
                                />
                            </FormControl>
                          </Box>
                        </Box>
                        <FormControl fullWidth>
                          <TextField
                            name='complement'
                            label='Complemento'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.complement}
                            onChange={handleTextFieldChange}
                            inputProps={{ maxLength: 200 }}
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
                
                case 2:
                  return (
                    <>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='description'
                          placeholder='e.g.: Whatsapp, Casa etc..'
                          label='Descrição'
                          variant='outlined'
                          value={formData.description}
                          onChange={handleTextFieldChange}
                          error={!!errors.descriptionError}
                          helperText={errors.descriptionError}
                          inputProps={{ maxLength: 30 }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='phone'
                          label='Telefone'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.phone}
                          onChange={handleTextFieldChange}
                          error={!!errors.phoneError}
                          helperText={errors.phoneError}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='email'
                          label='E-mail'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.email}
                          onChange={handleTextFieldChange}
                          error={!!errors.emailError}
                          helperText={errors.emailError}
                          inputProps={{ maxLength: 100 }}
                        />
                      </FormControl>
                      {editingContact ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleConfirmEditContact}
                          className="!w-[15rem] !mt-5"
                          sx={{
                            backgroundColor: '#ff0336',
                            color: '#fff',
                            height: '3rem',
                            '&:hover': {
                              backgroundColor: '#e6001b',
                            },
                          }}
                        >
                          Confirmar Novos Dados
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddContact}
                          className="!w-[12rem] !mt-5"
                          sx={{
                            backgroundColor: '#ff0336',
                            color: '#fff',
                            height: '3rem',
                            '&:hover': {
                              backgroundColor: '#e6001b',
                            },
                          }}
                        >
                          Adicionar Contato
                        </Button>
                      )}
                      <Box className="flex flex-col justify-between mt-5">
                        {contacts?.map((contact: { contactCode: any; type?: any; description?: any; phone?: any; email?: any; }) => (
                          <Box
                            key={contact.contactCode}
                            className="bg-[#F3F3F4] w-full rounded-lg p-5 pt-[14px] mb-4 flex flex-col justify-end"
                          >
                            <Box className='w-full flex flex-row justify-between'>
                              <Typography>Detalhes</Typography>
                              <Box className='flex flex-row justify-between'>
                                <Tooltip
                                  placement="right"
                                  title={'Editar contato'}
                                  arrow
                                >
                                  <Button
                                    className='!min-w-5'
                                    sx={{
                                        color: '#79808a',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                        '&:hover': {
                                            color: '#ff0336',
                                        },
                                    }}
                                    onClick={() => handleEditContact({
                                      contactCode: contact.contactCode,
                                      description: contact.description || '',
                                      phone: contact.phone || '',
                                      email: contact.email || ''
                                    })}
                                  >
                                    <TbEdit size={24} />
                                  </Button>
                                </Tooltip>
                                {contact.type !== 'MAIN' && (
                                  <Tooltip
                                    placement="bottom"
                                    title={'Apagar contato'}
                                    arrow
                                  >
                                    <Button
                                      className='!min-w-5 !ml-2'
                                      sx={{
                                          color: '#79808a',
                                          fontWeight: 'normal',
                                          padding: 0,
                                          transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                          '&:hover': {
                                              color: '#ff0336',
                                          },
                                      }}
                                      onClick={() => handleDeleteContact(contact)}
                                    >
                                      <MdDeleteOutline size={24} />
                                    </Button>
                                  </Tooltip>
                                )}
                              </Box>
                            </Box>
                            <Box className='grid grid-cols-[12rem,1fr]'>
                              <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Descrição</Typography>
                              <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold break-words overflow-hidden">
                                {contact.description || ''}
                              </Typography>
                              <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Telefone</Typography>
                              <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                {contact.phone || ''}
                              </Typography>
                              <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">E-mail</Typography>
                              <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold break-words overflow-hidden">
                                {contact.email || ''}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
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