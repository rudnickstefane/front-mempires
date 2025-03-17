import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, Checkbox, CircularProgress, Collapse, Divider, Fade, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, Modal, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { AiOutlineCloseCircle, AiOutlineDollar } from 'react-icons/ai';
import { GrUserManager } from 'react-icons/gr';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight } from 'react-icons/md';
import { TbProgressAlert } from 'react-icons/tb';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { DrawerProps } from '../../../../common/types';
import { customNoOptionsMessage, customStyles } from '../../../../common/ui';
import { useStudentRegisterForm } from '../../hooks';

export const StudentRegisterDrawer = ({
  closeDrawer,
  enqueueSnackbar,
  refresh,
}: DrawerProps) => {

const animatedComponents = makeAnimated();

  const {
    isLoading,
    isNoConfigPlans,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    isNoNumber,
    isNoEmail,
    isResponsible,
    isFinanceResponsible,
    genderOptions,
    stateMaritalOptions,
    responsePlansOptions,
    responseFinanceResponsible,
    responseStudent,
    focusedFields,
    isFinishDisabled,
    handleFocus,
    handleTextFieldChange,
    handleSelectChange,
    handleNoNumberToggle,
    handleNoEmailToggle,
    handleIsResponsibleToggle,
    handleFinanceResponsibleToggle,
    handleBack,
    handleContinue,
    handleFinish,
    charactersRemaining,
    referralSourceOptions,
    referralSelected,
    handleCloseModal,
    handleRadioChange,
    selectedPaymentValue
  } = useStudentRegisterForm({ closeDrawer, enqueueSnackbar, refresh });

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isNoConfigPlans}
        onClose={handleCloseModal}
        closeAfterTransition
        className='flex items-center justify-center'
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isNoConfigPlans}>
          <Box className="bg-white rounded-lg w-[500px] flex flex-col items-end">
            <Button
              onClick={handleCloseModal}
              className='flex flex-row items-center font-poppins !min-w-10 !mx-1 !rounded-full !min-h-10 top-3 right-2'
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
              <Box className="p-10 pt-2">
                <TbProgressAlert className="text-yellow-500 text-[5rem] mx-auto" />
                <Divider className='!my-5' />
                <Typography variant="h5" component="h2" className='text-center'>Atenção</Typography>
                <Typography sx={{ mt: 3 }}>
                  Para realizar a matrícula de um aluno, é necessário que pelo menos um plano esteja configurado.
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '16px' }}>
                  Para configurar os planos, acesse no menu à esquerda em: <strong>Administrativo &gt; Planos</strong>
                </Typography>
              </Box>
          </Box>
        </Fade>
      </Modal>
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
                          inputProps={{ maxLength: 18 }}
                        />
                      </FormControl>
                      <Box className='!mt-5 z-[3]'>
                        <InputLabel id="referralSource"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.referralSource || focusedFields.referralSource ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          } ${focusedFields.referralSource ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                        >Como nos conheceu?</InputLabel>
                        <Select
                          placeholder={focusedFields.referralSource ? '' : 'Como nos conheceu?'}
                          components={animatedComponents}
                          options={referralSourceOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('referralSource', true)}
                          onBlur={() => handleFocus('referralSource', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'referralSource')}
                          value={referralSourceOptions.find(option => option.value === formData.referralSource)}
                          className={`${errors.referralSourceError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {referralSelected === 'student' && (
                          <>
                            <Box className='flex flex-row items-center justify-center'>
                              <FormControl fullWidth>
                                <TextField
                                  required
                                  name='indicationSearch'
                                  label="Buscar Aluno"
                                  placeholder='Documento, Matrícula, E-mail ou Nome'
                                  variant='outlined'
                                  className='!mt-5'
                                  value={formData.indicationSearch}
                                  onChange={handleTextFieldChange}
                                  error={!!errors.indicationSearchError}
                                  helperText={errors.indicationSearchError}
                                />
                              </FormControl>
                              <Tooltip
                                title={
                                  <>
                                    Se a sua academia estiver participando do nosso <b>programa de incentivo</b>, tanto você quanto o aluno que fez a indicação poderão ganhar prêmios.<br /><br />
                                    Para mais detalhes, acesse no menu: <br />
                                    <b>Programas &gt; Incentivo &gt; Regulamento</b>
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
                            {responseStudent ? (
                              <Box className='flex flex-col gap-4 p-6 bg-neutral-100 rounded-xl mt-5'>
                                <Box className='flex flex-row'>
                                  <Box className='flex flex-col flex-grow'>
                                    <Typography className='text-left !font-roboto !font-semibold !text-xl text-neutral-900'>
                                      {responseStudent.findStudent.name}
                                    </Typography>
                                    <Typography className='text-left !font-roboto !font-medium !text-base text-neutral-500'>
                                      {responseStudent.findStudent.identity}
                                    </Typography>
                                  </Box>
                                  <Box>
                                  <GrUserManager className='text-[2.5rem] text-[#282929]' />
                                  </Box>
                                </Box>
                                <Box className='flex flex-row flex-grow items-center gap-2'>
                                  <HiOutlineLocationMarker className='text-[1.5rem] text-[#282929]' />
                                  <Typography className='text-left !font-roboto !font-normal !text-sm text-neutral-500'>
                                    {responseStudent.findStudent.address}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : errors.searchFindStudentError && (
                              <Box className='flex flex-col gap-4 p-6 rounded-xl text-rose-900 bg-rose-50 mt-5'>
                                <Box className='flex flex-row items-center'>
                                  <AiOutlineCloseCircle className='text-[2.5rem]' />
                                  <Typography className='!ml-3 text-left !font-roboto !font-semibold !text-xl'>
                                    {errors.searchFindStudentError}
                                  </Typography>
                                </Box>
                                <Typography className='text-left !font-roboto !font-normal !text-sm'>
                                  Por favor, verifique os dados inseridos ou entre em contato com o nosso suporte.
                                </Typography>
                              </Box>
                            )}
                          </>
                        )
                      }
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
                          inputProps={{ maxLength: 50 }}
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
                          inputProps={{ maxLength: 50 }}
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
                      <Box className='z-[3]'>
                        <InputLabel id="periodicityCode"
                          className={`!absolute z-[1] bg-white ml-2 -mt-2 !px-2 scale-[0.75] transition-all duration-300 transform ${
                            formData.periodicityCode || focusedFields.periodicityCode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          } ${focusedFields.periodicityCode ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                        >Plano <span style={{ color: 'red' }}>*</span></InputLabel>
                        <Select
                          placeholder={
                            focusedFields.periodicityCode
                              ? ''
                              : (
                                <>
                                  Plano <span style={{ color: 'red' }}>*</span>
                                </>
                              )
                          }
                          components={animatedComponents}
                          options={responsePlansOptions}
                          styles={customStyles}
                          noOptionsMessage={customNoOptionsMessage}
                          onFocus={() => handleFocus('periodicityCode', true)}
                          onBlur={() => handleFocus('periodicityCode', false)}
                          onChange={(newValue) => handleSelectChange(newValue, 'periodicityCode')}
                          value={responsePlansOptions.find(option => option.value === formData.periodicityCode)}
                          className={`${errors.periodicityCodeError ? 'border-[#d32f2f] border-[1px] !rounded-[0.3rem]' : ''}`}
                        />
                      </Box>
                      {errors.periodicityCodeError && <FormHelperText className='!text-[#d32f2f]'>{errors.periodicityCodeError}</FormHelperText>}
                      <Box className='flex justify-start items-center mt-5'>
                        <AiOutlineDollar className='w-[30px] h-[30px] text-[#424242]' />
                        <Box className='text-[1.3rem] ml-[1vw] text-[#424242]'>Cobrança</Box>
                        <Tooltip
                          title={
                            <>
                              Você pode definir a cobrança de duas formas: Imediata ou programada.<br /><br />
                              <b>Cobrança imediata:</b> O pagamento é processado imediatamente, e o vencimento ocorre no mesmo dia da matrícula.<br /><br />
                              <b>Cobrança programada:</b> Você define a data das próximas cobranças, com o primeiro pagamento realizado hoje.
                            </>
                          } placement="left" arrow>
                          <IconButton
                            size="small"
                            sx={{ marginLeft: '5px' }}
                          >
                            <HelpOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Divider className='!my-5' />
                      <Box className='w-full flex flex-row ml-[0.7rem] justify-between'>
                        <Box className='w-full'>
                            <RadioGroup
                              name="paymentDay"
                              className='flex justify-between'
                              row
                              onChange={handleRadioChange}
                            >
                              <FormControlLabel
                                value="today"
                                control={<Radio color="primary" />}
                                label="Imediata"
                                className='bg-white md:w-[48%] w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-0'
                                checked={selectedPaymentValue === 'today'}
                              />
                              <FormControlLabel
                                value="programmed"
                                control={<Radio color="primary" />}
                                label="Programado"
                                className='bg-white md:w-[48%] md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-[0.7rem]'
                                checked={selectedPaymentValue === 'programmed'}
                              />
                            </RadioGroup>
                        </Box>
                      </Box>
                      <Collapse in={selectedPaymentValue === 'programmed'} timeout={300}>
                        <FormControl fullWidth>
                          <TextField
                            disabled={selectedPaymentValue !== 'programmed'}
                            name='paymentDay'
                            label='Data de Vencimento'
                            variant='outlined'
                            className='!mt-5'
                            type='date'
                            value={formData.paymentDay}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if (e.target.value.length <= 10) {
                                handleTextFieldChange(e);
                              }
                            }}
                            error={!!errors.paymentDayError}
                            helperText={errors.paymentDayError}
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                      </Collapse>
                      <FormControl fullWidth>
                        <TextField
                          name='detailsPlan'
                          multiline
                          rows={4}
                          label='Observações do Plano'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.detailsPlan}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 300 }}
                        />
                        <Box
                          className='mt-2 font-light text-[.9rem]'
                          sx={{
                            color: charactersRemaining <= 10 ? 'red' : 'inherit',
                          }}
                        >
                          Restam {charactersRemaining} caracteres
                        </Box>
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
                      <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                        <Box className='md:w-[65.7%] w-full'>
                          <FormControl fullWidth>
                            <TextField
                              required
                              name='email'
                              label='E-mail'
                              variant='outlined'
                              value={formData.email}
                              onChange={handleTextFieldChange}
                              error={!!errors.emailError}
                              helperText={errors.emailError}
                              disabled={isNoEmail}
                              inputProps={{ maxLength: 100 }}
                            />
                          </FormControl>
                        </Box>
                        <Box className='md:w-[30%] md:mt-2 md:ml-4 w-full mt-5'>
                          <FormControl component="fieldset" className="flex justify-center" fullWidth>
                            <FormControlLabel
                              control={
                              <Checkbox 
                                checked={isNoEmail} 
                                onChange={handleNoEmailToggle} 
                              />} 
                                label={'Sem e-mail'}
                            />
                          </FormControl>
                        </Box>
                      </Box>
                      <FormControl fullWidth>
                        <TextField
                          name='emergencyContact'
                          label='Contato de Emergência'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.emergencyContact}
                          onChange={handleTextFieldChange}
                          inputProps={{ maxLength: 100 }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='emergencyPhone'
                          label='Telefone de Emergência'
                          variant='outlined'
                          className='!mt-5'
                          value={formData.emergencyPhone}
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
                <Typography variant="body2" color="textSecondary">Este aluno é menor de idade, por isso informações adicionais são necessárias.</Typography>
                <Typography variant="body2" color="textSecondary" className='!mt-2'>Por favor, preencha os campos obrigatórios abaixo.</Typography>
                <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                  <Box className='md:w-[65.7%] w-full'>
                    <FormControl fullWidth>
                      <TextField
                        required
                        name='responsible'
                        label='Nome do Responsável'
                        variant='outlined'
                        value={formData.responsible}
                        onChange={handleTextFieldChange}
                        error={!!errors.responsibleError}
                        helperText={errors.responsibleError}
                        disabled={isResponsible}
                        inputProps={{ maxLength: 100 }}
                      />
                    </FormControl>
                  </Box>
                  <Box className='md:w-[30%] md:mt-2 md:ml-4 w-full mt-5'>
                    <FormControl component="fieldset" className="flex justify-center" fullWidth>
                      <FormControlLabel
                        control={
                        <Checkbox 
                          checked={isResponsible} 
                          onChange={handleIsResponsibleToggle} 
                        />} 
                          label={'Autodeclarar'}
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box className='w-full flex flex-row flex-wrap mt-5 justify-between'>
                  <Box className='md:w-[65.7%] w-full'>
                    <FormControl fullWidth>
                      <TextField
                        required
                        placeholder='CPF'
                        name='financeResponsible'
                        label='Responsável Financeiro'
                        variant='outlined'
                        value={formData.financeResponsible}
                        onChange={handleTextFieldChange}
                        error={!!errors.financeResponsibleError}
                        helperText={errors.financeResponsibleError}
                        disabled={isFinanceResponsible}
                      />
                    </FormControl>
                  </Box>
                  <Box className='md:w-[30%] md:mt-2 md:ml-4 w-full mt-5'>
                    <FormControl component="fieldset" className="flex justify-center" fullWidth>
                      <FormControlLabel
                        control={
                        <Checkbox 
                          checked={isFinanceResponsible} 
                          onChange={handleFinanceResponsibleToggle} 
                        />} 
                          label={'Autodeclarar'}
                      />
                    </FormControl>
                  </Box>
                </Box>

                {responseFinanceResponsible && !isFinanceResponsible ? (
                  <Box className='flex flex-col gap-4 p-6 bg-neutral-100 rounded-xl mt-5'>
                    <Box className='flex flex-row'>
                      <Box className='flex flex-col flex-grow'>
                        <Typography className='text-left !font-roboto !font-semibold !text-xl text-neutral-900'>
                          {responseFinanceResponsible.findStudent.name}
                        </Typography>
                        <Typography className='text-left !font-roboto !font-medium !text-base text-neutral-500'>
                          {responseFinanceResponsible.findStudent.identity}
                        </Typography>
                      </Box>
                      <Box>
                      <GrUserManager className='text-[2.5rem] text-[#282929]' />
                      </Box>
                    </Box>
                    <Box className='flex flex-row flex-grow items-center gap-2'>
                      <HiOutlineLocationMarker className='text-[1.5rem] text-[#282929]' />
                      <Typography className='text-left !font-roboto !font-normal !text-sm text-neutral-500'>
                        {responseFinanceResponsible.findStudent.address}
                      </Typography>
                    </Box>
                  </Box>
                ) : errors.searchFinanceResponsibleError && (
                  <Box className='flex flex-col gap-4 p-6 rounded-xl text-rose-900 bg-rose-50 mt-5'>
                    <Box className='flex flex-row items-center'>
                      <AiOutlineCloseCircle className='text-[2.5rem]' />
                      <Typography className='!ml-3 text-left !font-roboto !font-semibold !text-xl'>
                        {errors.searchFinanceResponsibleError}
                      </Typography>
                    </Box>
                    <Typography className='text-left !font-roboto !font-normal !text-sm'>
                      Por favor, verifique os dados inseridos ou entre em contato com o nosso suporte.
                    </Typography>
                  </Box>
                )}
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
                  disabled={ isFinishDisabled || isLoading}
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