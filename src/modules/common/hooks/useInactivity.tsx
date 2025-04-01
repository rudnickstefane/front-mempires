import { VariantType } from 'notistack';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MutationCreateToken } from '../graphql';
import { CreateTokenResponse } from '../types';
import { GetErrorMessage } from '../utils';
import { useBackendForFrontend } from './useBackendForFrontend';
const INACTIVITY_TIMEOUT = import.meta.env.VITE_APP_INACTIVITY_TIMEOUTL;

export const useInactivity = ({enqueueSnackbar}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const navigate = useNavigate();
    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [inactivityLogIn, setInactivityLogIn] = useState(false);
    const email = localStorage.getItem('@iflexfit:email');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [formData, setFormData] = useState({
        login: email,
        password: '',
    });

    const [errors, setErrors] = useState({
        loginError: '',
        passwordError: '',
    });

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

                setInactivityLogIn(false);
                navigate('/gestao');
                enqueueSnackbar('Olá, seja bem-vindo novamente!', { variant: 'success' });
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

    const clearTimeoutRef = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const startInactivityTimer = useCallback(() => {
        clearTimeoutRef();
        timeoutRef.current = setTimeout(() => {
            localStorage.clear();
            setInactivityLogIn(true);

            setFormData({
                login: email,
                password: ''
            });
        }, INACTIVITY_TIMEOUT);
    }, [email]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                startInactivityTimer();
            } else {
                clearTimeoutRef();
            }
        };

        const handleFocus = () => {
            startInactivityTimer(); // Reinicia o timer quando a janela recebe foco
        };
    
        const handleBlur = () => {
            clearTimeoutRef(); // Pausa o timer quando a janela perde o foco
        };
    
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('mousemove', startInactivityTimer);
        window.addEventListener('keydown', startInactivityTimer);

        startInactivityTimer();

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('mousemove', startInactivityTimer);
            window.removeEventListener('keydown', startInactivityTimer);
            clearTimeoutRef();
        };
    }, [inactivityLogIn, startInactivityTimer]);

    return {
        isLoading,
        formData,
        errors,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleTextFieldChange,
        handleAccess,
        inactivityLogIn
      };
};
