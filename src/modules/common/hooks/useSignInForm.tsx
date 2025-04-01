import { VariantType } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MutationCreateToken } from '../graphql';
import { CreateTokenResponse } from '../types';
import { GetErrorMessage } from '../utils';
import { useBackendForFrontend } from './useBackendForFrontend';

export const useSignInForm = ({enqueueSnackbar}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {
    localStorage.clear();
    const navigate = useNavigate();
    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [formData, setFormData] = useState({
        origin: 'MANAGEMENT',
        login: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        loginError: '',
        passwordError: '',
    });

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleAccess();
        }
    };

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = '';

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [`${name}Error`]: error,
        }));
    };

    const validateForm = () => {
        let isValid = true;

        setErrors({
            loginError: '',
            passwordError: '',
        });
    
        if (!formData.login.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                loginError: 'Email, Usuário, CPF ou CNPJ é obrigatório.',
            }));
            isValid = false;
        }
    
        if (!formData.password.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordError: 'A senha é obrigatória.',
            }));
            isValid = false;
        }
    
        return isValid;
    };

    const handleAccess = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = {
                    origin: 'MANAGEMENT',
                    login: formData.login,
                    password: formData.password,
                };

                const response: CreateTokenResponse = await request(MutationCreateToken, variables);
                const companyCode = response.createToken.user.profiles[0].companyCode;
                const assignment = response.createToken.user.profiles[0].assignment;

                localStorage.setItem('@iflexfit:token', response.createToken.token);
                localStorage.setItem('@iflexfit:role', response.createToken.user.profiles[0].role);
                localStorage.setItem('@iflexfit:status', response.createToken.user.profiles[0].status);
                localStorage.setItem('@iflexfit:email', response.createToken.user.email);
                localStorage.setItem('@iflexfit:name', response.createToken.user.name);
                localStorage.setItem('@iflexfit:profileCode', response.createToken.user.profileCode);
                localStorage.setItem('@iflexfit:companyCode', companyCode ?? assignment);

                navigate('/gestao');
                enqueueSnackbar('Olá, seja muito bem-vindo!', { variant: 'success' });
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao autenticar. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao autenticar-se. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        isLoading,
        formData,
        errors,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleTextFieldChange,
        handleAccess,
        handleKeyPress,
    };
};
