import { Box, Button, CircularProgress, Divider, FormControl, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/icon.png';
import mail from '../../assets/images/mail.png';
import { useRecoveryForm } from '../../common/hooks';
import { ImgSignIn } from '../SignIn/style.d';

function Recovery() {

    const { enqueueSnackbar } = useSnackbar();

    const {
        isLoading,
        formData,
        errors,
        emailSent,
        handleTextFieldChange,
        handleRecovery,
        handleKeyPress
    } = useRecoveryForm({ enqueueSnackbar });

    return (
        <Box className='flex flex-row w-full h-screen'>
            <Box className='flex flex-col md:justify-center items-center bg-primary md:w-[1024px] w-full'>
                <Box className='flex flex-col justify-center items-center w-full px-14'>
                    <Link to='/'>
                        <Box className='flex w-[161px] items-center !-ml-5'>
                            <img src={logo} alt="Logo" className='w-[3.7rem]' />
                            <Box className='ml-3 text-[2rem] color-primary font-intro mt-[.34rem]'>iFlex</Box>
                        </Box>
                    </Link>
                    {!emailSent ? (
                        <>
                            <Box className='flex items-center justify-center flex-col mt-5'>
                                <Typography className='!text-3xl text-gray !-ml-3'>Recuperar acesso</Typography>
                                <Typography className='!mt-4 !text-sm !text-gray-700 text-center'>Informe o CNPJ, CPF, E-mail ou nome de usuário associado à sua conta iFlex Fit.</Typography>
                            </Box>
                            <Divider className='!my-5 w-full border-gray' />
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    onKeyDown={handleKeyPress}
                                    label="CNPJ, CPF, E-mail ou Usuário"
                                    variant="outlined"
                                    margin="normal"
                                    name='recovery'
                                    className='!m-0'
                                    value={formData.recovery}
                                    onChange={handleTextFieldChange}
                                    error={!!errors.recoveryError}
                                    helperText={errors.recoveryError}
                                />
                            </FormControl>
                            <Button
                                className='!mt-5'
                                type="submit"
                                disabled={isLoading || !formData.recovery}
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleRecovery}
                                sx={{
                                    backgroundColor: '#ff0336',
                                    color: '#fff',
                                    height: '3rem',
                                    '&:hover': {
                                    backgroundColor: '#e6001b',
                                    },
                                }}
                                >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Enviar'}
                            </Button>
                            <Typography className='!mt-4 !text-sm !text-gray-700 text-center'>Enviaremos instruções para recuperar seu acesso.</Typography>
                        </>
                    ) : (
                        <>
                            <Box className='flex items-center justify-center flex-col mt-3'>
                                <img src={mail} alt="Caixa de e-mail" className='w-[12rem]' />
                                <Typography className='!text-2xl text-gray text-center !mt-5'>Verifique seu e-mail</Typography>
                                <Typography className='!mt-4 !text-[1rem] !text-gray-700 text-center'>
                                    Enviamos instruções para recuperar seu acesso.
                                </Typography>
                                <Typography className='!text-[1rem] !text-gray-700 text-center'>Acesse sua caixa de entrada e siga as instruções.
                                </Typography>
                                <Button
                                    className='!mt-6'
                                    variant="contained"
                                    component={Link}
                                    to="/"
                                    sx={{
                                    backgroundColor: '#ff0336',
                                    color: '#fff',
                                    height: '3rem',
                                    width: '100%',
                                    '&:hover': {
                                        backgroundColor: '#e6001b',
                                    },
                                    }}
                                >
                                    Voltar para o início
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
            <Box className='w-full bg-secondary md:flex hidden'>
                <ImgSignIn />
                <Box className='flex items-center h-full absolute top-0'>
                    <Box className='flex flex-col ml-[5rem] w-[450px]'>
                        <Box className="flex flex-row font-intro md:text-[2.5rem] text-[.6rem] text-white uppercase items-center">
                            Descubra em um só lugar toda a agilidade e facilitade dos serviços na
                        </Box>
                        <Box
                            className={`font-intro text-[4rem] uppercase text-transparent stroke-white -mt-[.3rem] transition-opacity duration-500 md:w-auto w-[500px]`}
                            style={{
                            WebkitTextStroke: '.08rem white', // Define a borda ao redor do texto
                            WebkitTextFillColor: 'transparent', // Faz o preenchimento do texto transparente
                            }}
                        >
                            iFlex
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Recovery;
