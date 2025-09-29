import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, CircularProgress, Divider, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/icon.png';
import { useResetPasswordForm } from '../../common/hooks';
import { ImgSignIn } from '../signin/style.d';

function ResetPassword() {

    const { enqueueSnackbar } = useSnackbar();

    const {
        isLoading,
        formData,
        errors,
        showPassword,
        showConfirmPassword,
        handleClickShowPassword,
        handleClickShowConfirmPassword,
        handleMouseDownPassword,
        handleTextFieldChange,
        handleRecovery,
        handleKeyPress
    } = useResetPasswordForm({ enqueueSnackbar });

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
                    <Box className='flex items-center justify-center flex-col mt-5'>
                        <Typography className='!text-3xl text-gray !-ml-3'>Recuperar acesso</Typography>
                        <Typography className='!mt-4 !text-sm !text-gray-700 text-center'>Digite sua nova senha abaixo.</Typography>
                    </Box>
                    <Divider className='!my-5 w-full border-gray' />
                    <FormControl fullWidth>
                        <TextField
                            required
                            onChange={handleTextFieldChange}
                            onKeyDown={handleKeyPress}
                            error={!!errors.passwordError}
                            name="password"
                            value={formData.password}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Nova senha"
                            className='!m-0'
                            helperText={errors.passwordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            style={{ marginRight: '0' }}
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            required
                            onChange={handleTextFieldChange}
                            onKeyDown={handleKeyPress}
                            error={!!errors.confirmPasswordError}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            id="outlined-adornment-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            label="Confirmar nova senha"
                            className='!my-5'
                            helperText={errors.confirmPasswordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            style={{ marginRight: '0' }}
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        disabled={isLoading || !formData.password || (formData.confirmPassword !== formData.password)}
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
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Redefinir Senha'}
                    </Button>
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

export default ResetPassword;
