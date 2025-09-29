import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Box, Button, Checkbox, Chip, CircularProgress, FormControl, FormControlLabel, InputAdornment, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import PeopleHeader from '@sr/modules/assets/svg/peopleHeader.svg?react';
import * as motion from "motion/react-client";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FaRegLightbulb } from "react-icons/fa";
import { GrBlockQuote } from 'react-icons/gr';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LiaBedSolid } from 'react-icons/lia';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { TbDogBowl } from 'react-icons/tb';
import { Menu } from '../../../../components/Menu';
import { useHomeHeaderLogic } from './hooks';

export function HomeHeader() {
  const {
    // Estado e funções relacionadas a cidades
    cityInput,
    setCityInput,
    cities,
    selectedCity,
    setSelectedCity,
    isLoadingCities,

    // Controle de modal/dropdown
    isOpen,
    handleOpen,
    handleClose,

    // Manipuladores de interação com o mouse
    handleMouseMove,
    handleMouseLeave,

    // Referência para elemento do DOM
    boxRef,

    // Conteúdo e estilo da interface
    title,
    subtitle,
    text,
    description,
    fade,

    // Estado e funções para busca
    errors,
    setRentType,
    totalValue,
    handleTotalValueChange,
    bedrooms,
    setBedrooms,
    handleSearch,
    ref,
    controls,
    containerVariants,
    childVariants,
    cardVariants,
    filteredOptions,
    isFocused,
    setIsFocused,
    selectedValues,
    setSelectedValues,
  } = useHomeHeaderLogic();
  
  return (
    <>
      <Menu />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex w-full h-[35rem] relative px-5"
      >
        <Box className='flex w-full h-[35rem] relative'>
          <Box className='w-11/12 flex justify-center py-8 mr-5'>
            <Box className='flex flex-col w-full'>
              <Box className='flex flex-col font-bold'>
                <motion.div variants={childVariants}>
                  <Box className="text-primary font-bold text-[clamp(1.5rem,4vw,2.7rem)]">
                    {title}
                  </Box>
                  <Box className="flex flex-row">
                    <Box
                      className={`text-[2.7rem] md:-mt-[1.3rem] -mt-[1rem] md:w-auto w-[500px] text-secondary ${fade ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {text}
                    </Box>
                    <Box className="flex flex-row md:text-[2.7rem] text-[1.5rem] text-primary items-center -mt-[1.3rem] ml-2">
                      {subtitle}
                    </Box>
                  </Box>
                  <Typography
                    className={`!my-5 !mb-4 text-primary text-[1rem] md:text-[1.125rem] !font-light leading-relaxed ${fade ? 'opacity-100' : 'opacity-0'} line-clamp-3`}
                  >
                    {description}
                  </Typography>
                </motion.div>
                <Box className='w-full pb-2'>
                  <FormControl fullWidth>
                    <RadioGroup
                      name="radio-buttons-group"
                      className='flex justify-between'
                      row
                      defaultValue="alugar"
                      onChange={(e) => setRentType(e.target.value as 'alugar' | 'comprar')}
                    >
                      <motion.div variants={childVariants} className="md:w-[49%] w-full">
                        <FormControlLabel
                          value="alugar"
                          control={<Radio color="primary" />}
                          label="Alugar"
                          className='h-14 w-full border-solid border border-base rounded-lg'
                        />
                      </motion.div>
                      <motion.div variants={childVariants} className="md:w-[49%] w-full">
                        <FormControlLabel
                          value="comprar"
                          control={<Radio color="primary" />}
                          label="Comprar"
                          className='md:mt-0 mt-5 w-full h-14 border-solid border border-base rounded-lg'
                        />
                      </motion.div>
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box className='flex gap-4 w-full h-[5rem]'>
                  <motion.div variants={childVariants} className='w-full'>
                    <Autocomplete
                      fullWidth
                      multiple
                      disableCloseOnSelect
                      className='h-0'
                      componentsProps={{
                        clearIndicator: {
                          title: 'Limpar tudo',
                        },
                        popupIndicator: {
                          title: 'Abrir ou fechar lista',
                        },
                      }}
                      options={filteredOptions}
                      groupBy={(option) => option.group}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) => option.label === value.label}
                      onChange={(_, newValue) => setSelectedValues(newValue)}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          <Typography variant="body2">{option.label}</Typography>
                        </li>
                      )}
                      renderTags={(value, getTagProps) => {
                        if (value.length === 0) return null;

                        const firstTag = (
                          <Chip
                            label={value[0].label}
                            {...getTagProps({ index: 0 })}
                            className="!max-w-[9rem] whitespace-nowrap overflow-hidden text-ellipsis"
                          />
                        );

                        const more = value.length - 1;

                        const counterTag =
                          more > 0 ? (
                            <Chip
                              label={`+ ${more}`}
                              {...getTagProps({ index: 1 })}
                              onDelete={undefined}
                              className="ml-1"
                            />
                          ) : null;

                        return [firstTag, counterTag];
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          margin="normal"
                          label="Tipo de Imóvel"
                          InputLabelProps={{ shrink: true }}
                          placeholder={
                            isFocused || selectedValues.length > 0
                              ? 'Digite ou selecione'
                              : 'Todos os imóveis'
                          }
                          onFocus={() => setIsFocused(true)} // Define foco como true
                          onBlur={() => setIsFocused(false)} // Define foco como false
                        />
                      )}
                    />
                  </motion.div>
                  <motion.div variants={childVariants} className='w-full'>
                    <Autocomplete
                      fullWidth
                      className='h-0'
                      options={cities}
                      loading={isLoadingCities}
                      componentsProps={{
                        clearIndicator: {
                          title: 'Limpar tudo',
                        },
                        popupIndicator: {
                          title: 'Abrir ou fechar lista',
                        },
                      }}
                      popupIcon={<BiChevronDown />}
                      loadingText="Localizando..."
                      getOptionLabel={(option) => `${option.nome} - ${option.microrregiao.mesorregiao.UF.sigla}`}
                      noOptionsText={
                        cityInput.trim() !== '' && !isLoadingCities ?
                          'Nenhum resultado encontrado'
                          :
                          <Box className='flex items-center gap-2'>
                            <FaRegLightbulb className='text-secondary !text-4xl mr-2' />
                            <Typography className='!text-sm text-primary'>
                              Busque por <strong>bairro</strong>, <strong>cidade</strong>, <strong>condomínio</strong>, <strong>empreendimento</strong>, <strong>corretor</strong>, <strong>imobiliária</strong> ou <strong>rua</strong>.
                            </Typography>
                          </Box>
                      }
                      onInputChange={(_, value) => setCityInput(value)}
                      onChange={(_, value) => {
                        setSelectedCity(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Onde deseja buscar?"
                          required
                          margin="normal"
                          variant="outlined"
                          placeholder="Onde deseja buscar?"
                          InputLabelProps={{
                            shrink: Boolean(cityInput),
                            sx: {
                              marginLeft: !cityInput ? '1.5rem' : 0,
                            },
                          }}
                          error={!!errors.cityError}
                          helperText={errors.cityError}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: <HiOutlineLocationMarker className={`text-[1.5rem] ${cityInput.trim() ? 'text-[#282929]' : 'text-gray-500'}`} />,
                            endAdornment: (
                              <>
                                {isLoadingCities ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }}
                        />
                      )}
                    />
                  </motion.div>
                </Box>
                <Box className='flex gap-4'>
                  <motion.div variants={childVariants} className="w-full">
                    <TextField
                      label="Valor total até (R$)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={totalValue}
                      autoComplete='off'
                      onChange={handleTotalValueChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="R$ 0,00"
                      type="text"
                    />
                  </motion.div>
                  <motion.div variants={childVariants} className="w-full">
                    <TextField
                      select
                      label="Nº de quartos"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      InputLabelProps={{
                        shrink: Boolean(bedrooms),
                        sx: {
                          marginLeft: !bedrooms ? '2rem' : 0,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LiaBedSolid
                              className={`text-[1.5rem] mr-2 ${bedrooms ? 'text-[#282929]' : 'text-gray-500'}`}
                            />
                          </InputAdornment>
                        ),
                        
                      }}
                      SelectProps={{
                        open: isOpen,
                        onOpen: handleOpen,
                        onClose: handleClose,
                        IconComponent: isOpen
                          ? () => <BiChevronUp className='absolute -z-10 right-2 text-gray-500 text-[1.5rem]' />
                          : () => <BiChevronDown className='absolute -z-10 right-2 text-gray-500 text-[1.5rem]' />,
                      }}
                    >
                      <MenuItem value="">Nº de quartos</MenuItem>
                      <MenuItem value="1">1+</MenuItem>
                      <MenuItem value="2">2+</MenuItem>
                      <MenuItem value="3">3+</MenuItem>
                      <MenuItem value="4">4+</MenuItem>
                    </TextField>
                  </motion.div>
                </Box>
                <motion.div variants={childVariants}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`h-14 !rounded-xl !mt-4 ${
                      !selectedCity ? '' : 'button-primary'
                    }`}
                    fullWidth
                    onClick={handleSearch}
                    disabled={!selectedCity}
                  >
                    Buscar imóveis
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Box>
          <Box className='flex flex-col items-end justify-center relative w-full'>
            <motion.div variants={childVariants} className='flex right-0'>
              <PeopleHeader className="w-full scale-[1.06] h-[35rem] ml-10 mt-6 text-secondary"
                aria-label="Uma pessoa em frente ao notebook buscando imóveis"
              />
            </motion.div>
            <Box
              ref={boxRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className='absolute w-full h-full flex flex-row p-5 transition-transform duration-1000 ease-out'
            >
              <Box className="flex justify-around flex-col w-full cursor-default">
                {[
                  {
                    top: '9rem',
                    icon: <GrBlockQuote className="p-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white mr-2" />,
                    title: 'Avaliações dos moradores',
                    titleColor: 'text-red-500',
                    description: 'Opiniões de quem já viveu na região',
                  },
                  {
                    bottom: '9rem',
                    ml: 'ml-10',
                    icon: <TbDogBowl className="absolute -mt-[5rem] -ml-[3rem] p-2 w-12 h-12 rounded-full bg-[#243762] text-white" />,
                    title: '"Aceita Pet" não é apenas um filtro',
                    titleColor: 'text-[#243762]',
                    description: 'Viva com seu amigo sem preocupações',
                  },
                  {
                    top: '2.5rem',
                    right: 'right-8',
                    icon: <RiVerifiedBadgeFill className="p-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2" />,
                    title: 'Imóveis verificados',
                    titleColor: 'text-blue-500',
                    description: 'Transparência e segurança',
                  },
                ].map((card, index) => (
                  <Box
                    key={index}
                    className={`absolute ${card.top ? `top-[${card.top}]` : ''} ${card.bottom ? `bottom-[${card.bottom}]` : ''} ${card.ml ? card.ml : ''} ${card.right ? card.right : ''}`}
                  >
                    <motion.div
                      custom={index}
                      variants={cardVariants}
                    >
                      <Box className="bg-tertiary p-4 rounded-lg shadow-md border border-card transform transition-transform duration-300 hover:-translate-y-2">
                        <Box className="flex items-center">
                          {card.icon}
                          <Box>
                            <Typography className={`!text-sm ${card.titleColor} !font-bold`}>{card.title}</Typography>
                            <Typography className="!text-sm text-primary font-semibold">{card.description}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </>
  );
}
