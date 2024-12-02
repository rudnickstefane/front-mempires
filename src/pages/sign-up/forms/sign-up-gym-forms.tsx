import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, AlertTitle, Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { PiCheckCircleLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { registerAcademy } from '../../../services/graphql/sign-up-gym.graphql';
import { formatPhoneNumber } from '../../../utils/format-phone';
import {
    validateCompanyPhone,
    validateEmail,
    validateFantasyName,
    ValidateName,
    validatePasswordField
} from '../../../utils/validate-sign-up';
import { SignUpGymErrors } from '../types/sign-up-gym-errors.types';

export function SignUpGymForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<SignUpGymErrors>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        fantasyName: '',
        companyPhone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'companyPhone' ? formatPhoneNumber(value) : value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleRefresh = () => {
        navigate(0);
    };

    const handleContinue = () => {
        const newErrors = {
            name: ValidateName(formData.name),
            email: validateEmail(formData.email),
            password: '',
            fantasyName: '',
            companyPhone: '',
        };

        setErrors(newErrors);

        if (!newErrors.name && !newErrors.email) {
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleRegister = async () => {
        const newErrors = {
            name: '',
            email: '',
            password: validatePasswordField(formData.password),
            fantasyName: validateFantasyName(formData.fantasyName),
            companyPhone: validateCompanyPhone(formData.companyPhone)
        };

        setErrors(newErrors);

        if (!newErrors.fantasyName && !newErrors.companyPhone && !newErrors.password) {
            try {
                const result = await registerAcademy(formData);

                if (result.status) {
                    setStep(3);
                } else {
                    setErrors({
                        ...errors,
                        general: result.message,
                    });
                }
            } catch (err) {
                setErrors({
                    ...errors,
                    general: 'Erro ao cadastrar a academia. Tente novamente.',
                });
            }
        }
    };

    if (step === 1) {
        return (
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-3xl text-[#333333]'>Experimente 15 dias <span className='color-primary'>grátis</span></h1>
                <p className='mt-5 w-[60%] text-center'>Cadastre sua academia no maior portal de gestão fitness e aproveite benefícios exclusivos.</p>
                <div className='w-[500px] rounded-lg p-10 pt-0 shadow-lg bg-white mt-5'>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleRefresh}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                                color: '#ff0336',
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <div className='items-center justify-center flex flex-col'>
                        <TextField
                            fullWidth
                            label="Nome Completo"
                            variant="outlined"
                            margin="normal"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            fullWidth
                            label="E-mail"
                            type='email'
                            variant="outlined"
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <p className='text-center text-[14px] my-2'>Ao continuar, você estará aceitando os <a href='/termos' className='color-primary hover:underline'>Termos de Uso</a> e a <a href='/privacidade' className='color-primary hover:underline'>Política de Privacidade</a> da iFlex.</p>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: '#ff0336', color: 'white', fontFamily: 'Poppins', height: '3rem', marginTop: '15px', fontWeight: 'normal' }}
                            onClick={handleContinue}
                        >
                            Continuar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-3xl text-[#333333]'>Seu cadastro está quase pronto.</h1>
                <p className='mt-5 text-center'>Preencha as informações abaixo para completar o cadastro.</p>
                <div className='w-[500px] rounded-lg p-10 pt-0 shadow-lg bg-white mt-5'>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleBack}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                                color: '#ff0336',
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <div className='items-center justify-center flex flex-col'>
                        <TextField
                            fullWidth
                            label="Nome da Academia"
                            variant="outlined"
                            margin="normal"
                            name="fantasyName"
                            value={formData.fantasyName}
                            onChange={handleChange}
                            error={!!errors.fantasyName}
                            helperText={errors.fantasyName}
                        />
                        <TextField
                            fullWidth
                            label="Telefone"
                            variant="outlined"
                            margin="normal"
                            name="companyPhone"
                            value={formData.companyPhone}
                            onChange={handleChange}
                            error={!!errors.companyPhone}
                            helperText={errors.companyPhone}
                        />
                        <TextField
                            fullWidth
                            label="Senha de Acesso ao Sistema"
                            type='password'
                            variant="outlined"
                            margin="normal"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        {errors.general && <Alert severity="error" className='mt-2'>
                            <AlertTitle>Oops!</AlertTitle>
                            {errors.general}
                        </Alert>}
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: '#ff0336', color: 'white', fontFamily: 'Poppins', height: '3rem', marginTop: '15px' }}
                            onClick={handleRegister}
                        >
                            Concluir
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 3) {
        return (
            <Box className='flex flex-col items-center justify-center mt-10'>
                <PiCheckCircleLight className='color-primary text-[5rem]' />
                <Box className='my-5 text-3xl text-[#333333]'>Sua academia foi cadastrada com sucesso!</Box>
                <Typography className='!mt-5 w-[20rem] text-center'>Clique no botão abaixo para iniciar as principais configurações.</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: '#ff0336', color: 'white', fontFamily: 'Poppins', height: '3rem', marginTop: '15px' }}
                    onClick={() => navigate('/academia/configuracoes')}
                >
                    Iniciar Configurações
                </Button>
            </Box>
        );
    }
}