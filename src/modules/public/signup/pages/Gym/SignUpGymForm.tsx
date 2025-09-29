import { Box, Button, CircularProgress, Divider, FormControl, TextField, Typography } from '@mui/material';
import { MdCheckCircle } from 'react-icons/md';
import { SignUpProps } from '../../../../common/types';
import { useSignUpGymForm } from './hooks';

export const SignUpGymForm = ({
    enqueueSnackbar
  }: SignUpProps) => {

    const {
        isLoading,
        formData,
        errors,
        activeStep,
        handleTextFieldChange,
        handleBack,
        handleContinue,
        handleFinish,
        handleKeyPress,
    } = useSignUpGymForm({ enqueueSnackbar });

    return (
        <>
            {(() => {
                switch (activeStep) {
                case 0:
                    return (
                        <>
                            <Box className='w-[500px] rounded-lg p-10 shadow-lg bg-white items-center flex flex-col'>
                                <Box className='flex flex-col justify-center items-center'>
                                    <Typography className='!text-3xl !text-[#333333]'>Academia</Typography>
                                    <Typography className='!mt-5 text-center'>Descubra todas as vantagens e benefícios exclusivos que preparamos para você!</Typography>
                                    <Divider className='!my-5 w-full' />
                                    <Box className='items-center justify-center flex flex-col w-full'>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                label="Nome Completo"
                                                variant="outlined"
                                                margin="normal"
                                                name='name'
                                                value={formData.name}
                                                onChange={handleTextFieldChange}
                                                error={!!errors.nameError}
                                                helperText={errors.nameError}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                label="E-mail"
                                                type='email'
                                                onKeyDown={handleKeyPress}
                                                variant="outlined"
                                                margin="normal"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleTextFieldChange}
                                                error={!!errors.emailError}
                                                helperText={errors.emailError}
                                            />
                                        </FormControl>
                                        <p className='text-center text-[14px] my-2'>Ao continuar, você estará aceitando os <a href='/termos' className='color-primary hover:underline'>Termos de Uso</a> e a <a href='/privacidade' className='color-primary hover:underline'>Política de Privacidade</a> da iFlex.</p>
                                        <Box className='flex flex-row justify-between mt-5 w-full'>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                href="/cadastro"
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
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleContinue}
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
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    );

                case 1:
                    return (
                        <>
                            <Box className='w-[500px] rounded-lg p-10 shadow-lg bg-white items-center flex flex-col'>
                                <Box className='flex flex-col justify-center items-center w-full'>
                                    <Typography className='!text-3xl !text-[#333333]'>Experimente 15 dias <span className='color-primary'>grátis</span></Typography>
                                    <Typography className='!mt-5 text-center'>Quase lá! Preencha os dados abaixo.</Typography>
                                    <Divider className='!my-5 w-full' />
                                    <Box className='items-center justify-center flex flex-col w-full'>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                label="Nome da Academia, Studio, Clube ou outro"
                                                variant="outlined"
                                                margin="normal"
                                                name="fantasyName"
                                                value={formData.fantasyName}
                                                onChange={handleTextFieldChange}
                                                error={!!errors.fantasyNameError}
                                                helperText={errors.fantasyNameError}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                label="Telefone"
                                                variant="outlined"
                                                margin="normal"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleTextFieldChange}
                                                error={!!errors.phoneError}
                                                helperText={errors.phoneError}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Senha de Acesso"
                                                type='password'
                                                variant="outlined"
                                                margin="normal"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleTextFieldChange}
                                                error={!!errors.passwordError}
                                                helperText={errors.passwordError}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box className='flex flex-row justify-between mt-5 w-full'>
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
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    );

                default:
                    return null;
                }
            })()}
        </>
      )
}