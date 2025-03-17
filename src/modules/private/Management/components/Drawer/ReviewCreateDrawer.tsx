import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, CircularProgress, Divider, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, Select as MuiSelect, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GrUserManager } from 'react-icons/gr';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdCheckCircle, MdKeyboardArrowRight } from 'react-icons/md';
import { DrawerProps } from '../../../../common/types';
import { useReviewUpsertForm } from '../../hooks';

export const ReviewCreateDrawer = ({
  closeDrawer,
  enqueueSnackbar,
  refreshInternal,
  data,
}: DrawerProps) => {

  const {
    isLoading,
    formData,
    errors,
    activeStep,
    dynamicSteps,
    handleTextFieldChange,
    handleBack,
    handleContinue,
    handleFinish,
    responseReviewQuestions,
    handleRadioChange,
    setActiveStep,
    handleSelectMuiChange,
    protocolsOptions,
    getImcColor,
    getImcPosition,
    getReviewClassification,
    imcColorAll,
    imcColorElderly,
    imcColorMan,
    imcColorWoman,
    imcColorIacAll,
    imcColorIacWoman,
    imcColorIacMan,
    rcqColorAll,
    rcqColorMan60and69,
    rcqColorMan50and59,
    rcqColorMan40and49,
    rcqColorMan30and39,
    rcqColorMan20and29,
    rcqColorWoman60and69,
    rcqColorWoman50and59,
    rcqColorWoman40and49,
    rcqColorWoman30and39,
    protocolsOptionsCardio,
    filteredQuestionsCardio,
    responseEvaluator,
    infoCompleted,
    charactersRemaining
  } = useReviewUpsertForm({ closeDrawer, enqueueSnackbar, data, refreshInternal });

  const tretacompartimentalData = [
    {
      label: 'Massa Gorda',
      value: Number(formData.massagordakg),
      color: '#FF9800'
    },
    {
      label: 'Massa Residual',
      value: Number(formData.massaresidual),
      color: '#4CAF50'
    },
    {
      label: 'Massa Óssea',
      value: Number(formData.massaossea),
      color: '#673AB7'
    },
    {
      label: 'Massa Muscular',
      value: Number(formData.massamuscular),
      color: '#D32F2F'
    },
  ];

  const valueFormatter = (item: { label: string; value: number }) => {
    return `${item.value}kg`;
  };    

  const size = {
    width: 300,
    height: 200,
  };

  const dataPie = {
    data: tretacompartimentalData,
    valueFormatter,
  };

  return (
    <Box>
      <Box className='flex justify-between'>
        <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
          Nova Avaliação
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
          {activeStep === 0 && (
            <Typography className='!text-[.8rem] !absolute right-[2rem] top-[4.7rem] text-gray-500'>(<span className='text-[#ff0000]'>*</span>) Campos Obrigatórios</Typography>
          )}
        </Box>
      </Box>
      <Box className='w-full flex flex-col justify-start items-center gap-4 mt-8'>
        <Box className='flex w-full'>
          <Box className='min-w-[200px] mr-[24px]'>
            {dynamicSteps.map((step, index) => (
              <Box
                className='flex items-center p-7 pl-5 cursor-pointer hover:bg-[#f3f3f4]'
                key={index}
                sx={{
                  backgroundColor: activeStep === index ? '#f3f3f4' : 'transparent',
                  fontWeight: activeStep === index ? 'normal' : '300',
                  height: '50px',
                  borderRadius: '8px',
                  transition: 'background-color 0.3s',
                  marginBottom: '.5rem'
                }}
                onClick={() => setActiveStep(index)}
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
                      <Box className='flex flex-row items-center justify-center'>
                      <FormControl fullWidth>
                        <TextField
                          name='evaluatorSearch'
                          label='Avaliador'
                          variant='outlined'
                          value={formData.evaluatorSearch}
                          onChange={handleTextFieldChange}
                        />
                      </FormControl>
                      <Tooltip
                        title={
                            <>
                                Caso o avaliador não seja informado, o campo será atribuído automaticamente a você.
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
                      {responseEvaluator ? (
                        <Box className='flex flex-col gap-4 p-6 bg-neutral-100 rounded-xl mt-5'>
                          <Box className='flex flex-row'>
                            <Box className='flex flex-col flex-grow'>
                              <Typography className='text-left !font-roboto !font-semibold !text-xl text-neutral-900'>
                                {responseEvaluator.findStudent.name}
                              </Typography>
                              <Typography className='text-left !font-roboto !font-medium !text-base text-neutral-500'>
                                {responseEvaluator.findStudent.identity}
                              </Typography>
                            </Box>
                            <Box>
                            <GrUserManager className='text-[2.5rem] text-[#282929]' />
                            </Box>
                          </Box>
                          <Box className='flex flex-row flex-grow items-center gap-2'>
                            <HiOutlineLocationMarker className='text-[1.5rem] text-[#282929]' />
                            <Typography className='text-left !font-roboto !font-normal !text-sm text-neutral-500'>
                              {responseEvaluator.findStudent.address}
                            </Typography>
                          </Box>
                        </Box>
                      ) : errors.searchFindEvaluatorError && (
                        <Box className='flex flex-col gap-4 p-6 rounded-xl text-rose-900 bg-rose-50 mt-5'>
                          <Box className='flex flex-row items-center'>
                            <AiOutlineCloseCircle className='text-[2.5rem]' />
                            <Typography className='!ml-3 text-left !font-roboto !font-semibold !text-xl'>
                              {errors.searchFindEvaluatorError}
                            </Typography>
                          </Box>
                          <Typography className='text-left !font-roboto !font-normal !text-sm'>
                            Por favor, verifique os dados inseridos ou entre em contato com o nosso suporte.
                          </Typography>
                        </Box>
                      )}

                      <FormControl fullWidth>
                        <TextField
                          name='dueDate'
                          label='Próxima Avaliação'
                          variant='outlined'
                          className='!my-5'
                          type='date'
                          value={formData.dueDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length <= 10) {
                              handleTextFieldChange(e);
                            }
                          }}
                          error={Boolean(errors.dueDateError)}
                          helperText={errors.dueDateError}
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>

                      <FormControl fullWidth>
                          <TextField
                            required
                            name='height'
                            label='Altura'
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            value={formData.height}
                            onChange={handleTextFieldChange}
                            className='!mb-5'
                            error={!!errors.heightError}
                            helperText={errors.heightError}
                            inputProps={{ maxLength: 5 }}
                            InputProps={{
                              endAdornment:
                                <InputAdornment position="end">cm</InputAdornment>
                            }}
                          />
                        </FormControl>
                        <FormControl fullWidth>
                          <TextField
                            required
                            name='weight'
                            label='Peso'
                            className='!mb-5'
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            value={formData.weight}
                            error={!!errors.weightError}
                            helperText={errors.weightError}
                            onChange={handleTextFieldChange}
                            inputProps={{ maxLength: 5 }}
                            InputProps={{
                              endAdornment:
                                <InputAdornment position="end">kg</InputAdornment>
                            }}
                          />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                name='observation'
                                placeholder='Esta informação será interna e exibida nos detalhes da avaliação.'
                                multiline
                                rows={4}
                                label='Observações'
                                variant='outlined'
                                value={formData.observation}
                                onChange={handleTextFieldChange}
                                inputProps={{ maxLength: 300 }}
                            />
                            <Box
                            className='mt-2 font-light text-[.9rem]'
                            sx={{
                                color: (charactersRemaining[`observation`]) <= 10 ? 'red' : 'inherit',
                            }}
                            >
                            Restam {charactersRemaining[`observation`]} caracteres
                            </Box>
                      </FormControl>
                    </>
                  );

                case 1:
                  return (
                    <>
                      {responseReviewQuestions?.findReviewQuestions.filter((question) => question.category === 'ANAMNESE').map((question) => (
                          <FormControl fullWidth key={question.questionCode}>
                              <TextField
                                  name={question.question.replace(/[\s?,()/]/g, '').toLowerCase()}
                                  key={question.questionCode}
                                  label={question.question}
                                  variant='outlined'
                                  value={formData[question.question.replace(/[\s?,()/]/g, '').toLowerCase()]}
                                  onChange={handleTextFieldChange}
                                  className='!mb-5'
                                  inputProps={{ maxLength: 100 }}
                              />
                          </FormControl>
                      ))}
                    </>
                  );

                case 2:
                  return (
                    <>
                      {responseReviewQuestions?.findReviewQuestions.filter((question) => question.category === 'PAR_Q').map((question) => (
                          <Box className='w-full flex flex-col justify-between'>
                            <Box className='!mb-2'>{question.question}</Box>
                            <Box className='w-full ml-[0.7rem] mb-5'>
                                <RadioGroup
                                    key={question.questionCode}
                                    name={question.question.replace(/[\s?,()/]/g, '').toLowerCase()}
                                    className='flex justify-between'
                                    onChange={handleRadioChange}
                                    value={formData[question.question.replace(/[\s?,()/]/g, '').toLowerCase()]}
                                    row
                                >
                                    <FormControlLabel
                                    value="yes"
                                    control={<Radio color="primary" />}
                                    label="Sim"
                                    className='bg-white md:w-[49%] w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-0'
                                    />
                                    <FormControlLabel
                                    value="no"
                                    control={<Radio color="primary" />}
                                    label="Não"
                                    className='bg-white md:w-[49%] md:mt-0 mt-5 w-full h-14 border-solid border-[1px] border-greyNeutral rounded-lg !mr-[0.7rem]'
                                    />
                                </RadioGroup>
                            </Box>
                          </Box>
                      ))}
                    </>
                  );

                case 3:
                  return (
                    <>
                      {responseReviewQuestions?.findReviewQuestions.filter((question) => question.category === 'MEASURES').map((question) => (
                        <FormControl fullWidth key={question.questionCode}>
                          <TextField
                            name={question.question.replace(/[\s?]/g, '').toLowerCase()}
                            label={question.question}
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            value={formData[question.question.replace(/[\s?]/g, '').toLowerCase()]}
                            onChange={handleTextFieldChange}
                            className='!mb-5'
                            inputProps={{ maxLength: 5 }}
                            InputProps={{
                              endAdornment:
                                <InputAdornment position="end">cm</InputAdornment>
                            }}
                          />
                        </FormControl>
                      ))}
                      <FormControl fullWidth>
                        <TextField
                          name='waist'
                          label='Cintura'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.waist}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='abdome'
                          label='Abdome'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.abdome}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='hip'
                          label='Quadril'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.hip}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>
                    </>
                  );
                
                case 4:
                  return (
                    <>
                      <FormControl fullWidth>
                        <TextField
                          name='subscapularis'
                          label='Subescapular'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.subscapularis}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">mm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='triceps'
                          label='Tríceps'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.triceps}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">mm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='biceps'
                          label='Bíceps'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.biceps}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">mm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='chest'
                          label='Tórax'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.chest}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">mm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='middleAxillary'
                          label='Axilar Média'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.middleAxillary}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">mm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='suprailiac'
                          label='Suprailíaca'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.suprailiac}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">mm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='abdominal'
                          label='Abdominal'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.abdominal}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">mm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='medialThigh'
                          label='Coxa Medial'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.medialThigh}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">mm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='medialCalf'
                          label='Panturrilha Medial'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.medialCalf}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">mm</InputAdornment>
                          }}
                        />
                      </FormControl>
                    </>
                  );

                case 5:
                  return (
                    <>
                      <FormControl fullWidth>
                        <TextField
                          name='wristBistyloid'
                          label='Biestilóide do Punho'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.wristBistyloid}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='femurBistyloid'
                          label='Biepicôndilo do Fêmur'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.femurBistyloid}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>
                    </>
                  );

                case 6:
                  return (
                    <>
                      <Box className='flex flex-col'>
                        <FormControl className='w-full !mb-5'>
                          <InputLabel id="protocol">Protocolo</InputLabel>
                          <MuiSelect
                            labelId="protocol"
                            id="protocol"
                            name="protocol"
                            value={String(formData.protocol)}
                            onChange={handleSelectMuiChange}
                            label="Protocolo"
                            className="w-full"
                          >
                            {protocolsOptions.map((protocol) => (
                              <MenuItem 
                                key={protocol.value} 
                                value={protocol.value}
                                disabled={protocol.isDisabled || false}
                              >
                                {protocol.label}
                              </MenuItem>
                            ))}
                          </MuiSelect>
                        </FormControl>
                        {formData.protocol === 'JPW78807' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='subscapularis'
                                label='Subescapular'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.subscapularis}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='triceps'
                                label='Tríceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.triceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='chest'
                                label='Tórax'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.chest}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='middleAxillary'
                                label='Axilar Média'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.middleAxillary}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='suprailiac'
                                label='Suprailíaca'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.suprailiac}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='abdominal'
                                label='Abdominal'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.abdominal}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='medialThigh'
                                label='Coxa Medial'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.medialThigh}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'JPW78803' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='triceps'
                                label='Tríceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.triceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='suprailiac'
                                label='Suprailíaca'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.suprailiac}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='medialThigh'
                                label='Coxa Medial'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.medialThigh}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'P954' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='subscapularis'
                                label='Subescapular'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.subscapularis}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='triceps'
                                label='Tríceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.triceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='suprailiac'
                                label='Suprailíaca'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.suprailiac}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='medialCalf'
                                label='Panturrilha Medial'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.medialCalf}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'G853' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='triceps'
                                label='Tríceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.triceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='suprailiac'
                                label='Suprailíaca'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.suprailiac}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='abdominal'
                                label='Abdominal'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.abdominal}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'G943' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='subscapularis'
                                label='Subescapular'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.subscapularis}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='suprailiac'
                                label='Suprailíaca'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.suprailiac}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='medialThigh'
                                label='Coxa Medial'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.medialThigh}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'F684' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='subscapularis'
                                label='Subescapular'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.subscapularis}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='triceps'
                                label='Tríceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.triceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='suprailiac'
                                label='Suprailíaca'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.suprailiac}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='abdominal'
                                label='Abdominal'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.abdominal}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'DR674' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='subscapularis'
                                label='Subescapular'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.subscapularis}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='triceps'
                                label='Tríceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.triceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='biceps'
                                label='Bíceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.biceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='suprailiac'
                                label='Suprailíaca'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.suprailiac}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'L964' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='subscapularis'
                                label='Subescapular'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.subscapularis}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='triceps'
                                label='Tríceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.triceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='biceps'
                                label='Bíceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.biceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='suprailiac'
                                label='Suprailíaca'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.suprailiac}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'T847' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='subscapularis'
                                label='Subescapular'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.subscapularis}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='triceps'
                                label='Tríceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.triceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='middleAxillary'
                                label='Axilar Média'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.middleAxillary}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='suprailiac'
                                label='Suprailíaca'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.suprailiac}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='abdominal'
                                label='Abdominal'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.abdominal}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='medialThigh'
                                label='Coxa Medial'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.medialThigh}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='medialCalf'
                                label='Panturrilha Medial'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.medialCalf}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'T843' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='subscapularis'
                                label='Subescapular'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.subscapularis}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='triceps'
                                label='Tríceps'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.triceps}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                            <FormControl fullWidth>
                              <TextField
                                name='middleAxillary'
                                label='Axilar Média'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.middleAxillary}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">mm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        {formData.protocol === 'W88PO' && (
                          <Box className="w-full flex flex-col justify-between">
                            <FormControl fullWidth>
                              <TextField
                                name='abdome'
                                label='Abdome'
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                value={formData.abdome}
                                onChange={handleTextFieldChange}
                                className='!mb-5'
                                inputProps={{ maxLength: 5 }}
                                InputProps={{
                                  endAdornment:
                                    <InputAdornment position="end">cm</InputAdornment>
                                }}
                              />
                            </FormControl>
                          </Box>
                        )}
                        <FormControl fullWidth>
                          <TextField
                            name='wristBistyloid'
                            label='Biestilóide do Punho'
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            value={formData.wristBistyloid}
                            onChange={handleTextFieldChange}
                            className='!mb-5'
                            inputProps={{ maxLength: 5 }}
                            InputProps={{
                              endAdornment:
                                <InputAdornment position="end">cm</InputAdornment>
                            }}
                          />
                        </FormControl>
                        <FormControl fullWidth>
                          <TextField
                            name='femurBistyloid'
                            label='Biepicôndilo do Fêmur'
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            value={formData.femurBistyloid}
                            onChange={handleTextFieldChange}
                            className='!mb-5'
                            inputProps={{ maxLength: 5 }}
                            InputProps={{
                              endAdornment:
                                <InputAdornment position="end">cm</InputAdornment>
                            }}
                          />
                        </FormControl>
                        <FormControl fullWidth>
                          <TextField
                            name='height'
                            label='Altura'
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            value={formData.height}
                            onChange={handleTextFieldChange}
                            className='!mb-5'
                            inputProps={{ maxLength: 5 }}
                            InputProps={{
                              endAdornment:
                                <InputAdornment position="end">cm</InputAdornment>
                            }}
                          />
                        </FormControl>
                        <FormControl fullWidth>
                          <TextField
                            name='weight'
                            label='Peso'
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            value={formData.weight}
                            onChange={handleTextFieldChange}
                            inputProps={{ maxLength: 5 }}
                            InputProps={{
                              endAdornment:
                                <InputAdornment position="end">kg</InputAdornment>
                            }}
                          />
                        </FormControl>
                      </Box>

                      <Divider className='w-full !my-5' />

                      <Box className="flex flex-col items-center rounded-lg h-full justify-between">
                        {((() => {
                          const [day, month, year] = data.birthDate.split('/').map(Number);
                          const birthDate = new Date(year, month - 1, day);
                          const today = new Date();
                          
                          let age = today.getFullYear() - birthDate.getFullYear();
                          const hasBirthdayPassed = (today.getMonth() > birthDate.getMonth()) || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
                          
                          if (!hasBirthdayPassed) {
                              age--;
                          }
                          const isAll = !data.gender || data.gender === 'OTHERS';
                          const isMan = data.gender === 'MAN';
                          const isWoman = data.gender === 'WOMAN';

                          return (
                            <>
                              {/* Resultado Geral */}
                              {isAll && (
                                <>
                                  {Number(formData.massamagrakg) > 0 && Number(formData.massagorda) > 0 && Number(formData.sd) > 0 ? (
                                      <>
                                        {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                          <Typography className="text-black">Referência para pessoas entre 18 a 61 anos</Typography>
                                        )}

                                        {formData.protocol === 'P954' && (
                                          <Typography className="text-black text-center">Referência para pessoas entre 18 a 66 anos</Typography>
                                        )}

                                        {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                          <Typography className="text-black text-center">Referência para pessoas entre 17 a 27 anos</Typography>
                                        )}

                                        {formData.protocol === 'F684' && (
                                          <Typography className="text-black text-center">Referência para todas as idades</Typography>
                                        )}

                                        {formData.protocol === 'DR674' && (
                                          <Typography className="text-black text-center">Referência para pessoas entre 18 a 33 anos</Typography>
                                        )}

                                        {formData.protocol === 'L964' && (
                                          <Typography className="text-black text-center">Referência para pessoas entre 17 a 65 anos</Typography>
                                        )}

                                        {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                          <Typography className="text-black text-center">Referência para pessoas entre 14 a 19 anos</Typography>
                                        )}

                                        {formData.protocol === 'W88PO' && (
                                          <Typography className="text-black text-center">Referência para pessoas obesas</Typography>
                                        )}

                                        <Typography className='!mt-5'>Bicompartimental</Typography>

                                        <Box className='w-full flex flex-row justify-between mt-5'>
                                            <Box className='flex flex-col items-center text-[#4caf50] text-[1.5rem] font-bold mx-5'>
                                                <Box className='flex flex-row'>
                                                    {String(formData.massamagra).replace('.', ',')}%
                                                    <Box className='text-[.8rem] font-normal mt-3 ml-2'>({String(formData.massamagrakg).replace('.', ',')}kg)</Box>
                                                </Box>
                                                <Box className='text-[.8rem] uppercase font-normal '>Massa Magra</Box>
                                            </Box>
                                            <Box className='flex flex-col items-center text-[#FF9800] text-[1.5rem] font-bold mx-5'>
                                                <Box className='flex flex-row'>
                                                    {String(formData.massagorda).replace('.', ',')}%
                                                    <Box className='text-[.8rem] font-normal mt-3 ml-2'>({String(formData.massagordakg).replace('.', ',')}kg)</Box>
                                                </Box>
                                                <Box className='text-[.8rem] uppercase font-normal '>Massa Gorda</Box>
                                            </Box>
                                        </Box>
                                      
                                        <Box className="w-full mt-1 relative">
                                            <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                <Box className="bg-[#4caf50]" style={{ width: `${formData.massamagra}%` }}></Box> {/* Peso normal */}
                                                <Box className="bg-[#FF9800]" style={{ width: `${formData.massagorda}%` }}></Box> {/* Sobrepeso */}
                                            </Box>
                                        </Box>
                                          {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 18 ou mais de 61 anos.</Typography>
                                          )}

                                          {formData.protocol === 'P954' && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 18 ou mais de 66 anos.</Typography>
                                          )}

                                          {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 17 ou mais de 27 anos.</Typography>
                                          )}

                                          {formData.protocol === 'DR674' && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 18 ou mais de 33 anos.</Typography>
                                          )}

                                          {formData.protocol === 'L964' && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 17 ou mais de 65 anos.</Typography>
                                          )}

                                          {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 14 ou mais de 19 anos.</Typography>
                                          )}
                                      </>
                                  ) : (
                                      <Box className='text-center'>
                                          <Typography>Bicompartimental</Typography>
                                          <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                          <Typography className="!mt-5">Preencha os campos acima para calcular.</Typography>
                                      </Box>
                                  )}

                                  <Divider className='w-full !my-5' />

                                  {Number(formData.massagorda) > 0 && Number(formData.sd) > 0 &&
                                      Number(formData.massaresidual) > 0 &&
                                      Number(formData.massaossea) > 0 &&
                                      Number(formData.massamuscular) > 0 ? (
                                      <>
                                          {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                              <Typography className="text-black">Referência para pessoas entre 18 a 61 anos</Typography>
                                          )}

                                          {formData.protocol === 'P954' && (
                                              <Typography className="text-black text-center">Referência para pessoas entre 18 a 66 anos</Typography>
                                          )}

                                          {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                              <Typography className="text-black text-center">Referência para pessoas entre 17 a 27 anos</Typography>
                                          )}

                                          {formData.protocol === 'F684' && (
                                              <Typography className="text-black text-center">Referência para todas as idades</Typography>
                                          )}

                                          {formData.protocol === 'DR674' && (
                                              <Typography className="text-black text-center">Referência para pessoas entre 18 a 33 anos</Typography>
                                          )}

                                          {formData.protocol === 'L964' && (
                                              <Typography className="text-black text-center">Referência para pessoas entre 17 a 65 anos</Typography>
                                          )}

                                          {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                              <Typography className="text-black text-center">Referência para pessoas entre 14 a 19 anos</Typography>
                                          )}

                                          {formData.protocol === 'W88PO' && (
                                              <Typography className="text-black text-center">Referência para pessoas obesas</Typography>
                                          )}

                                          <Typography className='!mt-5'>Tetracompartimental</Typography>
                                          <Box className='w-full flex flex-row mt-5 justify-between'>
                                              <Box className='w-[210px]'>
                                              <PieChart
                                                  series={[{
                                                      innerRadius: 20,
                                                      outerRadius: 100,
                                                      paddingAngle: 5,
                                                      cornerRadius: 7,
                                                      startAngle: -45,
                                                      cx: 100,
                                                      arcLabel: (item) => `${item.value}kg`,
                                                      arcLabelMinAngle: 35,
                                                      arcLabelRadius: '70%',
                                                      data: dataPie.data,
                                                  },
                                                  ]}
                                                  slotProps={{
                                                      legend: {
                                                          hidden: true,
                                                      },
                                                  }}
                                                  sx={{
                                                      [`& .${pieArcLabelClasses.root}`]: {
                                                      fontWeight: 'bold',
                                                      fill: 'white',
                                                      fontSize: 15,
                                                      },
                                                  }}
                                                  {...size}
                                              />
                                              </Box>
                                              <Box className='flex flex-col justify-center'>
                                                  <Box className='flex flex-row items-center text-[1.5rem]'>
                                                      <Box className='w-3 h-3 bg-[#FF9800] rounded-sm'></Box>
                                                      <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Gorda</span> ({String(formData.massagordakg).replace('.', ',')}kg)</Box>
                                                  </Box>
                                                  <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                      <Box className='w-3 h-3 bg-[#4CAF50] rounded-sm'></Box>
                                                      <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Residual</span> ({String(formData.massaresidual).replace('.', ',')}kg)</Box>
                                                  </Box>
                                                  <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                      <Box className='w-3 h-3 bg-[#673AB7] rounded-sm'></Box>
                                                      <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Óssea</span> ({String(formData.massaossea).replace('.', ',')}kg)</Box>
                                                  </Box>
                                                  <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                      <Box className='w-3 h-3 bg-[#D32F2F] rounded-sm'></Box>
                                                      <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Muscular</span> ({String(formData.massamuscular).replace('.', ',')}kg)</Box>
                                                  </Box>
                                              </Box>
                                          </Box>

                                          {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 18 ou mais de 61 anos.</Typography>
                                          )}

                                          {formData.protocol === 'P954' && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 18 ou mais de 66 anos.</Typography>
                                          )}

                                          {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 17 ou mais de 27 anos.</Typography>
                                          )}

                                          {formData.protocol === 'DR674' && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 18 ou mais de 33 anos.</Typography>
                                          )}

                                          {formData.protocol === 'L964' && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 17 ou mais de 65 anos.</Typography>
                                          )}

                                          {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 14 ou mais de 19 anos.</Typography>
                                          )}
                                      </>
                                  ) : (
                                      <Box className='text-center'>
                                          <Typography>Tetracompartimental</Typography>
                                          <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                          <Typography className=" !mt-5">Preencha os campos acima para calcular.</Typography>
                                      </Box>
                                  )}
                                  
                                  <Divider className='w-full !my-5' />

                                  {Number(formData.massagorda) > 0 && Number(formData.sd) > 0 ? (
                                      <>
                                          <Typography>Classificação de Massa Gorda</Typography>

                                          {age < 19 && (
                                              <>
                                                  <Typography className="text-black !mt-5">Referência para crianças e adolescentes</Typography>
                                                  <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_ALL_20') }}>
                                                      <Typography variant="h4" className="!font-bold">
                                                          {String(formData.massagorda).replace('.', ',')}
                                                      </Typography>
                                                      <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                  </Box>
                                              </>
                                          )}

                                          {age > 18 && age <= 20 && (
                                              <>
                                                  <Typography className="text-black !mt-5">Referência para pessoas com menos de 20 anos</Typography>
                                                  <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_ALL_20') }}>
                                                      <Typography variant="h4" className="!font-bold">
                                                          {String(formData.massagorda).replace('.', ',')}
                                                      </Typography>
                                                      <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                  </Box>
                                              </>
                                          )}

                                          {age >= 20 && age <= 29 && (
                                              <>
                                                  <Typography className="text-black !mt-5">Referência para pessoas entre 20 a 29 anos</Typography>
                                                  <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_ALL_20_29') }}>
                                                      <Typography variant="h4" className="!font-bold">
                                                          {String(formData.massagorda).replace('.', ',')}
                                                      </Typography>
                                                      <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                  </Box>
                                              </>
                                          )}

                                          {age >= 30 && age <= 39 && (
                                              <>
                                                  <Typography className="text-black !mt-5">Referência para pessoas entre 30 a 39 anos</Typography>
                                                  <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_ALL_30_39') }}>
                                                      <Typography variant="h4" className="!font-bold">
                                                          {String(formData.massagorda).replace('.', ',')}
                                                      </Typography>
                                                      <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                  </Box>
                                              </>
                                          )}

                                          {age >= 40 && age <= 49 && (
                                              <>
                                                  <Typography className="text-black !mt-5">Referência para pessoas entre 40 a 49 anos</Typography>
                                                  <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_ALL_40_49') }}>
                                                      <Typography variant="h4" className="!font-bold">
                                                          {String(formData.massagorda).replace('.', ',')}
                                                      </Typography>
                                                      <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                  </Box>
                                              </>
                                          )}

                                          {age >= 50 && age <= 59 && (
                                              <>
                                                  <Typography className="text-black !mt-5">Referência para pessoas entre 50 a 59 anos</Typography>
                                                  <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_ALL_50_59') }}>
                                                      <Typography variant="h4" className="!font-bold">
                                                          {String(formData.massagorda).replace('.', ',')}
                                                      </Typography>
                                                      <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                  </Box>
                                              </>
                                          )}

                                          {age > 59 && (
                                              <>
                                                  <Typography className="text-black !mt-5">Referência para pessoas com mais de 59 anos</Typography>
                                                  <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_ALL_59') }}>
                                                      <Typography variant="h4" className="!font-bold">
                                                          {String(formData.massagorda).replace('.', ',')}
                                                      </Typography>
                                                      <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                  </Box>
                                              </>
                                          )}

                                          <Box className="w-full mt-5 relative">
                                              <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                  {age < 20 && (
                                                      <>
                                                          <Box className="bg-[#FFD700] w-[16.7%]"></Box>
                                                          <Box className="bg-[#FFC107] w-[16.7%]"></Box>
                                                          <Box className="bg-[#4CAF50] w-[16.7%]"></Box>
                                                          <Box className="bg-[#FF9800] w-[16.7%]"></Box>
                                                          <Box className="bg-[#FF5722] w-[16.7%]"></Box>
                                                          <Box className="bg-[#D32F2F] w-[16.7%]"></Box>
                                                      </>
                                                  )}

                                                  {age >= 20 && (
                                                      <>
                                                          <Box className="bg-[#224e23] w-[20%]"></Box>
                                                          <Box className="bg-[#337535] w-[20%]"></Box>
                                                          <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                          <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                          <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      </>
                                                  )}
                                              </Box>

                                              {age < 20 && (
                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_ALL_20') }} />
                                              )}

                                              {age >= 20 && age <= 29 && (
                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_ALL_20_29') }} />
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_ALL_30_39') }} />
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_ALL_40_49') }} />
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_ALL_50_59') }} />
                                              )}

                                              {age > 59 && (
                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_ALL_59') }} />
                                              )}
                                              
                                          </Box>

                                          <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                              {age < 20 && (
                                                  <>
                                                      <Typography className="absolute left-[16%]">5</Typography>
                                                      <Typography className="absolute left-[32%]">16</Typography>
                                                      <Typography className="absolute right-[48%]">26</Typography>
                                                      <Typography className="absolute right-[31.9%]">31</Typography>
                                                      <Typography className="absolute right-[14.6%]">37</Typography>
                                                  </>
                                              )}

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="absolute left-[19%]">11</Typography>
                                                      <Typography className="absolute left-[38.5%]">20</Typography>
                                                      <Typography className="absolute right-[37.7%]">29</Typography>
                                                      <Typography className="absolute right-[18.6%]">32</Typography>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="absolute left-[19%]">12</Typography>
                                                      <Typography className="absolute left-[38.5%]">21</Typography>
                                                      <Typography className="absolute right-[37.7%]">30</Typography>
                                                      <Typography className="absolute right-[18.6%]">33</Typography>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="absolute left-[19%]">14</Typography>
                                                      <Typography className="absolute left-[38.5%]">22</Typography>
                                                      <Typography className="absolute right-[37.7%]">31</Typography>
                                                      <Typography className="absolute right-[18.6%]">34</Typography>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="absolute left-[19%]">15</Typography>
                                                      <Typography className="absolute left-[38.5%]">23</Typography>
                                                      <Typography className="absolute right-[37.7%]">32</Typography>
                                                      <Typography className="absolute right-[18.6%]">35</Typography>
                                                  </>
                                              )}

                                              {age > 59 && (
                                                  <>
                                                      <Typography className="absolute left-[19%]">16</Typography>
                                                      <Typography className="absolute left-[38.5%]">24</Typography>
                                                      <Typography className="absolute right-[37.7%]">33</Typography>
                                                      <Typography className="absolute right-[18.6%]">36</Typography>
                                                  </>
                                              )}
                                          </Box>

                                          <Box className="mt-[3rem]">
                                              {age < 20 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_ALL_20') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_ALL_20')}
                                                  </Typography>
                                              )}

                                              {age >= 20 && age <= 29 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_ALL_20_29') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_ALL_20_29')}
                                                  </Typography>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_ALL_30_39') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_ALL_30_39')}
                                                  </Typography>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_ALL_40_49') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_ALL_40_49')}
                                                  </Typography>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_ALL_50_59') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_ALL_50_59')}
                                                  </Typography>
                                              )}

                                              {age > 59 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_ALL_59') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_ALL_59')}
                                                  </Typography>
                                              )}
                                          </Box>
                                      </>
                                  ) : (
                                      <Box className='text-center'>
                                          <Typography>Classificação de Massa Gorda</Typography>
                                          <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                          <Typography className=" !mt-5">Preencha os campos acima para calcular.</Typography>
                                      </Box>
                                  )}

                                  <Divider className='w-full !my-5' />

                                  {Number(formData.águacorporaltotal) > 0 &&
                                      Number(formData.idadecorporal) > 0 &&
                                      Number(formData.taxametabólicabasal) > 0 &&
                                      Number(formData.sd) > 0 ? (
                                      <>
                                          <Typography>Análise Corporal</Typography>
                                          <Typography className="text-black !mt-5">Resultado em geral</Typography>

                                          <Box className='w-full flex flex-row mt-5 justify-between'>
                                              <Box className='flex flex-col justify-center'>
                                                  <Box className='flex flex-row items-center text-[1.5rem]'>
                                                      <Box className='w-3 h-3 bg-[#2e96ff] rounded-sm'></Box>
                                                      <Box className='text-[.8rem] uppercase font-normal ml-2'>Água Corporal ({String(formData.águacorporaltotal).replace('.', ',')}%)</Box>
                                                  </Box>
                                                  <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                      <Box className='w-3 h-3 bg-[#4CAF50] rounded-sm'></Box>
                                                      <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Idade Corporal</span> ({formData.idadecorporal} anos)</Box>
                                                  </Box>
                                                  <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                      <Box className='w-3 h-3 bg-[#673AB7] rounded-sm'></Box>
                                                      <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Taxa Metabólica Basal</span> ({String(formData.taxametabólicabasal).replace('.', ',')}kcal)</Box>
                                                  </Box>
                                              </Box>
                                          </Box>
                                      </>
                                  ) : (
                                    <Box className='text-center'>
                                      <Typography>Análise Corporal</Typography>
                                      <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                      <Typography className=" !mt-5">Preencha os campos acima para calcular.</Typography>
                                    </Box>
                                  )}
                                </>
                              )}

                              {/* Resultado para Homens*/}
                              {isMan && (
                                  <>
                                      {Number(formData.massamagrakg) > 0 && Number(formData.massagorda) > 0 && Number(formData.sd) > 0 ? (
                                          <>
                                              {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                                  <Typography className="text-black">Referência para homens entre 18 a 61 anos</Typography>
                                              )}

                                              {formData.protocol === 'P954' && (
                                                  <Typography className="text-black text-center">Referência para homens entre 18 a 66 anos</Typography>
                                              )}

                                              {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                                  <Typography className="text-black text-center">Referência para homens entre 17 a 27 anos</Typography>
                                              )}

                                              {formData.protocol === 'F684' && (
                                                  <Typography className="text-black text-center">Referência para homens de todas as idades</Typography>
                                              )}

                                              {formData.protocol === 'DR674' && (
                                                  <Typography className="text-black text-center">Referência para homens entre 18 a 33 anos</Typography>
                                              )}

                                              {formData.protocol === 'L964' && (
                                                  <Typography className="text-black text-center">Referência para homens entre 17 a 65 anos</Typography>
                                              )}

                                              {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                                  <Typography className="text-black text-center">Referência para homens entre 14 a 19 anos</Typography>
                                              )}

                                              {formData.protocol === 'W88PO' && (
                                                  <Typography className="text-black text-center">Referência para homens obesos</Typography>
                                              )}

                                              <Typography className='!mt-5'>Bicompartimental</Typography>

                                              <Box className='w-full flex flex-row justify-between mt-5'>
                                                  <Box className='flex flex-col items-center text-[#4caf50] text-[1.5rem] font-bold mx-5'>
                                                      <Box className='flex flex-row'>
                                                          {String(formData.massamagra).replace('.', ',')}%
                                                          <Box className='text-[.8rem] font-normal mt-3 ml-2'>({String(formData.massamagrakg).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='text-[.8rem] uppercase font-normal '>Massa Magra</Box>
                                                  </Box>
                                                  <Box className='flex flex-col items-center text-[#FF9800] text-[1.5rem] font-bold mx-5'>
                                                      <Box className='flex flex-row'>
                                                          {String(formData.massagorda).replace('.', ',')}%
                                                          <Box className='text-[.8rem] font-normal mt-3 ml-2'>({String(formData.massagordakg).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='text-[.8rem] uppercase font-normal '>Massa Gorda</Box>
                                                  </Box>
                                              </Box>
                                          
                                              <Box className="w-full mt-1 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#4caf50]" style={{ width: `${formData.massamagra}%` }}></Box> {/* Peso normal */}
                                                      <Box className="bg-[#FF9800]" style={{ width: `${formData.massagorda}%` }}></Box> {/* Sobrepeso */}
                                                  </Box>
                                              </Box>

                                              {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 18 ou mais de 61 anos.</Typography>
                                              )}

                                              {formData.protocol === 'P954' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 18 ou mais de 66 anos.</Typography>
                                              )}

                                              {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 17 ou mais de 27 anos.</Typography>
                                              )}

                                              {formData.protocol === 'DR674' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 18 ou mais de 33 anos.</Typography>
                                              )}

                                              {formData.protocol === 'L964' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 17 ou mais de 65 anos.</Typography>
                                              )}

                                              {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 14 ou mais de 19 anos.</Typography>
                                              )}
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Bicompartimental</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className="!mt-5">Preencha os campos acima para calcular.</Typography>
                                          </Box>
                                      )}

                                      <Divider className='w-full !my-5' />

                                      {Number(formData.massagorda) > 0 && Number(formData.sd) > 0 &&
                                          Number(formData.massaresidual) > 0 &&
                                          Number(formData.massaossea) > 0 &&
                                          Number(formData.massamuscular) > 0 ?(
                                          <>
                                              {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                                  <Typography className="text-black">Referência para homens entre 18 a 61 anos</Typography>
                                              )}

                                              {formData.protocol === 'P954' && (
                                                  <Typography className="text-black text-center">Referência para homens entre 18 a 66 anos</Typography>
                                              )}

                                              {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                                  <Typography className="text-black text-center">Referência para homens entre 17 a 27 anos</Typography>
                                              )}

                                              {formData.protocol === 'F684' && (
                                                  <Typography className="text-black text-center">Referência para homens de todas as idades</Typography>
                                              )}

                                              {formData.protocol === 'DR674' && (
                                                  <Typography className="text-black text-center">Referência para homens entre 18 a 33 anos</Typography>
                                              )}

                                              {formData.protocol === 'L964' && (
                                                  <Typography className="text-black text-center">Referência para homens entre 17 a 65 anos</Typography>
                                              )}

                                              {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                                  <Typography className="text-black text-center">Referência para homens entre 14 a 19 anos</Typography>
                                              )}

                                              {formData.protocol === 'W88PO' && (
                                                  <Typography className="text-black text-center">Referência para homens obesos</Typography>
                                              )}

                                              <Typography className='!mt-5'>Tetracompartimental</Typography>
                                              <Box className='w-full flex flex-row mt-5 justify-between'>
                                                  <Box className='w-[210px]'>
                                                  <PieChart
                                                      series={[{
                                                          innerRadius: 20,
                                                          outerRadius: 100,
                                                          paddingAngle: 5,
                                                          cornerRadius: 7,
                                                          startAngle: -45,
                                                          cx: 100,
                                                          arcLabel: (item) => `${item.value}kg`,
                                                          arcLabelMinAngle: 35,
                                                          arcLabelRadius: '70%',
                                                          data: dataPie.data,
                                                      },
                                                      ]}
                                                      slotProps={{
                                                          legend: {
                                                              hidden: true,
                                                          },
                                                      }}
                                                      sx={{
                                                          [`& .${pieArcLabelClasses.root}`]: {
                                                          fontWeight: 'bold',
                                                          fill: 'white',
                                                          fontSize: 15,
                                                          },
                                                      }}
                                                      {...size}
                                                  />
                                                  </Box>
                                                  <Box className='flex flex-col justify-center'>
                                                      <Box className='flex flex-row items-center text-[1.5rem]'>
                                                          <Box className='w-3 h-3 bg-[#FF9800] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Gorda</span> ({String(formData.massagordakg).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#4CAF50] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Residual</span> ({String(formData.massaresidual).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#673AB7] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Óssea</span> ({String(formData.massaossea).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#D32F2F] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Muscular</span> ({String(formData.massamuscular).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                  </Box>
                                              </Box>

                                              {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 18 ou mais de 61 anos.</Typography>
                                              )}

                                              {formData.protocol === 'P954' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 18 ou mais de 66 anos.</Typography>
                                              )}

                                              {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 17 ou mais de 27 anos.</Typography>
                                              )}

                                              {formData.protocol === 'DR674' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 18 ou mais de 33 anos.</Typography>
                                              )}

                                              {formData.protocol === 'L964' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 17 ou mais de 65 anos.</Typography>
                                              )}

                                              {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 14 ou mais de 19 anos.</Typography>
                                              )}
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Tetracompartimental</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos acima para calcular.</Typography>
                                          </Box>
                                      )}
                                      
                                      <Divider className='w-full !my-5' />

                                      {Number(formData.massagorda) > 0 && Number(formData.sd) > 0 ? (
                                          <>
                                              <Typography>Classificação de Massa Gorda</Typography>

                                              {age < 19 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para crianças e adolescentes</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_MAN_20') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age > 18 && age <= 20 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens com menos de 20 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_MAN_20') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_MAN_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_MAN_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_MAN_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_MAN_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age > 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens com mais de 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_MAN_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      {age < 20 && (
                                                          <>
                                                              <Box className="bg-[#FFD700] w-[16.7%]"></Box>
                                                              <Box className="bg-[#FFC107] w-[16.7%]"></Box>
                                                              <Box className="bg-[#4CAF50] w-[16.7%]"></Box>
                                                              <Box className="bg-[#FF9800] w-[16.7%]"></Box>
                                                              <Box className="bg-[#FF5722] w-[16.7%]"></Box>
                                                              <Box className="bg-[#D32F2F] w-[16.7%]"></Box>
                                                          </>
                                                      )}

                                                      {age >= 20 && (
                                                          <>
                                                              <Box className="bg-[#224e23] w-[20%]"></Box>
                                                              <Box className="bg-[#337535] w-[20%]"></Box>
                                                              <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                              <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                              <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                          </>
                                                      )}
                                                  </Box>

                                                  {age < 20 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_MAN_20') }} />
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_MAN_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_MAN_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_MAN_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_MAN_50_59') }} />
                                                  )}

                                                  {age > 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_MAN_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age < 20 && (
                                                      <>
                                                          <Typography className="absolute left-[16%]">5</Typography>
                                                          <Typography className="absolute left-[32%]">11</Typography>
                                                          <Typography className="absolute right-[48%]">21</Typography>
                                                          <Typography className="absolute right-[31.9%]">26</Typography>
                                                          <Typography className="absolute right-[14.6%]">32</Typography>
                                                      </>
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">11</Typography>
                                                          <Typography className="absolute left-[38.5%]">14</Typography>
                                                          <Typography className="absolute right-[37.7%]">21</Typography>
                                                          <Typography className="absolute right-[18.6%]">24</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">12</Typography>
                                                          <Typography className="absolute left-[38.5%]">15</Typography>
                                                          <Typography className="absolute right-[37.7%]">22</Typography>
                                                          <Typography className="absolute right-[18.6%]">25</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">14</Typography>
                                                          <Typography className="absolute left-[38.5%]">17</Typography>
                                                          <Typography className="absolute right-[37.7%]">24</Typography>
                                                          <Typography className="absolute right-[18.6%]">27</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">15</Typography>
                                                          <Typography className="absolute left-[38.5%]">18</Typography>
                                                          <Typography className="absolute right-[37.7%]">25</Typography>
                                                          <Typography className="absolute right-[18.6%]">28</Typography>
                                                      </>
                                                  )}

                                                  {age > 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">16</Typography>
                                                          <Typography className="absolute left-[38.5%]">19</Typography>
                                                          <Typography className="absolute right-[37.7%]">26</Typography>
                                                          <Typography className="absolute right-[18.6%]">29</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                              {age < 20 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_MAN_20') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_MAN_20')}
                                                  </Typography>
                                              )}

                                              {age >= 20 && age <= 29 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_MAN_20_29') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_MAN_20_29')}
                                                  </Typography>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_MAN_30_39') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_MAN_30_39')}
                                                  </Typography>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_MAN_40_49') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_MAN_40_49')}
                                                  </Typography>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_MAN_50_59') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_MAN_50_59')}
                                                  </Typography>
                                              )}

                                              {age > 59 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_MAN_59') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_MAN_59')}
                                                  </Typography>
                                              )}
                                              </Box>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Classificação de Massa Gorda</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos acima para calcular.</Typography>
                                          </Box>
                                      )}

                                      <Divider className='w-full !my-5' />

                                      {Number(formData.águacorporaltotal) > 0 &&
                                          Number(formData.idadecorporal) > 0 &&
                                          Number(formData.taxametabólicabasal) > 0 &&
                                          Number(formData.sd) > 0 ? (
                                          <>
                                              <Typography>Análise Corporal</Typography>
                                              <Typography className="text-black !mt-5">Resultado para homens</Typography>

                                              <Box className='w-full flex flex-row mt-5 justify-between'>
                                                  <Box className='flex flex-col justify-center'>
                                                      <Box className='flex flex-row items-center text-[1.5rem]'>
                                                          <Box className='w-3 h-3 bg-[#2e96ff] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] uppercase font-normal ml-2'>Água Corporal ({String(formData.águacorporaltotal).replace('.', ',')}%)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#4CAF50] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Idade Corporal</span> ({formData.idadecorporal} anos)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#673AB7] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Taxa Metabólica Basal</span> ({String(formData.taxametabólicabasal).replace('.', ',')}kcal)</Box>
                                                      </Box>
                                                  </Box>
                                              </Box>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Análise Corporal</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos acima para calcular.</Typography>
                                          </Box>
                                      )}
                                  </>
                              )}

                              {/* Resultado para Mulheres */}
                              {isWoman && (
                                  <>
                                      {Number(formData.massamagrakg) > 0 && Number(formData.massagorda) > 0 && Number(formData.sd) > 0 ? (
                                          <>
                                              {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                                  <Typography className="text-black">Referência para mulheres entre 18 a 55 anos</Typography>
                                              )}

                                              {formData.protocol === 'P954' && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 18 a 66 anos</Typography>
                                              )}

                                              {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 17 a 27 anos</Typography>
                                              )}

                                              {formData.protocol === 'F684' && (
                                                  <Typography className="text-black text-center">Referência para mulheres de todas as idades</Typography>
                                              )}

                                              {formData.protocol === 'DR674' && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 18 a 33 anos</Typography>
                                              )}

                                              {formData.protocol === 'L964' && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 17 a 65 anos</Typography>
                                              )}

                                              {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 14 a 19 anos</Typography>
                                              )}

                                              {formData.protocol === 'W88PO' && (
                                                  <Typography className="text-black text-center">Referência para mulheres obesas</Typography>
                                              )}

                                              <Typography className='!mt-5'>Bicompartimental</Typography>
                                  
                                              <Box className='w-full flex flex-row justify-between mt-5'>
                                                  <Box className='flex flex-col items-center text-[#4caf50] text-[1.5rem] font-bold mx-5'>
                                                      <Box className='flex flex-row'>
                                                          {String(formData.massamagra).replace('.', ',')}%
                                                          <Box className='text-[.8rem] font-normal mt-3 ml-2'>({String(formData.massamagrakg).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='text-[.8rem] uppercase font-normal '>Massa Magra</Box>
                                                  </Box>
                                                  <Box className='flex flex-col items-center text-[#FF9800] text-[1.5rem] font-bold mx-5'>
                                                      <Box className='flex flex-row'>
                                                          {String(formData.massagorda).replace('.', ',')}%
                                                          <Box className='text-[.8rem] font-normal mt-3 ml-2'>({String(formData.massagordakg).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='text-[.8rem] uppercase font-normal '>Massa Gorda</Box>
                                                  </Box>
                                              </Box>
                                          
                                              <Box className="w-full mt-1 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#4caf50]" style={{ width: `${formData.massamagra}%` }}></Box> {/* Peso normal */}
                                                      <Box className="bg-[#FF9800]" style={{ width: `${formData.massagorda}%` }}></Box> {/* Sobrepeso */}
                                                  </Box>
                                              </Box>
                                              
                                              {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 18 ou mais de 61 anos.</Typography>
                                              )}

                                              {formData.protocol === 'P954' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 18 ou mais de 66 anos.</Typography>
                                              )}

                                              {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 17 ou mais de 27 anos.</Typography>
                                              )}

                                              {formData.protocol === 'DR674' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 18 ou mais de 33 anos.</Typography>
                                              )}

                                              {formData.protocol === 'L964' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 17 ou mais de 65 anos.</Typography>
                                              )}

                                              {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 14 ou mais de 19 anos.</Typography>
                                              )}
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Bicompartimental</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className="!mt-5">Preencha os campos acima para calcular.</Typography>
                                          </Box>
                                      )}
                                  
                                      <Divider className='w-full !my-5' />
                                  
                                      {Number(formData.massagorda) > 0 && Number(formData.sd) > 0 &&
                                          Number(formData.massaresidual) > 0 &&
                                          Number(formData.massaossea) > 0 &&
                                          Number(formData.massamuscular) > 0 ?(
                                          <>
                                              {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                                  <Typography className="text-black">Referência para mulheres entre 18 a 55 anos</Typography>
                                              )}

                                              {formData.protocol === 'P954' && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 18 a 66 anos</Typography>
                                              )}

                                              {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 17 a 27 anos</Typography>
                                              )}

                                              {formData.protocol === 'F684' && (
                                                  <Typography className="text-black text-center">Referência para mulheres todas as idades</Typography>
                                              )}

                                              {formData.protocol === 'DR674' && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 18 a 33 anos</Typography>
                                              )}

                                              {formData.protocol === 'L964' && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 17 a 65 anos</Typography>
                                              )}

                                              {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                                  <Typography className="text-black text-center">Referência para mulheres entre 14 a 19 anos</Typography>
                                              )}

                                              {formData.protocol === 'W88PO' && (
                                                  <Typography className="text-black text-center">Referência para mulheres obesas</Typography>
                                              )}

                                              <Typography className='!mt-5'>Tetracompartimental</Typography>
                                              <Box className='w-full flex flex-row mt-5 justify-between'>
                                                  <Box className='w-[210px]'>
                                                  <PieChart
                                                    series={[{
                                                        innerRadius: 20,
                                                        outerRadius: 100,
                                                        paddingAngle: 5,
                                                        cornerRadius: 7,
                                                        startAngle: -45,
                                                        cx: 100,
                                                        arcLabel: (item) => `${item.value}kg`,
                                                        arcLabelMinAngle: 35,
                                                        arcLabelRadius: '70%',
                                                        data: dataPie.data,
                                                    },
                                                    ]}
                                                    slotProps={{
                                                        legend: {
                                                            hidden: true,
                                                        },
                                                    }}
                                                    sx={{
                                                        [`& .${pieArcLabelClasses.root}`]: {
                                                        fontWeight: 'bold',
                                                        fill: 'white',
                                                        fontSize: 15,
                                                        },
                                                    }}
                                                    {...size}
                                                  />
                                                  </Box>
                                                  <Box className='flex flex-col justify-center'>
                                                      <Box className='flex flex-row items-center text-[1.5rem]'>
                                                          <Box className='w-3 h-3 bg-[#FF9800] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Gorda</span> ({String(formData.massagordakg).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#4CAF50] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Residual</span> ({String(formData.massaresidual).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#673AB7] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Óssea</span> ({String(formData.massaossea).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#D32F2F] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Muscular</span> ({String(formData.massamuscular).replace('.', ',')}kg)</Box>
                                                      </Box>
                                                  </Box>
                                              </Box>
                                  
                                              {(formData.protocol === 'JPW78807' || formData.protocol === 'JPW78803') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 18 ou mais de 55 anos.</Typography>
                                              )}

                                              {formData.protocol === 'P954' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 18 ou mais de 66 anos.</Typography>
                                              )}

                                              {(formData.protocol === 'G853' || formData.protocol === 'G943') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 17 ou mais de 27 anos.</Typography>
                                              )}

                                              {formData.protocol === 'DR674' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 18 ou mais de 33 anos.</Typography>
                                              )}

                                              {formData.protocol === 'L964' && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 17 ou mais de 65 anos.</Typography>
                                              )}

                                              {(formData.protocol === 'T847' || formData.protocol === 'T843') && (
                                                  <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 14 ou mais de 19 anos.</Typography>
                                              )}
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Tetracompartimental</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos acima para calcular.</Typography>
                                          </Box>
                                      )}
                                      
                                      <Divider className='w-full !my-5' />
                                  
                                      {Number(formData.massagorda) > 0 && Number(formData.sd) > 0 ? (
                                          <>
                                              <Typography>Classificação de Massa Gorda</Typography>
                                  
                                              {age < 19 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para crianças e adolescentes</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_WOMAN_20') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}
                                  
                                              {age > 18 && age <= 20 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres com menos de 20 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_WOMAN_20') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}
                                  
                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_WOMAN_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}
                                  
                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_WOMAN_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}
                                  
                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_WOMAN_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}
                                  
                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_WOMAN_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}
                                  
                                              {age > 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres com mais de 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.massagorda),'CMG_WOMAN_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.massagorda).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                                                      </Box>
                                                  </>
                                              )}
                                  
                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      {age < 20 && (
                                                          <>
                                                              <Box className="bg-[#FFD700] w-[16.7%]"></Box>
                                                              <Box className="bg-[#FFC107] w-[16.7%]"></Box>
                                                              <Box className="bg-[#4CAF50] w-[16.7%]"></Box>
                                                              <Box className="bg-[#FF9800] w-[16.7%]"></Box>
                                                              <Box className="bg-[#FF5722] w-[16.7%]"></Box>
                                                              <Box className="bg-[#D32F2F] w-[16.7%]"></Box>
                                                          </>
                                                      )}
                                  
                                                      {age >= 20 && (
                                                          <>
                                                              <Box className="bg-[#224e23] w-[20%]"></Box>
                                                              <Box className="bg-[#337535] w-[20%]"></Box>
                                                              <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                              <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                              <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                          </>
                                                      )}
                                                  </Box>
                                  
                                                  {age < 20 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_WOMAN_20') }} />
                                                  )}
                                  
                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_WOMAN_20_29') }} />
                                                  )}
                                  
                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_WOMAN_30_39') }} />
                                                  )}
                                  
                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_WOMAN_40_49') }} />
                                                  )}
                                  
                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_WOMAN_50_59') }} />
                                                  )}
                                  
                                                  {age > 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.massagorda),'CMG_WOMAN_59') }} />
                                                  )}
                                                  
                                              </Box>
                                  
                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age < 20 && (
                                                      <>
                                                          <Typography className="absolute left-[16%]">12</Typography>
                                                          <Typography className="absolute left-[32%]">16</Typography>
                                                          <Typography className="absolute right-[48%]">26</Typography>
                                                          <Typography className="absolute right-[31.9%]">31</Typography>
                                                          <Typography className="absolute right-[14.6%]">37</Typography>
                                                      </>
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">16</Typography>
                                                          <Typography className="absolute left-[38.5%]">20</Typography>
                                                          <Typography className="absolute right-[37.7%]">29</Typography>
                                                          <Typography className="absolute right-[18.6%]">32</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">17</Typography>
                                                          <Typography className="absolute left-[38.5%]">21</Typography>
                                                          <Typography className="absolute right-[37.7%]">30</Typography>
                                                          <Typography className="absolute right-[18.6%]">33</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">18</Typography>
                                                          <Typography className="absolute left-[38.5%]">22</Typography>
                                                          <Typography className="absolute right-[37.7%]">31</Typography>
                                                          <Typography className="absolute right-[18.6%]">34</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">19</Typography>
                                                          <Typography className="absolute left-[38.5%]">23</Typography>
                                                          <Typography className="absolute right-[37.7%]">32</Typography>
                                                          <Typography className="absolute right-[18.6%]">35</Typography>
                                                      </>
                                                  )}

                                                  {age > 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">20</Typography>
                                                          <Typography className="absolute left-[38.5%]">24</Typography>
                                                          <Typography className="absolute right-[37.7%]">33</Typography>
                                                          <Typography className="absolute right-[18.6%]">36</Typography>
                                                      </>
                                                  )}
                                              </Box>
                                  
                                              <Box className="mt-[3rem]">
                                              {age < 20 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_WOMAN_20') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_WOMAN_20')}
                                                  </Typography>
                                              )}
                                  
                                              {age >= 20 && age <= 29 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_WOMAN_20_29') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_WOMAN_20_29')}
                                                  </Typography>
                                              )}
                                  
                                              {age >= 30 && age <= 39 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_WOMAN_30_39') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_WOMAN_30_39')}
                                                  </Typography>
                                              )}
                                  
                                              {age >= 40 && age <= 49 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_WOMAN_40_49') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_WOMAN_40_49')}
                                                  </Typography>
                                              )}
                                  
                                              {age >= 50 && age <= 59 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_WOMAN_50_59') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_WOMAN_50_59')}
                                                  </Typography>
                                              )}
                                  
                                              {age > 59 && (
                                                  <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.massagorda),'CMG_WOMAN_59') }}>
                                                      {getReviewClassification(Number(formData.massagorda), age, data.gender, 'CMG_WOMAN_59')}
                                                  </Typography>
                                              )}
                                              </Box>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Classificação de Massa Gorda</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos acima para calcular.</Typography>
                                          </Box>
                                      )}

                                      <Divider className='w-full !my-5' />

                                      {Number(formData.águacorporaltotal) > 0 &&
                                          Number(formData.idadecorporal) > 0 &&
                                          Number(formData.taxametabólicabasal) > 0 &&
                                          Number(formData.sd) > 0 ? (
                                          <>
                                              <Typography>Análise Corporal</Typography>
                                              <Typography className="text-black !mt-5">Resultado para mulheres</Typography>

                                              <Box className='w-full flex flex-row mt-5 justify-between'>
                                                  <Box className='flex flex-col justify-center'>
                                                      <Box className='flex flex-row items-center text-[1.5rem]'>
                                                          <Box className='w-3 h-3 bg-[#2e96ff] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] uppercase font-normal ml-2'>Água Corporal ({String(formData.águacorporaltotal).replace('.', ',')}%)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#4CAF50] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Idade Corporal</span> ({formData.idadecorporal} anos)</Box>
                                                      </Box>
                                                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                                                          <Box className='w-3 h-3 bg-[#673AB7] rounded-sm'></Box>
                                                          <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Taxa Metabólica Basal</span> ({String(formData.taxametabólicabasal).replace('.', ',')}kcal)</Box>
                                                      </Box>
                                                  </Box>
                                              </Box>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Análise Corporal</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos acima para calcular.</Typography>
                                          </Box>
                                      )}
                                  </>
                              )}
                            </>
                          );
                        })())}
                      </Box>
                      <Divider className='w-full !my-5' />
                    </>
                  );

                case 7:
                  return (
                    <>
                      <Typography className="flex flex-row items-center !text-[1.5rem]">IMC</Typography>
                      <FormControl fullWidth>
                        <TextField
                          name='weight'
                          label='Peso'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.weight}
                          onChange={handleTextFieldChange}
                          className='!mt-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">kg</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='height'
                          label='Altura'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.height}
                          onChange={handleTextFieldChange}
                          className='!mt-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>

                      <Box className="flex flex-col items-center mt-5">
                        {Number(formData.imc) >= 1 ? (
                          (() => {
                              // Convertendo para data
                              const [day, month, year] = data.birthDate.split('/').map(Number);
                              const birthDate = new Date(year, month - 1, day);
                              const today = new Date();
                              
                              // Cálculo da idade
                              let age = today.getFullYear() - birthDate.getFullYear();
                              const hasBirthdayPassed = (today.getMonth() > birthDate.getMonth()) || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
                              
                              if (!hasBirthdayPassed) {
                                  age--; // Ainda não fez aniversário este ano
                              }

                              // Categorias
                              const isAll = (age >= 20 && age <= 64) && !data.gender || (age >= 20 && age <= 64) && data.gender;
                              const isElderly = age >= 65;
                              const isMan = age <= 19 && data.gender === 'MAN';
                              const isWoman = age <= 19 && data.gender === 'WOMAN';
                              return (
                                  <>
                                      {/* Resultado Geral */}
                                      {isAll && (
                                          <>
                                              <Typography>Seu Índice de Massa Corporal (IMC)</Typography>
                                              <Typography className="text-black !mt-5">Referência para pessoas entre 20 a 64 anos</Typography>
                                              <Box className="flex flex-row mt-5">
                                                  <Typography variant="h4" className="!font-bold" style={{ color: imcColorAll }}>
                                                      {Number(formData.imc).toFixed(1).toString().replace('.', ',')}
                                                  </Typography>
                                                  <Typography className="!ml-1 !mt-[.9rem]" style={{ color: imcColorAll }}>
                                                      kg/m²
                                                  </Typography>
                                              </Box>

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FFD700] w-[10%]"></Box> {/* Muito abaixo do peso */}
                                                      <Box className="bg-[#FFC107] w-[10%]"></Box> {/* Abaixo do peso */}
                                                      <Box className="bg-[#4CAF50] w-[27%]"></Box> {/* Peso normal */}
                                                      <Box className="bg-[#FF9800] w-[15%]"></Box> {/* Sobrepeso */}
                                                      <Box className="bg-[#FF5722] w-[15%]"></Box> {/* Obesidade Grau I */}
                                                      <Box className="bg-[#D32F2F] w-[10%]"></Box> {/* Obesidade Grau II */}
                                                      <Box className="bg-[#B71C1C] flex-1"></Box>  {/* Obesidade Mórbida */}
                                                  </Box>

                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.imc), 'IMC_ALL') }} />
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  <Typography className="absolute left-[7.5%]">17,0</Typography>
                                                  <Typography className="absolute left-[17.5%]">18,5</Typography>
                                                  <Typography className="absolute left-[43.7%]">25,0</Typography>
                                                  <Typography className="absolute left-[58.6%]">30,0</Typography>
                                                  <Typography className="absolute left-[73.6%]">35,0</Typography>
                                                  <Typography className="absolute right-[9.6%]">40,0</Typography>
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  <Typography className={`text-sm text-gray-700 bg-[${imcColorAll}] rounded-lg px-3 py-2 text-white`}>
                                                      {getReviewClassification(Number(formData.imc), age, data.gender, 'IMC_IAC')}
                                                  </Typography>
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>Pessoas com alta massa muscular podem apresentar um IMC elevado, o que pode classificá-los como acima do peso ou obesos, mesmo sem excesso de gordura corporal.</Typography>
                                          </>
                                      )}

                                      {/* Resultado para Idosos */}
                                      {isElderly && (
                                          <>
                                              <Typography>Seu Índice de Massa Corporal (IMC)</Typography>
                                              <Typography className="text-black !mt-5">Referência para pessoas com 65 anos ou mais</Typography>
                                              <Box className="flex flex-row mt-5">
                                                  <Typography variant="h4" className="!font-bold" style={{ color: imcColorElderly }}>
                                                      {Number(formData.imc).toFixed(1).toString().replace('.', ',')}
                                                  </Typography>
                                                  <Typography className="!ml-1 !mt-[.9rem]" style={{ color: imcColorElderly }}>
                                                      kg/m²
                                                  </Typography>
                                              </Box>

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FFC107] w-[30%]"></Box> {/* Abaixo do peso */}
                                                      <Box className="bg-[#4CAF50] w-[34%]"></Box> {/* Peso normal */}
                                                      <Box className="bg-[#FF9800] w-[37.4%]"></Box> {/* Sobrepeso */}
                                                  </Box>
                                                  
                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.imc), 'IMC_ELDERLY') }} />
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  <Typography className="absolute left-[26.5%]">22,0</Typography>
                                                  <Typography className="absolute left-[60%]">27,0</Typography>
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  <Typography className={`text-sm text-gray-700 bg-[${imcColorElderly}] rounded-lg px-3 py-2 text-white`}>
                                                      {getReviewClassification(Number(formData.imc), age, data.gender, 'IMC_IAC')}
                                                  </Typography>
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>Pessoas com alta massa muscular podem apresentar um IMC elevado, o que pode classificá-los como acima do peso ou obesos, mesmo sem excesso de gordura corporal.</Typography>
                                          </>
                                      )}

                                      {/* Resultado para Menino*/}
                                      {isMan && (
                                          <>
                                              <Typography>Seu Índice de Massa Corporal (IMC)</Typography>
                                              <Typography className="text-black !mt-5">Referência para homens com menos de 19 anos</Typography>
                                              <Box className="flex flex-row mt-5">
                                                  <Typography variant="h4" className="!font-bold" style={{ color: imcColorMan }}>
                                                      {Number(formData.imc).toFixed(1).toString().replace('.', ',')}
                                                  </Typography>
                                                  <Typography className="!ml-1 !mt-[.9rem]" style={{ color: imcColorMan }}>
                                                      kg/m²
                                                  </Typography>
                                              </Box>

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FFC107] w-[33.4%]"></Box> {/* Abaixo do peso */}
                                                      <Box className="bg-[#4CAF50] w-[33.4%]"></Box> {/* Peso normal */}
                                                      <Box className="bg-[#FF9800] w-[33.4%]"></Box> {/* Sobrepeso */}
                                                  </Box>
                                                  
                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.imc), 'IMC_MAN') }} />
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  <Typography className="absolute left-[30%]">14,42</Typography>
                                                  <Typography className="absolute left-[62%]">30,66</Typography>
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  <Typography className={`text-sm text-gray-700 bg-[${imcColorMan}] rounded-lg px-3 py-2 text-white`}>
                                                      {getReviewClassification(Number(formData.imc), age, data.gender, 'IMC_IAC')}
                                                  </Typography>
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>Pessoas com alta massa muscular podem apresentar um IMC elevado, o que pode classificá-los como acima do peso ou obesos, mesmo sem excesso de gordura corporal.</Typography>
                                          </>
                                      )}

                                      {/* Resultado para Meninas */}
                                      {isWoman && (
                                          <>
                                              <Typography>Seu Índice de Massa Corporal (IMC)</Typography>
                                              <Typography className="text-black !mt-5">Referência para mulheres com menos de 19 anos</Typography>
                                              <Box className="flex flex-row mt-5">
                                                  <Typography variant="h4" className="!font-bold" style={{ color: imcColorWoman }}>
                                                      {Number(formData.imc).toFixed(1).toString().replace('.', ',')}
                                                  </Typography>
                                                  <Typography className="!ml-1 !mt-[.9rem]" style={{ color: imcColorWoman }}>
                                                      kg/m²
                                                  </Typography>
                                              </Box>

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                  <Box className="bg-[#FFC107] w-[33.4%]"></Box> {/* Abaixo do peso */}
                                                      <Box className="bg-[#4CAF50] w-[33.4%]"></Box> {/* Peso normal */}
                                                      <Box className="bg-[#FF9800] w-[33.4%]"></Box> {/* Sobrepeso */}
                                                  </Box>
                                                  
                                                  <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.imc), 'IMC_WOMAN') }} />
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  <Typography className="absolute left-[30%]">14,23</Typography>
                                                  <Typography className="absolute left-[62%]">30,72</Typography>
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  <Typography className={`text-sm text-gray-700 bg-[${imcColorWoman}] rounded-lg px-3 py-2 text-white`}>
                                                      {getReviewClassification(Number(formData.imc), age, data.gender, 'IMC_IAC')}
                                                  </Typography>
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>Pessoas com alta massa muscular podem apresentar um IMC elevado, o que pode classificá-los como acima do peso ou obesos, mesmo sem excesso de gordura corporal.</Typography>
                                          </>
                                      )}
                                  </>
                              );
                          })()
                          ) : (
                            <Box className='text-center'>
                              <Typography>Seu Índice de Massa Corporal (IMC)</Typography>
                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                            </Box>
                        )}
                      </Box>

                      <Divider className='w-full !my-5' />

                      <Typography className="flex flex-row items-center !text-[1.5rem]">IAC</Typography>
                      <FormControl fullWidth>
                        <TextField
                          name='hip'
                          label='Quadril'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.hip}
                          onChange={handleTextFieldChange}
                          className='!mt-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='height'
                          label='Altura'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.height}
                          onChange={handleTextFieldChange}
                          className='!mt-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <Box className="flex flex-col items-center mt-5">
                        {Number(formData.iac) >= 1 ? (
                            (() => {
                                // Categorias
                                const isAll = !data.gender || data.gender === 'OTHERS';
                                const isMan = data.gender === 'MAN';
                                const isWoman = data.gender === 'WOMAN';
                                return (
                                    <>
                                        {/* Resultado Geral */}
                                        {isAll && (
                                            <>
                                                <Typography>Seu Índice de Adiposidade Corporal (IAC)</Typography>
                                                <Typography className="text-black !mt-5">Referência em geral</Typography>
                                                <Box className="flex flex-row mt-5">
                                                    <Typography variant="h4" className="!font-bold" style={{ color: imcColorIacAll }}>
                                                        {formData.iac.toString().replace('.', ',')}
                                                    </Typography>
                                                    <Typography className="!ml-1 !mt-[.9rem]" style={{ color: imcColorIacAll }}>%</Typography>
                                                </Box>

                                                <Box className="w-full mt-5 relative">
                                                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                        <Box className="bg-[#FFC107] w-[25%]"></Box> {/* Abaixo do peso */}
                                                        <Box className="bg-[#4CAF50] w-[25%]"></Box> {/* Peso normal */}
                                                        <Box className="bg-[#FF9800] w-[25%]"></Box> {/* Sobrepeso */}
                                                        <Box className="bg-[#FF5722] w-[25%]"></Box> {/* Obesidade Grau I */}
                                                    </Box>
                                                    
                                                    <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.iac), 'IAC_ALL') }} />
                                                </Box>

                                                <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                    <Typography className="absolute left-[24%]">8</Typography>
                                                    <Typography className="absolute left-[48%]">32</Typography>
                                                    <Typography className="absolute right-[23%]">38</Typography>
                                                </Box>

                                                <Box className="mt-[3rem]">
                                                    <Typography className={`text-sm text-gray-700 bg-[${imcColorIacAll}] rounded-lg px-3 py-2 text-white`}>
                                                        {getReviewClassification(Number(formData.iac), 2, data.gender, 'IMC_IAC')}
                                                    </Typography>
                                                </Box>

                                                <Typography className='!text-sm text-center !mt-5'>Pessoas com quadris largos podem ter um IAC elevado, mas isso nem sempre significa excesso de peso ou obesidade.</Typography>
                                            </>
                                        )}

                                        {/* Resultado para Menino*/}
                                        {isMan && (
                                            <>
                                                <Typography>Seu Índice de Adiposidade Corporal (IAC)</Typography>
                                                <Typography className="text-black !mt-5">Referência para homens</Typography>
                                                <Box className="flex flex-row mt-5">
                                                    <Typography variant="h4" className="!font-bold" style={{ color: imcColorIacMan }}>
                                                        {Number(formData.iac).toString().replace('.', ',')}
                                                    </Typography>
                                                    <Typography className="!ml-1 !mt-[.9rem]" style={{ color: imcColorIacMan }}>%</Typography>
                                                </Box>

                                                <Box className="w-full mt-5 relative">
                                                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                        <Box className="bg-[#FFC107] w-[25%]"></Box> {/* Abaixo do peso */}
                                                        <Box className="bg-[#4CAF50] w-[25%]"></Box> {/* Peso normal */}
                                                        <Box className="bg-[#FF9800] w-[25%]"></Box> {/* Sobrepeso */}
                                                        <Box className="bg-[#FF5722] w-[25%]"></Box> {/* Obesidade Grau I */}
                                                    </Box>
                                                    
                                                    <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.iac), 'IAC_MAN') }} />
                                                </Box>

                                                <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                    <Typography className="absolute left-[24%]">8</Typography>
                                                    <Typography className="absolute left-[48%]">20</Typography>
                                                    <Typography className="absolute right-[23%]">25</Typography>
                                                </Box>

                                                <Box className="mt-[3rem]">
                                                    <Typography className={`text-sm text-gray-700 bg-[${imcColorIacMan}] rounded-lg px-3 py-2 text-white`}>
                                                        {getReviewClassification(Number(formData.iac), 0, data.gender, 'IMC_IAC')}
                                                    </Typography>
                                                </Box>

                                                <Typography className='!text-sm text-center !mt-5'>Pessoas com quadris largos podem ter um IAC elevado, mas isso nem sempre significa excesso de peso ou obesidade.</Typography>
                                            </>
                                        )}

                                        {/* Resultado para Meninas */}
                                        {isWoman && (
                                            <>
                                                <Typography>Seu Índice de Adiposidade Corporal (IAC)</Typography>
                                                <Typography className="text-black !mt-5">Referência para mulheres</Typography>
                                                <Box className="flex flex-row mt-5">
                                                    <Typography variant="h4" className="!font-bold" style={{ color: imcColorIacWoman }}>
                                                        {Number(formData.iac).toString().replace('.', ',')}
                                                    </Typography>
                                                    <Typography className="!ml-1 !mt-[.9rem]" style={{ color: imcColorIacWoman }}>%</Typography>
                                                </Box>

                                                <Box className="w-full mt-5 relative">
                                                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                        <Box className="bg-[#FFC107] w-[25%]"></Box> {/* Abaixo do peso */}
                                                        <Box className="bg-[#4CAF50] w-[25%]"></Box> {/* Peso normal */}
                                                        <Box className="bg-[#FF9800] w-[25%]"></Box> {/* Sobrepeso */}
                                                        <Box className="bg-[#FF5722] w-[25%]"></Box> {/* Obesidade Grau I */}
                                                    </Box>
                                                    
                                                    <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.iac), 'IAC_WOMAN') }} />
                                                </Box>

                                                <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                    <Typography className="absolute left-[23.6%]">21</Typography>
                                                    <Typography className="absolute left-[48%]">33</Typography>
                                                    <Typography className="absolute right-[23%]">38</Typography>
                                                </Box>

                                                <Box className="mt-[3rem]">
                                                    <Typography className={`text-sm text-gray-700 bg-[${imcColorIacWoman}] rounded-lg px-3 py-2 text-white`}>
                                                        {getReviewClassification(Number(formData.iac), 1, data.gender, 'IMC_IAC')}
                                                    </Typography>
                                                </Box>

                                                <Typography className='!text-sm text-center !mt-5'>Pessoas com quadris largos podem ter um IAC elevado, mas isso nem sempre significa excesso de peso ou obesidade.</Typography>
                                            </>
                                        )}
                                    </>
                                );
                            })()
                        ) : (
                            <Box className='text-center'>
                                <Typography>Seu Índice de Adiposidade Corporal (IAC)</Typography>
                                <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                            </Box>
                        )}
                      </Box>
                      <Divider className='w-full !my-5' />
                    </>
                  );

                case 8:
                  return (
                    <>
                      <FormControl fullWidth>
                        <TextField
                          name='waist'
                          label='Cintura'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.waist}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          name='hip'
                          label='Quadril'
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                          value={formData.hip}
                          onChange={handleTextFieldChange}
                          className='!mb-5'
                          inputProps={{ maxLength: 5 }}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">cm</InputAdornment>
                          }}
                        />
                      </FormControl>
                      <Box className="flex flex-col items-center">
                        {Number(formData.rcq) > 0 ? (
                            (() => {
                                // Convertendo para data
                                const [day, month, year] = data.birthDate.split('/').map(Number);
                                const birthDate = new Date(year, month - 1, day);
                                const today = new Date();
                                
                                // Cálculo da idade
                                let age = today.getFullYear() - birthDate.getFullYear();
                                const hasBirthdayPassed = (today.getMonth() > birthDate.getMonth()) || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
                                
                                if (!hasBirthdayPassed) {
                                    age--; // Ainda não fez aniversário este ano
                                }

                                // Categorias
                                const isAll = !data.gender ||  data.gender === 'OTHERS';

                                const isMan20and29 = (age >= 20 && age <= 29) && data.gender === 'MAN';

                                const isMan30and39 = (age >= 30 && age <= 39) && data.gender === 'MAN';

                                const isMan40and49 = (age >= 40 && age <= 49) && data.gender === 'MAN';

                                const isMan50and59 = (age >= 50 && age <= 59) && data.gender === 'MAN';

                                const isMan60and69 = (age >= 60 && age <= 69) && data.gender === 'MAN';

                                const isWoman20and29 = (age >= 20 && age <= 29) && data.gender === 'WOMAN';

                                const isWoman30and39 = (age >= 30 && age <= 39) && data.gender === 'WOMAN';

                                const isWoman40and49 = (age >= 40 && age <= 49) && data.gender === 'WOMAN';

                                const isWoman50and59 = (age >= 50 && age <= 59) && data.gender === 'WOMAN';

                                const isWoman60and69 = (age >= 60 && age <= 69) && data.gender === 'WOMAN';
                                return (
                                    <>
                                        <Typography>Sua Relação Cintura x Quadril (RCQ)</Typography>

                                        {isMan20and29 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para homens entre 20 a 29 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorMan20and29 }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isMan30and39 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para homens entre 30 a 39 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorMan30and39 }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isMan40and49 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para hoomens entre 40 a 49 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorMan40and49 }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isMan50and59 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para homens entre 50 a 59 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorMan50and59 }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isMan60and69 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para homens entre 60 a 69 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorMan60and69 }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman20and29 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para mulheres entre 20 a 29 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: getImcColor(Number(formData.rcq),'RCQ_WOMAN_20_29') }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman30and39 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para mulheres entre 30 a 39 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorWoman30and39 }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman40and49 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para mulheres entre 40 a 49 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorWoman40and49 }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman50and59 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para pessoas entre 50 a 59 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorWoman50and59 }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman60and69 && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para pessoas entre 60 a 69 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorWoman60and69 }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isAll && (
                                        <>
                                            <Typography className="text-black !mt-5">Referência para pessoas entre 20 a 69 anos</Typography>
                                            <Box className="flex flex-row mt-5">
                                                <Typography variant="h4" className="!font-bold" style={{ color: rcqColorAll }}>
                                                    {Number(formData.rcq).toFixed(2).toString().replace('.', ',')}
                                                </Typography>
                                            </Box>
                                        </>
                                        )}

                                        <Box className="w-full mt-5 relative">
                                            <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                <Box className="bg-[#4CAF50] w-[25%]"></Box>
                                                <Box className="bg-[#FF9800] w-[25%]"></Box>
                                                <Box className="bg-[#FF5722] w-[25%]"></Box>
                                                <Box className="bg-[#D32F2F] w-[25%]"></Box>
                                            </Box>

                                            {isMan20and29 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_MAN_20_29') }} />
                                            )}

                                            {isMan30and39 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_MAN_30_39') }} />
                                            )}

                                            {isMan40and49 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_MAN_40_49') }} />
                                            )}

                                            {isMan50and59 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_MAN_50_59') }} />
                                            )}

                                            {isMan60and69 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_MAN_60_69') }} />
                                            )}

                                            {isWoman20and29 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_WOMAN_20_29') }} />
                                            )}

                                            {isWoman30and39 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_WOMAN_30_39') }} />
                                            )}

                                            {isWoman40and49 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_WOMAN_40_49') }} />
                                            )}

                                            {isWoman50and59 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_WOMAN_50_59') }} />
                                            )}

                                            {isWoman60and69 && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_WOMAN_60_69') }} />
                                            )}

                                            {isAll && (
                                            <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.rcq), 'RCQ_ALL') }} />
                                            )}
                                        </Box>

                                        {isMan20and29 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,83</Typography>
                                            <Typography className="absolute left-[47.5%]">0,89</Typography>
                                            <Typography className="absolute right-[21.6%]">0,94</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorMan20and29}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_MAN_20_29')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isMan30and39 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,84</Typography>
                                            <Typography className="absolute left-[47.5%]">0,92</Typography>
                                            <Typography className="absolute right-[21.6%]">0,96</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorMan30and39}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_MAN_30_39')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isMan40and49 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,88</Typography>
                                            <Typography className="absolute left-[47.5%]">0,96</Typography>
                                            <Typography className="absolute right-[21.6%]">1,00</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorMan40and49}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_MAN_40_49')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isMan50and59 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,90</Typography>
                                            <Typography className="absolute left-[47.5%]">0,97</Typography>
                                            <Typography className="absolute right-[21.6%]">1,02</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorMan50and59}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_MAN_50_59')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isMan60and69 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,91</Typography>
                                            <Typography className="absolute left-[47.5%]">0,99</Typography>
                                            <Typography className="absolute right-[21.6%]">1,03</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorMan60and69}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_MAN_60_69')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman20and29 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,71</Typography>
                                            <Typography className="absolute left-[47.5%]">0,78</Typography>
                                            <Typography className="absolute right-[21.6%]">0,82</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className='text-sm rounded-lg px-3 py-2 text-white' style={{ background: getImcColor(Number(formData.rcq),'RCQ_WOMAN_20_29') }}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_WOMAN_20_29')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman30and39 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,72</Typography>
                                            <Typography className="absolute left-[47.5%]">0,79</Typography>
                                            <Typography className="absolute right-[21.6%]">0,84</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorWoman30and39}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_WOMAN_30_39')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman40and49 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,73</Typography>
                                            <Typography className="absolute left-[47.5%]">0,80</Typography>
                                            <Typography className="absolute right-[21.6%]">0,87</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorWoman40and49}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_WOMAN_40_49')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman50and59 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,74</Typography>
                                            <Typography className="absolute left-[47.5%]">0,82</Typography>
                                            <Typography className="absolute right-[21.6%]">0,88</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorWoman50and59}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_WOMAN_50_59')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isWoman60and69 && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                            <Typography className="absolute left-[22.5%]">0,76</Typography>
                                            <Typography className="absolute left-[47.5%]">0,84</Typography>
                                            <Typography className="absolute right-[21.6%]">0,90</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorWoman60and69}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_WOMAN_60_69')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        {isAll && (
                                        <>
                                            <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                <Typography className="absolute left-[22.5%]">0,71</Typography>
                                                <Typography className="absolute left-[47.5%]">0,96</Typography>
                                                <Typography className="absolute right-[21.6%]">1,03</Typography>
                                            </Box>

                                            <Box className="mt-[3rem]">
                                            <Typography className={`text-sm text-gray-700 bg-[${rcqColorAll}] rounded-lg px-3 py-2 text-white`}>
                                                {getReviewClassification(Number(formData.rcq), age, data.gender, 'RCQ_ALL')}
                                            </Typography>
                                            </Box>
                                        </>
                                        )}

                                        <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 20 ou mais de 69 anos.</Typography>
                                    </>
                                );
                            })()
                        ) : (
                            <Box className='text-center'>
                                <Typography>Sua Relação de Cintura x Quadril (RCQ)</Typography>
                                <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                            </Box>
                        )}
                      </Box>
                      <Divider className='w-full !my-5' />
                    </>
                  );

                case 9:
                  return (
                    <>
                      <FormControl className='w-full !mb-5'>
                        <InputLabel id="protocolCardio">Protocolo</InputLabel>
                        <MuiSelect
                            labelId="protocolCardio"
                            id="protocolCardio"
                            name="protocolCardio"
                            value={String(formData.protocolCardio)}
                            onChange={handleSelectMuiChange}
                            label="Protocolo"
                            className="w-full"
                        >
                          {protocolsOptionsCardio.map((protocol) => (
                            <MenuItem 
                              key={protocol.value} 
                              value={protocol.value}
                              disabled={protocol.isDisabled || false}
                            >
                              {protocol.label}
                            </MenuItem>
                          ))}
                        </MuiSelect>
                      </FormControl>
                      {filteredQuestionsCardio?.map((question) => (
                        <Box key={question.questionCode} className="w-full flex flex-col justify-between">
                          <FormControl fullWidth>
                            <TextField
                              name={question.question.replace(/[\s?]/g, '').toLowerCase()}
                              label={question.question}
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                              value={formData[question.question.replace(/[\s?]/g, '').toLowerCase()]}
                              onChange={handleTextFieldChange}
                              className="!mb-5"
                              inputProps={{ maxLength: 5 }}
                              InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                {question.question === 'Distância Percorrida'
                                  ? 'm'
                                  : question.question === 'Tempo Gasto'
                                  ? 'mm:ss'
                                  : question.question === 'Frequência Cardíaca'
                                  ? 'bpm' : 'kg'}
                                </InputAdornment>
                              ),
                              }}
                            />
                          </FormControl>
                        </Box>
                      ))}
                      {formData.protocolCardio === 'M1609' && (
                        <Box className="w-full flex flex-col justify-between">
                          <FormControl fullWidth>
                            <TextField
                              name='weight'
                              label='Peso'
                              variant='outlined'
                              InputLabelProps={{ shrink: true }}
                              value={formData.weight}
                              onChange={handleTextFieldChange}
                              className='!mb-5'
                              inputProps={{ maxLength: 5 }}
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">kg</InputAdornment>
                              }}
                            />
                          </FormControl>
                        </Box>
                      )}
                      <Box className="flex flex-col items-center">
                        {Number(formData.vo) > 0 ? (
                            (() => {
                                // Convertendo para data
                                const [day, month, year] = data.birthDate.split('/').map(Number);
                                const birthDate = new Date(year, month - 1, day);
                                const today = new Date();
                                
                                // Cálculo da idade
                                let age = today.getFullYear() - birthDate.getFullYear();
                                const hasBirthdayPassed = (today.getMonth() > birthDate.getMonth()) || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
                                
                                if (!hasBirthdayPassed) {
                                    age--; // Ainda não fez aniversário este ano
                                }

                                // Categorias
                                const isAll = !data.gender ||  data.gender === 'OTHERS';

                                const isMan = data.gender === 'MAN';

                                const isWoman = data.gender === 'WOMAN';
                                return (
                                    <>
                                      {/* Resultado Geral */}
                                      {isAll && (
                                          <>
                                              {Number(formData.vo) > 0 ? (
                                                  <>
                                                      <Typography>Seu Consumo Máximo de Oxigênio</Typography>

                                                      {age >= 20 && age <= 29 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para pessoas entre 20 a 29 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_ALL_20_29') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 30 && age <= 39 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para pessoas entre 30 a 39 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_ALL_30_39') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 40 && age <= 49 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para pessoas entre 40 a 49 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_ALL_40_49') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 50 && age <= 59 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para pessoas entre 50 a 59 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_ALL_50_59') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 60 && age <= 69 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para pessoas entre 60 a 69 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_ALL_60_69') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      <Box className="w-full mt-5 relative">
                                                          <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                              <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                              <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                              <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                              <Box className="bg-[#337535] w-[20%]"></Box>
                                                              <Box className="bg-[#224e23] w-[20%]"></Box>
                                                          </Box>

                                                          {age >= 20 && age <= 29 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_ALL_20_29') }} />
                                                          )}

                                                          {age >= 30 && age <= 39 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_ALL_30_39') }} />
                                                          )}

                                                          {age >= 40 && age <= 49 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_ALL_40_49') }} />
                                                          )}

                                                          {age >= 50 && age <= 59 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_ALL_50_59') }} />
                                                          )}

                                                          {age >= 60 && age <= 69 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_ALL_60_59') }} />
                                                          )}
                                                          
                                                      </Box>

                                                      <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                      {age >= 20 && age <= 29 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">24</Typography>
                                                                  <Typography className="absolute left-[38.5%]">34</Typography>
                                                                  <Typography className="absolute right-[37.7%]">43</Typography>
                                                                  <Typography className="absolute right-[18.6%]">53</Typography>
                                                              </>
                                                          )}

                                                          {age >= 30 && age <= 39 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">20</Typography>
                                                                  <Typography className="absolute left-[38.5%]">31</Typography>
                                                                  <Typography className="absolute right-[37.7%]">39</Typography>
                                                                  <Typography className="absolute right-[18.6%]">49</Typography>
                                                              </>
                                                          )}

                                                          {age >= 40 && age <= 49 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">17</Typography>
                                                                  <Typography className="absolute left-[38.5%]">27</Typography>
                                                                  <Typography className="absolute right-[37.7%]">36</Typography>
                                                                  <Typography className="absolute right-[18.6%]">45</Typography>
                                                              </>
                                                          )}

                                                          {age >= 50 && age <= 59 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">15</Typography>
                                                                  <Typography className="absolute left-[38.5%]">25</Typography>
                                                                  <Typography className="absolute right-[37.7%]">34</Typography>
                                                                  <Typography className="absolute right-[18.6%]">43</Typography>
                                                              </>
                                                          )}

                                                          {age >= 60 && age <= 69 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">13</Typography>
                                                                  <Typography className="absolute left-[38.5%]">23</Typography>
                                                                  <Typography className="absolute right-[37.7%]">31</Typography>
                                                                  <Typography className="absolute right-[18.6%]">41</Typography>
                                                              </>
                                                          )}
                                                      </Box>

                                                      <Box className="mt-[3rem]">
                                                          {age >= 20 && age <= 29 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_ALL_20_29') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_ALL_20_29')}
                                                              </Typography>
                                                          )}

                                                          {age >= 30 && age <= 39 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_ALL_30_39') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_ALL_30_39')}
                                                              </Typography>
                                                          )}

                                                          {age >= 40 && age <= 49 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_ALL_40_49') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_ALL_40_49')}
                                                              </Typography>
                                                          )}

                                                          {age >= 50 && age <= 59 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_ALL_50_59') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_ALL_50_59')}
                                                              </Typography>
                                                          )}

                                                          {age >= 60 && age <= 69 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_ALL_60_69') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_ALL_60_69')}
                                                              </Typography>
                                                          )}
                                                      </Box>

                                                      <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 20 ou mais de 69 anos.</Typography>
                                                  </>
                                              ) : (
                                                  <Box className='text-center'>
                                                      <Typography>Seu Consumo Máximo de Oxigênio</Typography>
                                                      <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                                      <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                                  </Box>
                                              )}
                                          </>
                                      )}

                                      {/* Resultado para Homens*/}
                                      {isMan && (
                                          <>
                                              {Number(formData.vo) > 0 ? (
                                                  <>
                                                      <Typography>Seu Consumo Máximo de Oxigênio</Typography>

                                                      {age >= 20 && age <= 29 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para homens entre 20 a 29 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_MAN_20_29') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 30 && age <= 39 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para homens entre 30 a 39 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_MAN_30_39') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 40 && age <= 49 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para homens entre 40 a 49 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_MAN_40_49') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 50 && age <= 59 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para homens entre 50 a 59 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_MAN_50_59') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 60 && age <= 69 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para homens entre 60 a 69 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_MAN_60_69') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      <Box className="w-full mt-5 relative">
                                                          <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                              <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                              <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                              <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                              <Box className="bg-[#337535] w-[20%]"></Box>
                                                              <Box className="bg-[#224e23] w-[20%]"></Box>
                                                          </Box>

                                                          {age >= 20 && age <= 29 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_MAN_20_29') }} />
                                                          )}

                                                          {age >= 30 && age <= 39 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_MAN_30_39') }} />
                                                          )}

                                                          {age >= 40 && age <= 49 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_MAN_40_49') }} />
                                                          )}

                                                          {age >= 50 && age <= 59 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_MAN_50_59') }} />
                                                          )}

                                                          {age >= 60 && age <= 69 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_MAN_60_59') }} />
                                                          )}
                                                          
                                                      </Box>

                                                      <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                      {age >= 20 && age <= 29 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">25</Typography>
                                                                  <Typography className="absolute left-[38.5%]">34</Typography>
                                                                  <Typography className="absolute right-[37.7%]">43</Typography>
                                                                  <Typography className="absolute right-[18.6%]">53</Typography>
                                                              </>
                                                          )}

                                                          {age >= 30 && age <= 39 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">23</Typography>
                                                                  <Typography className="absolute left-[38.5%]">31</Typography>
                                                                  <Typography className="absolute right-[37.7%]">39</Typography>
                                                                  <Typography className="absolute right-[18.6%]">49</Typography>
                                                              </>
                                                          )}

                                                          {age >= 40 && age <= 49 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">20</Typography>
                                                                  <Typography className="absolute left-[38.5%]">27</Typography>
                                                                  <Typography className="absolute right-[37.7%]">36</Typography>
                                                                  <Typography className="absolute right-[18.6%]">45</Typography>
                                                              </>
                                                          )}

                                                          {age >= 50 && age <= 59 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">18</Typography>
                                                                  <Typography className="absolute left-[38.5%]">25</Typography>
                                                                  <Typography className="absolute right-[37.7%]">34</Typography>
                                                                  <Typography className="absolute right-[18.6%]">43</Typography>
                                                              </>
                                                          )}

                                                          {age >= 60 && age <= 69 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">16</Typography>
                                                                  <Typography className="absolute left-[38.5%]">23</Typography>
                                                                  <Typography className="absolute right-[37.7%]">31</Typography>
                                                                  <Typography className="absolute right-[18.6%]">41</Typography>
                                                              </>
                                                          )}
                                                      </Box>

                                                      <Box className="mt-[3rem]">
                                                          {age >= 20 && age <= 29 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_MAN_20_29') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_MAN_20_29')}
                                                              </Typography>
                                                          )}

                                                          {age >= 30 && age <= 39 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_MAN_30_39') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_MAN_30_39')}
                                                              </Typography>
                                                          )}

                                                          {age >= 40 && age <= 49 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_MAN_40_49') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_MAN_40_49')}
                                                              </Typography>
                                                          )}

                                                          {age >= 50 && age <= 59 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_MAN_50_59') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_MAN_50_59')}
                                                              </Typography>
                                                          )}

                                                          {age >= 60 && age <= 69 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_MAN_60_69') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_MAN_60_69')}
                                                              </Typography>
                                                          )}
                                                      </Box>

                                                      <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 20 ou mais de 69 anos.</Typography>
                                                  </>
                                              ) : (
                                                  <Box className='text-center'>
                                                      <Typography>Seu Consumo Máximo de Oxigênio</Typography>
                                                      <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                                      <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                                  </Box>
                                              )}
                                          </>
                                      )}

                                      {/* Resultado para Mulheres */}
                                      {isWoman && (
                                          <>
                                              {Number(formData.vo) > 0 ? (
                                                  <>
                                                      <Typography>Seu Consumo Máximo de Oxigênio</Typography>

                                                      {age >= 20 && age <= 29 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para mulheres entre 20 a 29 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_WOMAN_20_29') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 30 && age <= 39 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para mulheres entre 30 a 39 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_WOMAN_30_39') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 40 && age <= 49 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para mulheres entre 40 a 49 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_WOMAN_40_49') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 50 && age <= 59 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para mulheres entre 50 a 59 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_WOMAN_50_59') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      {age >= 60 && age <= 69 && (
                                                          <>
                                                              <Typography className="text-black !mt-5">Referência para mulheres entre 60 a 69 anos</Typography>
                                                              <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.vo),'CR_WOMAN_60_69') }}>
                                                                  <Typography variant="h4" className="!font-bold">
                                                                      {String(formData.vo).replace('.', ',')}
                                                                  </Typography>
                                                                  <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                                                              </Box>
                                                          </>
                                                      )}

                                                      <Box className="w-full mt-5 relative">
                                                          <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                              <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                              <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                              <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                              <Box className="bg-[#337535] w-[20%]"></Box>
                                                              <Box className="bg-[#224e23] w-[20%]"></Box>
                                                          </Box>

                                                          {age >= 20 && age <= 29 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_WOMAN_20_29') }} />
                                                          )}

                                                          {age >= 30 && age <= 39 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_WOMAN_30_39') }} />
                                                          )}

                                                          {age >= 40 && age <= 49 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_WOMAN_40_49') }} />
                                                          )}

                                                          {age >= 50 && age <= 59 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_WOMAN_50_59') }} />
                                                          )}

                                                          {age >= 60 && age <= 69 && (
                                                              <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.vo),'CR_WOMAN_60_59') }} />
                                                          )}
                                                          
                                                      </Box>

                                                      <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                      {age >= 20 && age <= 29 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">24</Typography>
                                                                  <Typography className="absolute left-[38.5%]">31</Typography>
                                                                  <Typography className="absolute right-[37.7%]">38</Typography>
                                                                  <Typography className="absolute right-[18.6%]">49</Typography>
                                                              </>
                                                          )}

                                                          {age >= 30 && age <= 39 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">20</Typography>
                                                                  <Typography className="absolute left-[38.5%]">28</Typography>
                                                                  <Typography className="absolute right-[37.7%]">34</Typography>
                                                                  <Typography className="absolute right-[18.6%]">45</Typography>
                                                              </>
                                                          )}

                                                          {age >= 40 && age <= 49 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">17</Typography>
                                                                  <Typography className="absolute left-[38.5%]">24</Typography>
                                                                  <Typography className="absolute right-[37.7%]">31</Typography>
                                                                  <Typography className="absolute right-[18.6%]">42</Typography>
                                                              </>
                                                          )}

                                                          {age >= 50 && age <= 59 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">15</Typography>
                                                                  <Typography className="absolute left-[38.5%]">21</Typography>
                                                                  <Typography className="absolute right-[37.7%]">28</Typography>
                                                                  <Typography className="absolute right-[18.6%]">38</Typography>
                                                              </>
                                                          )}

                                                          {age >= 60 && age <= 69 && (
                                                              <>
                                                                  <Typography className="absolute left-[18%]">13</Typography>
                                                                  <Typography className="absolute left-[38.5%]">18</Typography>
                                                                  <Typography className="absolute right-[37.7%]">24</Typography>
                                                                  <Typography className="absolute right-[18.6%]">35</Typography>
                                                              </>
                                                          )}
                                                      </Box>

                                                      <Box className="mt-[3rem]">
                                                          {age >= 20 && age <= 29 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_WOMAN_20_29') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_WOMAN_20_29')}
                                                              </Typography>
                                                          )}

                                                          {age >= 30 && age <= 39 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_WOMAN_30_39') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_WOMAN_30_39')}
                                                              </Typography>
                                                          )}

                                                          {age >= 40 && age <= 49 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_WOMAN_40_49') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_WOMAN_40_49')}
                                                              </Typography>
                                                          )}

                                                          {age >= 50 && age <= 59 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_WOMAN_50_59') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_WOMAN_50_59')}
                                                              </Typography>
                                                          )}

                                                          {age >= 60 && age <= 69 && (
                                                              <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.vo),'CR_WOMAN_60_69') }}>
                                                                  {getReviewClassification(Number(formData.vo), age, data.gender, 'CR_WOMAN_59')}
                                                              </Typography>
                                                          )}
                                                      </Box>

                                                      <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 20 ou mais de 69 anos.</Typography>
                                                  </>
                                              ) : (
                                                  <Box className='text-center'>
                                                      <Typography>Seu Consumo Máximo de Oxigênio</Typography>
                                                      <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                                      <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                                  </Box>
                                              )}
                                          </>
                                      )}
                                  </>
                                );
                            })()
                        ) : (
                            <Box className='text-center'>
                                <Typography>Seu Consumo Máximo de Oxigênio</Typography>
                                <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                            </Box>
                        )}
                      </Box>
                      <Divider className='w-full !my-5' />
                    </>
                  );

                case 10:
                  return (
                    <>
                      {responseReviewQuestions?.findReviewQuestions.filter((question) => question.category === 'NEUROMOTORS').map((question) => (
                        <Box className='w-full flex flex-col justify-between'>
                          <FormControl fullWidth key={question.questionCode}>
                            <TextField
                              name={question.question.replace(/[\s?]/g, '').toLowerCase()}
                              label={question.question}
                              variant='outlined'
                              InputLabelProps={{ shrink: true }}
                              value={formData[question.question.replace(/[\s?]/g, '').toLowerCase()]}
                              onChange={handleTextFieldChange}
                              className='!mb-5'
                              inputProps={{ maxLength: 5 }}
                              InputProps={{
                                endAdornment:
                                  <InputAdornment position="end">{question.question === 'Sentar e Alcançar' ? 'cm' : 'rp'}</InputAdornment>
                              }}
                            />
                          </FormControl>
                        </Box>
                      ))}
                      <Box className="flex flex-col items-center">
                        {((() => {
                          // Convertendo para data
                          const [day, month, year] = data.birthDate.split('/').map(Number);
                          const birthDate = new Date(year, month - 1, day);
                          const today = new Date();
                          
                          // Cálculo da idade
                          let age = today.getFullYear() - birthDate.getFullYear();
                          const hasBirthdayPassed = (today.getMonth() > birthDate.getMonth()) || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
                          
                          if (!hasBirthdayPassed) {
                              age--; // Ainda não fez aniversário este ano
                          }

                          // Categorias
                          const isAll = !data.gender ||  data.gender === 'OTHERS';

                          const isMan = data.gender === 'MAN';

                          const isWoman = data.gender === 'WOMAN';
                          return (
                            <>
                              {/* Resultado Geral */}
                              {isAll && (
                                  <>
                                      {Number(formData.flexãodebraçosrepetições) > 0 ? (
                                          <>
                                              <Typography>Seu Índice de Flexão de Braços (IFB)</Typography>

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 60 && age <= 69 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 60 a 69 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_60_69') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                      <Box className="bg-[#337535] w-[20%]"></Box>
                                                      <Box className="bg-[#224e23] w-[20%]"></Box>
                                                  </Box>

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_ALL_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_ALL_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_ALL_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_ALL_50_59') }} />
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_ALL_60_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">10</Typography>
                                                          <Typography className="absolute left-[38.5%]">22</Typography>
                                                          <Typography className="absolute right-[37.7%]">29</Typography>
                                                          <Typography className="absolute right-[17.6%]">36</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">7</Typography>
                                                          <Typography className="absolute left-[38.5%]">17</Typography>
                                                          <Typography className="absolute right-[37.7%]">22</Typography>
                                                          <Typography className="absolute right-[17.6%]">30</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">5</Typography>
                                                          <Typography className="absolute left-[38.5%]">13</Typography>
                                                          <Typography className="absolute right-[37.7%]">17</Typography>
                                                          <Typography className="absolute right-[17.6%]">25</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">2</Typography>
                                                          <Typography className="absolute left-[38.5%]">10</Typography>
                                                          <Typography className="absolute right-[37.7%]">13</Typography>
                                                          <Typography className="absolute right-[17.6%]">21</Typography>
                                                      </>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">2</Typography>
                                                          <Typography className="absolute left-[38.5%]">8</Typography>
                                                          <Typography className="absolute right-[37.7%]">11</Typography>
                                                          <Typography className="absolute right-[17.6%]">18</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  {age >= 20 && age <= 29 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_20_29') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_ALL_20_29')}
                                                      </Typography>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_30_39') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_ALL_30_39')}
                                                      </Typography>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_40_49') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_ALL_40_49')}
                                                      </Typography>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_50_59') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_ALL_50_59')}
                                                      </Typography>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_ALL_60_69') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_ALL_60_69')}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 20 ou mais de 69 anos.</Typography>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Seu Índice de Flexão de Braços (IFB)</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                          </Box>
                                      )}

                                      <Divider className='w-full !my-5' />

                                      {Number(formData.abdominalrepetições) > 0 ? (
                                          <>
                                              <Typography>Seu Índice de Resistência Abdominal (IRA)</Typography>

                                              {age >= 15 && age <= 19 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 15 a 19 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_15_19') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 60 && age <= 69 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 60 a 69 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_60_69') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                      <Box className="bg-[#337535] w-[20%]"></Box>
                                                      <Box className="bg-[#224e23] w-[20%]"></Box>
                                                  </Box>

                                                  {age >= 15 && age <= 19 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_ALL_15_19') }} />
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_ALL_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_ALL_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_ALL_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_ALL_50_59') }} />
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_ALL_60_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age >= 15 && age <= 19 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">12</Typography>
                                                          <Typography className="absolute left-[38.5%]">23</Typography>
                                                          <Typography className="absolute right-[37.7%]">29</Typography>
                                                          <Typography className="absolute right-[17.6%]">39</Typography>
                                                      </>
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">10</Typography>
                                                          <Typography className="absolute left-[38.5%]">22</Typography>
                                                          <Typography className="absolute right-[37.7%]">29</Typography>
                                                          <Typography className="absolute right-[17.6%]">36</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">8</Typography>
                                                          <Typography className="absolute left-[38.5%]">17</Typography>
                                                          <Typography className="absolute right-[37.7%]">22</Typography>
                                                          <Typography className="absolute right-[17.6%]">30</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">5</Typography>
                                                          <Typography className="absolute left-[38.5%]">13</Typography>
                                                          <Typography className="absolute right-[37.7%]">17</Typography>
                                                          <Typography className="absolute right-[17.6%]">22</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">2</Typography>
                                                          <Typography className="absolute left-[38.5%]">10</Typography>
                                                          <Typography className="absolute right-[37.7%]">13</Typography>
                                                          <Typography className="absolute right-[17.6%]">21</Typography>
                                                      </>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">1</Typography>
                                                          <Typography className="absolute left-[38.5%]">8</Typography>
                                                          <Typography className="absolute right-[37.7%]">11</Typography>
                                                          <Typography className="absolute right-[17.6%]">18</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  {age >= 15 && age <= 19 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_20_29') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_ALL_15_19')}
                                                      </Typography>
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_20_29') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_ALL_20_29')}
                                                      </Typography>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_30_39') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_ALL_30_39')}
                                                      </Typography>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_40_49') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_ALL_40_49')}
                                                      </Typography>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_50_59') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_ALL_50_59')}
                                                      </Typography>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_ALL_60_69') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_ALL_60_69')}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 15 ou mais de 69 anos.</Typography>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Seu Índice de Resistência Abdominal (IRA)</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                          </Box>
                                      )}

                                      <Divider className='w-full !my-5' />

                                      {Number(formData.sentarealcançar) > 0 ? (
                                          <>
                                              <Typography>Seu Índice Flexibilidade</Typography>

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_ALL_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_ALL_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_ALL_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_ALL_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 60 && age <= 69 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para pessoas entre 60 a 69 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_ALL_60_69') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                      <Box className="bg-[#337535] w-[20%]"></Box>
                                                      <Box className="bg-[#224e23] w-[20%]"></Box>
                                                  </Box>

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_ALL_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_ALL_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_ALL_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_ALL_50_59') }} />
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_ALL_60_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">25</Typography>
                                                          <Typography className="absolute left-[38.5%]">33</Typography>
                                                          <Typography className="absolute right-[37.7%]">37</Typography>
                                                          <Typography className="absolute right-[17.6%]">41</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">23</Typography>
                                                          <Typography className="absolute left-[38.5%]">32</Typography>
                                                          <Typography className="absolute right-[37.7%]">36</Typography>
                                                          <Typography className="absolute right-[17.6%]">41</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">18</Typography>
                                                          <Typography className="absolute left-[38.5%]">30</Typography>
                                                          <Typography className="absolute right-[37.7%]">34</Typography>
                                                          <Typography className="absolute right-[17.6%]">38</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">16</Typography>
                                                          <Typography className="absolute left-[38.5%]">30</Typography>
                                                          <Typography className="absolute right-[37.7%]">33</Typography>
                                                          <Typography className="absolute right-[17.6%]">39</Typography>
                                                      </>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">15</Typography>
                                                          <Typography className="absolute left-[38.5%]">27</Typography>
                                                          <Typography className="absolute right-[37.7%]">31</Typography>
                                                          <Typography className="absolute right-[17.6%]">35</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  {age >= 20 && age <= 29 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_ALL_20_29') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_ALL_20_29')}
                                                      </Typography>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_ALL_30_39') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_ALL_30_39')}
                                                      </Typography>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_ALL_40_49') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_ALL_40_49')}
                                                      </Typography>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_ALL_50_59') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_ALL_50_59')}
                                                      </Typography>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_ALL_60_69') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_ALL_60_69')}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para pessoas com menos de 20 ou mais de 69 anos.</Typography>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Seu Índice de Flexibilidade</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                          </Box>
                                      )}
                                  </>
                              )}

                              {isMan && (
                                  <>
                                      {Number(formData.flexãodebraçosrepetições) > 0 ? (
                                          <>
                                              <Typography>Seu Índice de Flexão de Braços (IFB)</Typography>

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 60 && age <= 69 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 60 a 69 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_60_69') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                      <Box className="bg-[#337535] w-[20%]"></Box>
                                                      <Box className="bg-[#224e23] w-[20%]"></Box>
                                                  </Box>

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_MAN_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_MAN_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_MAN_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_MAN_50_59') }} />
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_MAN_60_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">17</Typography>
                                                          <Typography className="absolute left-[38.5%]">22</Typography>
                                                          <Typography className="absolute right-[37.7%]">29</Typography>
                                                          <Typography className="absolute right-[17.6%]">36</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">12</Typography>
                                                          <Typography className="absolute left-[38.5%]">17</Typography>
                                                          <Typography className="absolute right-[37.7%]">22</Typography>
                                                          <Typography className="absolute right-[17.6%]">30</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">10</Typography>
                                                          <Typography className="absolute left-[38.5%]">13</Typography>
                                                          <Typography className="absolute right-[37.7%]">17</Typography>
                                                          <Typography className="absolute right-[17.6%]">25</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">7</Typography>
                                                          <Typography className="absolute left-[38.5%]">10</Typography>
                                                          <Typography className="absolute right-[37.7%]">13</Typography>
                                                          <Typography className="absolute right-[17.6%]">21</Typography>
                                                      </>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">5</Typography>
                                                          <Typography className="absolute left-[38.5%]">8</Typography>
                                                          <Typography className="absolute right-[37.7%]">11</Typography>
                                                          <Typography className="absolute right-[17.6%]">18</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  {age >= 20 && age <= 29 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_20_29') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_MAN_20_29')}
                                                      </Typography>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_30_39') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_MAN_30_39')}
                                                      </Typography>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_40_49') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_MAN_40_49')}
                                                      </Typography>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_50_59') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_MAN_50_59')}
                                                      </Typography>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_MAN_60_69') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_MAN_60_69')}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 20 ou mais de 69 anos.</Typography>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Seu Índice de Flexão de Braços (IFB)</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                          </Box>
                                      )}

                                      <Divider className='w-full !my-5' />

                                      {Number(formData.abdominalrepetições) > 0 ? (
                                          <>
                                              <Typography>Seu Índice de Resistência Abdominal (IRA)</Typography>

                                              {age >= 15 && age <= 19 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 15 a 19 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_15_19') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 60 && age <= 69 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 60 a 69 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_60_69') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                      <Box className="bg-[#337535] w-[20%]"></Box>
                                                      <Box className="bg-[#224e23] w-[20%]"></Box>
                                                  </Box>

                                                  {age >= 15 && age <= 19 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_MAN_15_19') }} />
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_MAN_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_MAN_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_MAN_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_MAN_50_59') }} />
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_MAN_60_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age >= 15 && age <= 19 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">18</Typography>
                                                          <Typography className="absolute left-[38.5%]">23</Typography>
                                                          <Typography className="absolute right-[37.7%]">29</Typography>
                                                          <Typography className="absolute right-[17.6%]">39</Typography>
                                                      </>
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">17</Typography>
                                                          <Typography className="absolute left-[38.5%]">22</Typography>
                                                          <Typography className="absolute right-[37.7%]">29</Typography>
                                                          <Typography className="absolute right-[17.6%]">36</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">12</Typography>
                                                          <Typography className="absolute left-[38.5%]">17</Typography>
                                                          <Typography className="absolute right-[37.7%]">22</Typography>
                                                          <Typography className="absolute right-[17.6%]">30</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">10</Typography>
                                                          <Typography className="absolute left-[38.5%]">13</Typography>
                                                          <Typography className="absolute right-[37.7%]">17</Typography>
                                                          <Typography className="absolute right-[17.6%]">22</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">7</Typography>
                                                          <Typography className="absolute left-[38.5%]">10</Typography>
                                                          <Typography className="absolute right-[37.7%]">13</Typography>
                                                          <Typography className="absolute right-[17.6%]">21</Typography>
                                                      </>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">5</Typography>
                                                          <Typography className="absolute left-[38.5%]">8</Typography>
                                                          <Typography className="absolute right-[37.7%]">11</Typography>
                                                          <Typography className="absolute right-[17.6%]">18</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  {age >= 15 && age <= 19 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_20_29') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_MAN_15_19')}
                                                      </Typography>
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_20_29') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_MAN_20_29')}
                                                      </Typography>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_30_39') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_MAN_30_39')}
                                                      </Typography>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_40_49') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_MAN_40_49')}
                                                      </Typography>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_50_59') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_MAN_50_59')}
                                                      </Typography>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_MAN_60_69') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_MAN_60_69')}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 15 ou mais de 69 anos.</Typography>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Seu Índice de Resistência Abdominal (IRA)</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                          </Box>
                                      )}

                                      <Divider className='w-full !my-5' />

                                      {Number(formData.sentarealcançar) > 0 ? (
                                          <>
                                              <Typography>Seu Índice Flexibilidade</Typography>

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_MAN_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_MAN_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_MAN_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_MAN_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 60 && age <= 69 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para homens entre 60 a 69 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_MAN_60_69') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                      <Box className="bg-[#337535] w-[20%]"></Box>
                                                      <Box className="bg-[#224e23] w-[20%]"></Box>
                                                  </Box>

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_MAN_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_MAN_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_MAN_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_MAN_50_59') }} />
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_MAN_60_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">25</Typography>
                                                          <Typography className="absolute left-[38.5%]">30</Typography>
                                                          <Typography className="absolute right-[37.7%]">34</Typography>
                                                          <Typography className="absolute right-[17.6%]">40</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">23</Typography>
                                                          <Typography className="absolute left-[38.5%]">28</Typography>
                                                          <Typography className="absolute right-[37.7%]">33</Typography>
                                                          <Typography className="absolute right-[17.6%]">38</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">18</Typography>
                                                          <Typography className="absolute left-[38.5%]">24</Typography>
                                                          <Typography className="absolute right-[37.7%]">29</Typography>
                                                          <Typography className="absolute right-[17.6%]">35</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">16</Typography>
                                                          <Typography className="absolute left-[38.5%]">24</Typography>
                                                          <Typography className="absolute right-[37.7%]">28</Typography>
                                                          <Typography className="absolute right-[17.6%]">35</Typography>
                                                      </>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">15</Typography>
                                                          <Typography className="absolute left-[38.5%]">20</Typography>
                                                          <Typography className="absolute right-[37.7%]">25</Typography>
                                                          <Typography className="absolute right-[17.6%]">33</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  {age >= 20 && age <= 29 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_MAN_20_29') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_MAN_20_29')}
                                                      </Typography>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_MAN_30_39') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_MAN_30_39')}
                                                      </Typography>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_MAN_40_49') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_MAN_40_49')}
                                                      </Typography>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_MAN_50_59') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_MAN_50_59')}
                                                      </Typography>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_MAN_60_69') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_MAN_60_69')}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para homens com menos de 20 ou mais de 69 anos.</Typography>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Seu Índice de Flexibilidade</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                          </Box>
                                      )}
                                  </>
                              )}

                          {isWoman && (
                                  <>
                                      {Number(formData.flexãodebraçosrepetições) > 0 ? (
                                          <>
                                              <Typography>Seu Índice de Flexão de Braços (IFB)</Typography>

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 60 && age <= 69 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 60 a 69 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_60_69') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.flexãodebraçosrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                      <Box className="bg-[#337535] w-[20%]"></Box>
                                                      <Box className="bg-[#224e23] w-[20%]"></Box>
                                                  </Box>

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_50_59') }} />
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_60_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">10</Typography>
                                                          <Typography className="absolute left-[38.5%]">15</Typography>
                                                          <Typography className="absolute right-[37.7%]">21</Typography>
                                                          <Typography className="absolute right-[17.6%]">30</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">7</Typography>
                                                          <Typography className="absolute left-[38.5%]">13</Typography>
                                                          <Typography className="absolute right-[37.7%]">20</Typography>
                                                          <Typography className="absolute right-[17.6%]">27</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">5</Typography>
                                                          <Typography className="absolute left-[38.5%]">11</Typography>
                                                          <Typography className="absolute right-[37.7%]">15</Typography>
                                                          <Typography className="absolute right-[17.6%]">24</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">2</Typography>
                                                          <Typography className="absolute left-[38.5%]">7</Typography>
                                                          <Typography className="absolute right-[37.7%]">11</Typography>
                                                          <Typography className="absolute right-[17.6%]">21</Typography>
                                                      </>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">2</Typography>
                                                          <Typography className="absolute left-[38.5%]">5</Typography>
                                                          <Typography className="absolute right-[37.7%]">12</Typography>
                                                          <Typography className="absolute right-[17.6%]">17</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  {age >= 20 && age <= 29 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_20_29') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_WOMAN_20_29')}
                                                      </Typography>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_30_39') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_WOMAN_30_39')}
                                                      </Typography>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_40_49') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_WOMAN_40_49')}
                                                      </Typography>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_50_59') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_WOMAN_50_59')}
                                                      </Typography>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.flexãodebraçosrepetições),'FB_WOMAN_60_69') }}>
                                                          {getReviewClassification(Number(formData.flexãodebraçosrepetições), age, data.gender, 'FB_WOMAN_60_69')}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 20 ou mais de 69 anos.</Typography>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Seu Índice de Flexão de Braços (IFB)</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                          </Box>
                                      )}

                                      <Divider className='w-full !my-5' />

                                      {Number(formData.abdominalrepetições) > 0 ? (
                                          <>
                                              <Typography>Seu Índice de Resistência Abdominal (IRA)</Typography>

                                              {age >= 15 && age <= 19 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 15 a 19 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_15_19') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 60 && age <= 69 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 60 a 69 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_60_69') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.abdominalrepetições).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                      <Box className="bg-[#337535] w-[20%]"></Box>
                                                      <Box className="bg-[#224e23] w-[20%]"></Box>
                                                  </Box>

                                                  {age >= 15 && age <= 19 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_WOMAN_15_19') }} />
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_WOMAN_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_WOMAN_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_WOMAN_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_WOMAN_50_59') }} />
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.abdominalrepetições),'RA_WOMAN_60_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age >= 15 && age <= 19 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">12</Typography>
                                                          <Typography className="absolute left-[38.5%]">18</Typography>
                                                          <Typography className="absolute right-[37.7%]">25</Typography>
                                                          <Typography className="absolute right-[17.6%]">33</Typography>
                                                      </>
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">10</Typography>
                                                          <Typography className="absolute left-[38.5%]">15</Typography>
                                                          <Typography className="absolute right-[37.7%]">21</Typography>
                                                          <Typography className="absolute right-[17.6%]">30</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">8</Typography>
                                                          <Typography className="absolute left-[38.5%]">13</Typography>
                                                          <Typography className="absolute right-[37.7%]">20</Typography>
                                                          <Typography className="absolute right-[17.6%]">27</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">5</Typography>
                                                          <Typography className="absolute left-[38.5%]">11</Typography>
                                                          <Typography className="absolute right-[37.7%]">15</Typography>
                                                          <Typography className="absolute right-[17.6%]">24</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">2</Typography>
                                                          <Typography className="absolute left-[38.5%]">7</Typography>
                                                          <Typography className="absolute right-[37.7%]">11</Typography>
                                                          <Typography className="absolute right-[17.6%]">21</Typography>
                                                      </>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">1</Typography>
                                                          <Typography className="absolute left-[38.5%]">5</Typography>
                                                          <Typography className="absolute right-[37.7%]">12</Typography>
                                                          <Typography className="absolute right-[17.6%]">17</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  {age >= 15 && age <= 19 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_20_29') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_WOMAN_15_19')}
                                                      </Typography>
                                                  )}

                                                  {age >= 20 && age <= 29 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_20_29') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_WOMAN_20_29')}
                                                      </Typography>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_30_39') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_WOMAN_30_39')}
                                                      </Typography>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_40_49') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_WOMAN_40_49')}
                                                      </Typography>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_50_59') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_WOMAN_50_59')}
                                                      </Typography>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.abdominalrepetições),'RA_WOMAN_60_69') }}>
                                                          {getReviewClassification(Number(formData.abdominalrepetições), age, data.gender, 'RA_WOMAN_60_69')}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 15 ou mais de 69 anos.</Typography>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Seu Índice de Resistência Abdominal (IRA)</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                          </Box>
                                      )}

                                      <Divider className='w-full !my-5' />

                                      {Number(formData.sentarealcançar) > 0 ? (
                                          <>
                                              <Typography>Seu Índice Flexibilidade</Typography>

                                              {age >= 20 && age <= 29 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 20 a 29 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_20_29') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 30 && age <= 39 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 30 a 39 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_30_39') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 40 && age <= 49 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 40 a 49 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_40_49') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 50 && age <= 59 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 50 a 59 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_50_59') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              {age >= 60 && age <= 69 && (
                                                  <>
                                                      <Typography className="text-black !mt-5">Referência para mulheres entre 60 a 69 anos</Typography>
                                                      <Box className="flex flex-row mt-5" style={{ color: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_60_69') }}>
                                                          <Typography variant="h4" className="!font-bold">
                                                              {String(formData.sentarealcançar).replace('.', ',')}
                                                          </Typography>
                                                          <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                                                      </Box>
                                                  </>
                                              )}

                                              <Box className="w-full mt-5 relative">
                                                  <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                                                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                                                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                                                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                                                      <Box className="bg-[#337535] w-[20%]"></Box>
                                                      <Box className="bg-[#224e23] w-[20%]"></Box>
                                                  </Box>

                                                  {age >= 20 && age <= 29 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_WOMAN_20_29') }} />
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_WOMAN_30_39') }} />
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_WOMAN_40_49') }} />
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_WOMAN_50_59') }} />
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(Number(formData.sentarealcançar),'SA_WOMAN_60_59') }} />
                                                  )}
                                                  
                                              </Box>

                                              <Box className="w-full flex justify-between mt-2 text-xs text-gray-700 relative">
                                                  {age >= 20 && age <= 29 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">28</Typography>
                                                          <Typography className="absolute left-[38.5%]">33</Typography>
                                                          <Typography className="absolute right-[37.7%]">37</Typography>
                                                          <Typography className="absolute right-[17.6%]">41</Typography>
                                                      </>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">27</Typography>
                                                          <Typography className="absolute left-[38.5%]">32</Typography>
                                                          <Typography className="absolute right-[37.7%]">36</Typography>
                                                          <Typography className="absolute right-[17.6%]">41</Typography>
                                                      </>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">25</Typography>
                                                          <Typography className="absolute left-[38.5%]">30</Typography>
                                                          <Typography className="absolute right-[37.7%]">34</Typography>
                                                          <Typography className="absolute right-[17.6%]">38</Typography>
                                                      </>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">25</Typography>
                                                          <Typography className="absolute left-[38.5%]">30</Typography>
                                                          <Typography className="absolute right-[37.7%]">33</Typography>
                                                          <Typography className="absolute right-[17.6%]">39</Typography>
                                                      </>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <>
                                                          <Typography className="absolute left-[19%]">23</Typography>
                                                          <Typography className="absolute left-[38.5%]">27</Typography>
                                                          <Typography className="absolute right-[37.7%]">31</Typography>
                                                          <Typography className="absolute right-[17.6%]">35</Typography>
                                                      </>
                                                  )}
                                              </Box>

                                              <Box className="mt-[3rem]">
                                                  {age >= 20 && age <= 29 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_20_29') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_WOMAN_20_29')}
                                                      </Typography>
                                                  )}

                                                  {age >= 30 && age <= 39 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_30_39') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_WOMAN_30_39')}
                                                      </Typography>
                                                  )}

                                                  {age >= 40 && age <= 49 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_40_49') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_WOMAN_40_49')}
                                                      </Typography>
                                                  )}

                                                  {age >= 50 && age <= 59 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_50_59') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_WOMAN_50_59')}
                                                      </Typography>
                                                  )}

                                                  {age >= 60 && age <= 69 && (
                                                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(Number(formData.sentarealcançar),'SA_WOMAN_60_69') }}>
                                                          {getReviewClassification(Number(formData.sentarealcançar), age, data.gender, 'SA_WOMAN_60_69')}
                                                      </Typography>
                                                  )}
                                              </Box>

                                              <Typography className='!text-sm text-center !mt-5'>O resultado pode não ser válido para mulheres com menos de 20 ou mais de 69 anos.</Typography>
                                          </>
                                      ) : (
                                          <Box className='text-center'>
                                              <Typography>Seu Índice de Flexibilidade</Typography>
                                              <Typography className="text-black !mt-5">Informações insuficientes</Typography>
                                              <Typography className=" !mt-5">Preencha os campos ao lado para calcular.</Typography>
                                          </Box>
                                      )}
                                  </>
                              )}
                            </>
                            );
                        })())}
                      </Box>
                      <Divider className='w-full !my-5' />
                    </>
                  );

                default:
                  return null;
              }
            })()}

            <Box className='flex flex-row justify-between mt-3'>
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

              <Box className='w-full flex flex-row justify-end'>
                {(activeStep === 0 || activeStep < dynamicSteps.length - 1) && (
                  <Button
                    disabled={!infoCompleted}
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
                <Button
                  disabled={!infoCompleted || isLoading}
                  variant="contained"
                  color="primary"
                  onClick={handleFinish}
                  className='!ml-5'
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
    </Box>
  );
}