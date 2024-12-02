import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, TextField, Typography } from '@mui/material';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import { HiPhoto } from 'react-icons/hi2';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle } from 'react-icons/md';
import Select from 'react-select';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { useEventCreateForm } from '../../hooks';

export const EventCreateDrawer = ({
  closeDrawer,
  enqueueSnackbar
}: DrawerProps) => {

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    modalitiesOptions,
    focusedFields,
    animatedComponents,
    image,
    croppedImage,
    isDialogOpen,
    setIsDialogOpen,
    cropperRef,
    handleFocus,
    handleImageUpload,
    handleCrop,
    handleTextFieldChange,
    handleSelectChange,
    handleFinish
  } = useEventCreateForm({ closeDrawer, enqueueSnackbar });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Novo Evento
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
                      <Button
                        variant="outlined"
                        startIcon={<HiPhoto className='mx-2.5'/>}
                        className='flex flex-row text-left !justify-start'
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
                        component="label"
                      >
                        <Box className='flex flex-col font-poppins'>Enviar uma Imagem
                          <Typography className='!text-[0.8rem]'>
                            Use uma imagem de destaque para o evento.
                          </Typography>
                        </Box>
                        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                      </Button>

                      <Box>
                        {croppedImage && (
                          <Box
                            className='mt-5 flex flex-col items-center w-full border-[#0000003b] border-[1px] rounded-md bg-[#f4f4f493]'>
                            <img
                              src={croppedImage}
                              alt="Cropped"
                              className='w-full'
                              style={{
                                maxWidth: '300px',
                              }}
                            />
                          </Box>
                        )}

                        {/* Modal de recorte */}
                        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
                          <DialogTitle>Recorte sua imagem</DialogTitle>
                          <DialogContent>
                            {image && (
                              <Cropper
                                src={image}
                                style={{ height: 400, width: '100%'}}
                                aspectRatio={1} // Define a proporção (quadrado)
                                guides={true} // Mostra guias para recorte
                                viewMode={1} // Permite mover fora dos limites visíveis
                                dragMode="move" // Habilita arrastar o seletor de recorte
                                zoomOnWheel={true} // Permite zoom com o scroll
                                cropBoxMovable={true} // Move o seletor
                                cropBoxResizable={true} // Permite redimensionar o seletor
                                toggleDragModeOnDblclick={false} // Evita alternar entre modos no duplo clique
                                ref={cropperRef} // Referência do Cropper
                              />
                            )}
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => setIsDialogOpen(false)}
                              variant="outlined"
                              sx={{
                                backgroundColor: 'transparent',
                                color: '#4b5563',
                                borderColor: '#4b5563',
                                height: '3rem',
                                marginRight: '1rem',
                                '&:hover': {
                                    backgroundColor: '#d4d4d8',
                                    borderColor: '#4b5563',
                                },
                              }}
                            >
                              Cancelar
                            </Button>
                            <Button
                            onClick={handleCrop}
                            variant="contained"
                            color="primary"
                            endIcon={<MdCheckCircle />}
                            sx={{
                              backgroundColor: '#ff0336',
                              color: '#fff',
                              height: '3rem',
                              '&:hover': {
                                backgroundColor: '#e6001b',
                              },
                            }}
                            >
                              Salvar
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>

                      <FormControl fullWidth>
                        <TextField
                          required
                          name='name'
                          label='Descrição'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.name}
                          onChange={handleTextFieldChange}
                          error={!!errors.nameError}
                          helperText={errors.nameError}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='identity'
                          label='Link do Evento'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.identity}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.identityError)}
                          helperText={errors.identityError}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='identity'
                          label='Local'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.identity}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.identityError)}
                          helperText={errors.identityError}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='identity'
                          label='Endereço'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.identity}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.identityError)}
                          helperText={errors.identityError}
                        />
                      </FormControl>
                      <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                        <Box className='md:w-[48%] w-full'>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='identity'
                              label='Cidade'
                              variant='outlined'
                              value={formData.identity}
                              onChange={handleTextFieldChange}
                              error={Boolean(errors.identityError)}
                              helperText={errors.identityError}
                            />
                          </FormControl>
                        </Box>
                        <Box className='md:w-[48%] md:mt-0 md:ml-4 w-full mt-5'>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='identity'
                              label='Estado'
                              variant='outlined'
                              value={formData.identity}
                              onChange={handleTextFieldChange}
                              error={Boolean(errors.identityError)}
                              helperText={errors.identityError}
                            />
                          </FormControl>
                        </Box>
                      </Box>
                      <Box className='!mt-5 z-[2]'>
                        <InputLabel
                          id="modalities"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.modalities?.length || focusedFields.modalities
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          } ${focusedFields.modalities || errors.modalitiesError ? '!text-[#d32f2f]' : '!text-[#0009]'}`}
                        >
                          Exibir o evento para Alunos das Unidades *
                        </InputLabel>
                        <Select
                          placeholder={focusedFields.modalities ? '' : 'Exibir o evento para Alunos das Unidades *'}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={modalitiesOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('modalities', true)}
                          onBlur={() => handleFocus('modalities', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'modalities')}
                          value={modalitiesOptions.filter(option => formData.modalities?.includes(option.value))}
                          className={`${errors.modalitiesError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.modalitiesError && <FormHelperText className='!text-[#d32f2f]'>{errors.modalitiesError}</FormHelperText>}
                      <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                        <Box className='md:w-[48%] w-full'>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='date'
                              label='Data de Início'
                              variant='outlined'
                              type='date'
                              value={formData.date}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value.length <= 10) {
                                  handleTextFieldChange(e);
                                }
                              }}
                              error={Boolean(errors.dateError)}
                              helperText={errors.dateError}
                              InputLabelProps={{ shrink: true }}
                            />
                          </FormControl>
                        </Box>
                        <Box className='md:w-[48%] md:mt-0 md:ml-4 w-full mt-5'>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='hours'
                              label='Hora de Início'
                              value={formData.hours}
                              onChange={handleTextFieldChange}
                              variant='outlined'
                              error={!!errors.hoursError}
                              helperText={errors.hoursError}
                            />
                          </FormControl>
                        </Box>
                      </Box>
                      <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                        <Box className='md:w-[48%] w-full'>
                          <FormControl fullWidth>
                            <TextField
                              name='date'
                              label='Data de Término'
                              variant='outlined'
                              type='date'
                              value={formData.date}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value.length <= 10) {
                                  handleTextFieldChange(e);
                                }
                              }}
                              error={Boolean(errors.dateError)}
                              helperText={errors.dateError}
                              InputLabelProps={{ shrink: true }}
                            />
                          </FormControl>
                        </Box>
                        <Box className='md:w-[48%] md:mt-0 md:ml-4 w-full mt-5'>
                          <FormControl fullWidth>
                            <TextField
                              name='hours'
                              label='Hora de Término'
                              value={formData.hours}
                              onChange={handleTextFieldChange}
                              variant='outlined'
                              error={!!errors.hoursError}
                              helperText={errors.hoursError}
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}