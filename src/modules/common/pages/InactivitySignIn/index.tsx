import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, CircularProgress, Divider, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useInactivity } from '../../hooks';

function InactivitySignIn() {

    const { enqueueSnackbar } = useSnackbar();

    const {
        isLoading,
        formData,
        errors,
        showPassword,
        handleTextFieldChange,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleAccess,
        inactivityLogIn
    } = useInactivity({ enqueueSnackbar });

    return (
        <>
            {inactivityLogIn && (
                <Box className='absolute bg-[#0000009a] z-[1350] w-full h-full flex items-center justify-center'>
                    <Box className='w-[500px] rounded-lg p-10 shadow-lg bg-white'>
                        <Box className='flex flex-col justify-center items-center'>
                            <Box className='w-[500px] px-10'>
                                <Box className='flex items-center justify-center flex-col'>
                                    <Typography className='!text-3xl text-[#333333]'>Bem-vindo de volta!</Typography>
                                    <Typography className='!mt-5 text-center'>Parece que você ficou ausente por um tempo.</Typography>
                                    <Typography className='!mt-2 text-center'>Para sua segurança, pedimos que faça login novamente e continue de onde parou.</Typography>
                                </Box>
                                <Divider className='!my-5' />
                                <FormControl fullWidth>
                                    <TextField
                                        disabled
                                        required
                                        label="E-mail"
                                        variant="outlined"
                                        margin="normal"
                                        name='login'
                                        className='!mb-0'
                                        value={formData.login}
                                        onChange={handleTextFieldChange}
                                        error={!!errors.loginError}
                                        helperText={errors.loginError}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        onChange={handleTextFieldChange}
                                        error={!!errors.passwordError}
                                        name="password"
                                        value={formData.password}
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        label="Digite sua senha"
                                        className='!my-5'
                                        helperText={errors.passwordError} // Exibe a mensagem de erro, caso haja
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
                                <Button
                                    disabled={isLoading}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleAccess}
                                    sx={{
                                        backgroundColor: '#ff0336',
                                        color: '#fff',
                                        height: '3rem',
                                        '&:hover': {
                                        backgroundColor: '#e6001b',
                                        },
                                    }}
                                    >
                                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                                </Button>
                            </Box>
                            <Button
                                size="medium"
                                className='!mt-5'
                                style={{ textTransform: 'none', color: '#ff0336', fontFamily: 'Poppins', fontWeight: 'normal' }}
                            >Esqueci minha senha</Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default InactivitySignIn;
