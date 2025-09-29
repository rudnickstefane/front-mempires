import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, InputAdornment, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import PeopleHeader from '@sr/modules/assets/svg/peopleHeader.svg?react';
import * as motion from "motion/react-client";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { GrBlockQuote } from 'react-icons/gr';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoMdLocate } from 'react-icons/io';
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

    // Estado e funções relacionadas a bairros
    filteredNeighborhoods,
    selectedNeighborhood,
    setSelectedNeighborhood,
    setNeighborhoodInput,
    isLoadingNeighborhoods,

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
    cardVariants
  } = useHomeHeaderLogic();

  const options = [
    { label: "Casa", group: "Residencial" },
    { label: "Apartamento", group: "Residencial" },
    { label: "Kitnet", group: "Residencial" },
    { label: "Loja", group: "Comercial" },
    { label: "Sala Comercial", group: "Comercial" },
    { label: "Galpão", group: "Comercial" },
  ];

  return (
    <>
      <Menu />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex w-full h-[39rem] relative px-5"
      >
        <Box className='flex w-full h-[39rem] relative px-5'>
          <Box className='w-3/4 flex justify-center p-5'>
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
                <FormControl fullWidth>
                  <Box className='w-full pb-2'>
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
                  </Box>
                  <Autocomplete
                    multiple
                    limitTags={2}
                    disableCloseOnSelect
                    options={options}
                    groupBy={(option) => option.group}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        margin="normal"
                        label="Tipos de imóvel"
                        placeholder="Digite ou selecione"
                      />
                    )}
                  />
                  <motion.div variants={childVariants}>
                    <Autocomplete
                      options={cities}
                      loading={isLoadingCities}
                      popupIcon={<BiChevronDown />}
                      loadingText="Localizando cidade..."
                      getOptionLabel={(option) => `${option.nome} - ${option.microrregiao.mesorregiao.UF.sigla}`}
                      noOptionsText={
                        cityInput.trim() !== '' && !isLoadingCities ? 'Nenhuma cidade encontrada' : 'Digite o nome de uma cidade para buscar'
                      }
                      onInputChange={(_, value) => setCityInput(value)}
                      onChange={(_, value) => {
                        setSelectedCity(value);
                        setNeighborhoodInput('');
                        setSelectedNeighborhood(null);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Cidade"
                          required
                          margin="normal"
                          variant="outlined"
                          placeholder="Digite o nome da cidade"
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
                  <motion.div variants={childVariants}>
                    <Autocomplete
                      loading={isLoadingNeighborhoods}
                      options={filteredNeighborhoods}
                      popupIcon={<BiChevronDown />}
                      disabled={!selectedCity}
                      loadingText="Localizando bairro..."
                      noOptionsText={
                        cityInput.trim() !== '' && !isLoadingCities ? 'Nenhum bairro encontrado' : 'Digite o nome de um bairro para buscar'
                      }
                      getOptionLabel={(option) => option.nome}
                      value={selectedNeighborhood}
                      onChange={(_, value) => setSelectedNeighborhood(value)}
                      onInputChange={(_, value) => setNeighborhoodInput(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Bairro"
                          margin="normal"
                          variant="outlined"
                          placeholder={selectedCity ? "Digite o nome do bairro" : "Selecione a cidade primeiro"}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: <IoMdLocate className={`text-[1.5rem] ${selectedCity ? 'text-[#282929]' : ''}`} />,
                            endAdornment: (
                              <>
                                {isLoadingNeighborhoods ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }}
                        />
                      )}
                    />
                  </motion.div>
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
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box className='flex flex-col items-end justify-center relative w-full'>
            <motion.div variants={childVariants}>
              <PeopleHeader className="w-full ml-10 text-secondary"
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
                    right: 'right-12',
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
              {/* <Box className='flex justify-around flex-col w-full cursor-default'>
                <Box className='absolute top-[9rem]'>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.9,
                        delay: 1.3,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <Box className='bg-primary p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2'>
                      <Box className='flex items-center'>
                        <GrBlockQuote className='p-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white mr-2' />
                        <Box>
                          <Typography className='!text-sm text-red-500 !font-bold'>Avaliações dos moradores</Typography>
                          <Typography className='!text-sm text-primary transition-all duration-500 transform'>Opiniões de quem já viveu na região</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
                <Box className='absolute bottom-[9rem] ml-10'>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.9,
                        delay: 1.6,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <Box className='bg-primary p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2'>
                      <Box className='flex items-center'>
                        <TbDogBowl className='absolute -mt-[5rem] -ml-[3rem] p-2 w-12 h-12 rounded-full bg-[#243762] text-white' />
                        <Box>
                          <Typography className='!text-sm text-[#243762] !font-bold'>"Aceita Pet" não é apenas um filtro</Typography>
                          <Typography className='!text-sm text-primary transition-all duration-500 transform'>Viva com seu amigo sem preocupações</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
                <Box className='absolute top-[2.5rem] right-12'>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.9,
                        delay: 1.9,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <Box className='bg-primary p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2'>
                      <Box className='flex items-center'>
                        <RiVerifiedBadgeFill className='p-2 w-10 h-10 bg-[#0095f6] rounded-full flex items-center justify-center text-white mr-2' />
                        <Box>
                          <Typography className='!text-sm text-[#0095f6] !font-bold'>Imóveis verificados</Typography>
                          <Typography className='!text-sm text-primary transition-all duration-500 transform'>Transparência e segurança</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </motion.div>
    </>
  );
}
