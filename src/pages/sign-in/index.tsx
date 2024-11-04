import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControl, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React from 'react';
import { HeaderLight } from '../../components/Header/light';
import { SignInUp } from './styles.d';

function Entrar() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <HeaderLight />
            <SignInUp className='mx-20 mt-7'>
                <div className='w-[500px] rounded-lg p-10 pt-0 shadow-lg bg-white mt-5'>
                    <div className='flex items-center justify-center flex-col border-b-[1px] pb-5'>
                        <h1 className='text-3xl text-[#333333]'>Acesse sua conta da iFlex</h1>
                        <p className='mt-1'>Não tem uma conta? <a href="/cadastro" className='color-primary hover:underline'>Crie agora mesmo</a>.</p>
                    </div>
                    <FormLabel component="legend" className='mt-5 mb-3'>Login</FormLabel>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="E-mail, CNPJ ou CPF"
                        fullWidth
                        maxRows={4}
                    />
                    <FormLabel component="legend" className='mt-5 mb-3'>Senha</FormLabel>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Digite sua senha</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
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
                            }
                            label="Digite sua senha"
                        />
                    </FormControl>
                    <Button size="medium"
                        style={{ textTransform: 'none', color: '#ff0336', fontFamily: 'Poppins', float: 'right', marginTop: '10px', marginBottom: '10px', fontWeight: 'normal' }}
                    >Esqueci minha senha</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ backgroundColor: '#ff0336', color: 'white', fontFamily: 'Poppins', height: '3rem' }}
                    >
                        Entrar
                    </Button>
                </div>
            </SignInUp>
        </>
    );
}

export default Entrar;
