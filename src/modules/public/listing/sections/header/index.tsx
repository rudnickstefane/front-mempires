import { Autocomplete, Box, CircularProgress, TextField, Typography } from '@mui/material';
import * as motion from "motion/react-client";
import { BiChevronDown } from 'react-icons/bi';
import { FaRegLightbulb } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useHeaderLogic } from './hooks';

export function ListingHeader() {
  const {
    // Estado e funções relacionadas a cidades
    cityInput,
    setCityInput,
    cities,
    setSelectedCity,
    isLoadingCities,

    // Estado e funções para busca
    errors,
    ref,
    controls,
    containerVariants,
  } = useHeaderLogic();

  return (
    <>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex w-full h-[5.875rem] relative px-5 border-b"
      >
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
    </>
  );
}
