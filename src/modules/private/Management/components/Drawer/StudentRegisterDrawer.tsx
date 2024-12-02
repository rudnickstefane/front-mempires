import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, InputLabel, TextField, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight } from 'react-icons/md';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { useStudentRegisterForm } from '../../hooks';

export const StudentRegisterDrawer = ({
  closeDrawer,
  enqueueSnackbar
}: DrawerProps) => {

const animatedComponents = makeAnimated();

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    isNoNumber,
    genderOptions,
    stateMaritalOptions,
    gymPlanOptions,
    modalitiesOptions,
    focusedFields,
    handleFocus,
    handleTextFieldChange,
    handleSelectChange,
    handleNoNumberToggle,
    handleBack,
    handleContinue,
    handleFinish
  } = useStudentRegisterForm({ closeDrawer, enqueueSnackbar });

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Novo Aluno
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
                          name='name'
                          label='Nome Completo'
                          variant='outlined'
                          value={formData.name}
                          onChange={handleTextFieldChange}
                          error={!!errors.nameError}
                          helperText={errors.nameError}
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
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='identity'
                          label='CPF, RG ou outro documento de identificação'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.identity}
                          onChange={handleTextFieldChange}
                          error={Boolean(errors.identityError)}
                          helperText={errors.identityError}
                        />
                      </FormControl>
                      <Box className='w-full flex flex-row flex-wrap justify-between mt-5 z-[2]'>
                        <Box className='md:w-[50%] w-full'>
                          <InputLabel id="gender"
                            className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                              formData.gender || focusedFields.gender ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            } ${focusedFields.gender ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                          >Gênero</InputLabel>
                          <Select
                            placeholder={focusedFields.gender ? '' : 'Gênero'}
                            components={animatedComponents}
                            options={genderOptions}
                            styles={customStyles}
                            isSearchable={false}
                            onFocus={() => handleFocus('gender', true)}
                            onBlur={() => handleFocus('gender', false)}
                            onChange={(newValue) => handleSelectChange(newValue, 'gender')}
                            value={genderOptions.find(option => option.value === formData.gender)}
                          />
                        </Box>
                        <Box className='md:w-[46.7%] md:mt-0 md:ml-4 w-full'>
                          <InputLabel id="stateMarital"
                            className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                              formData.stateMarital || focusedFields.stateMarital ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            } ${focusedFields.stateMarital ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                          >Estado Civil</InputLabel>
                          <Select
                            placeholder={focusedFields.stateMarital ? '' : 'Estado Civil'}
                            components={animatedComponents}
                            options={stateMaritalOptions}
                            styles={customStyles}
                            isSearchable={false}
                            onFocus={() => handleFocus('stateMarital', true)}
                            onBlur={() => handleFocus('stateMarital', false)}
                            onChange={(newValue) => handleSelectChange(newValue, 'stateMarital')}
                            value={stateMaritalOptions.find(option => option.value === formData.stateMarital)}
                          />
                        </Box>
                      </Box>
                      <FormControl fullWidth>
                        <TextField
                          name='profession'
                          label='Profissão'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.profession}
                          onChange={handleTextFieldChange}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='company'
                          label='Empresa'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.company}
                          onChange={handleTextFieldChange}
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
                            name='streetAddress'
                            label='Endereço'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.streetAddress}
                            onChange={handleTextFieldChange}
                            error={!!errors.streetAddressError}
                            helperText={errors.streetAddressError}
                          />
                        </FormControl>
                        <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                          <Box className='md:w-[34%] w-full'>
                            <FormControl fullWidth>
                              <TextField
                                required
                                name='streetNumber'
                                label='Número'
                                variant='outlined'
                                value={formData.streetNumber}
                                onChange={handleTextFieldChange}
                                error={!!errors.streetNumberError}
                                helperText={errors.streetNumberError}
                                disabled={isNoNumber}
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
                            name='addressComplement'
                            label='Complemento'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.addressComplement}
                            onChange={handleTextFieldChange}
                          />
                        </FormControl>
                        <FormControl fullWidth>
                          <TextField
                            required
                            name='neighborhood'
                            label='Bairro'
                            variant='outlined'
                            className='!mt-5'
                            value={formData.neighborhood}
                            onChange={handleTextFieldChange}
                            error={!!errors.neighborhoodError}
                            helperText={errors.neighborhoodError}
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
                      <Box className='!mt-5 z-[3]'>
                        <InputLabel id="gymPlan"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.gymPlan || focusedFields.gymPlan ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          } ${focusedFields.gymPlan ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                        >Tipo de Plano *</InputLabel>
                        <Select
                          placeholder={focusedFields.gymPlan ? '' : 'Tipo de Plano *'}
                          components={animatedComponents}
                          options={gymPlanOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('gymPlan', true)}
                          onBlur={() => handleFocus('gymPlan', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'gymPlan')}
                          value={gymPlanOptions.find(option => option.value === formData.gymPlan)}
                          className={`${errors.gymPlanError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.gymPlanError && <FormHelperText className='!text-[#d32f2f]'>{errors.gymPlanError}</FormHelperText>}
                      <Box className='!mt-5 z-[2]'>
                        <InputLabel
                          id="modalities"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.modalities?.length || focusedFields.modalities
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          } ${focusedFields.modalities || errors.modalitiesError ? '!text-[#d32f2f]' : '!text-[#0009]'}`}
                        >
                          Modalidades *
                        </InputLabel>
                        <Select
                          placeholder={focusedFields.modalities ? '' : 'Modalidades *'}
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
                      <FormControl fullWidth>
                        <TextField
                          name='planDetails'
                          multiline
                          rows={4}
                          label='Observações do Plano'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.planDetails}
                          onChange={handleTextFieldChange}
                        />
                      </FormControl>
                    </>
                  );
                
                case 3:
                  return (
                    <>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name='phone'
                          label='Telefone'
                          variant='outlined'
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
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='contactNameEmergency'
                          label='Contato de Emergência'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.contactNameEmergency}
                          onChange={handleTextFieldChange}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='contactPhoneEmergency'
                          label='Telefone do Contato de Emergência'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.contactPhoneEmergency}
                          onChange={handleTextFieldChange}
                        />
                      </FormControl>
                    </>
                  );

                default:
                  return null;
              }
            })()}

            {activeStep === dynamicSteps.indexOf('Responsável') && (
              <>
                <FormControl fullWidth>
                  <TextField
                    required
                    name='guardianName'
                    label='Nome do Responsável'
                    variant='outlined'
                    value={formData.guardianName}
                    onChange={handleTextFieldChange}
                    error={!!errors.guardianNameError}
                    helperText={errors.guardianNameError}
                  />
                </FormControl>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                Este aluno é menor de idade. É necessário informar o nome do responsável.
                </Typography>
              </>
            )}

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