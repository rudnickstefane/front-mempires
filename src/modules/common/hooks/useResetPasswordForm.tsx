import { VariantType } from 'notistack';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ValidatePassword } from '../../public/SignUp/utils';
import { MutationCheckCredentials, MutationResetPassword } from '../graphql';
import { GetErrorMessage } from '../utils';
import { useBackendForFrontend } from './useBackendForFrontend';

export const useResetPasswordForm = ({enqueueSnackbar}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {
    localStorage.clear();
    const navigate = useNavigate();
    const calledRef = useRef(false);
    const { uuid, token } = useParams()
    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setConfirmShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [formData, setFormData] = useState({
        origin: 'MANAGEMENT',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        passwordError: '',
        confirmPasswordError: '',
    });

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleRecovery();
        }
    };

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = '';

        if (name === "password") {
            error = ValidatePassword(value);
        }

        if (name === "confirmPassword" && value !== formData.password) {
            error = 'As senhas não coincidem.';
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value.trim(),
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [`${name}Error`]: error,
        }));
    };

    const validateForm = () => {
        let isValid = true;

        setErrors({
            passwordError: '',
            confirmPasswordError: '',
        });
    
        if (!formData.password.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordError: 'A nova senha é obrigatória.',
            }));
            isValid = false;
        }

        if (!formData.confirmPassword.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPasswordError: 'A confirmação da senha é obrigatória.',
            }));
            isValid = false;
        }

        if (formData.confirmPassword !== formData.password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPasswordError: 'As senhas não coincidem.',
            }));
            isValid = false;
        }
    
        return isValid;
    };

    const handleRecovery = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = {
                    origin: 'MANAGEMENT',
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    uuid: uuid,
                    token: token,
                };

                await request(MutationResetPassword, variables);

                navigate('/entrar');
                enqueueSnackbar('Acesso recuperado com sucesso!', { variant: 'success' });
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao recuperar acesso. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao recuperar seu acesso. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const checkCredentials = async () => {
                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                const tokenRegex = /^[a-f0-9]{64}$/i;

                if (!uuid || !uuidRegex.test(uuid) || !token || !tokenRegex.test(token)) {
                    navigate('/entrar');
                }

                try {
                    const variables = {
                        validation: 'RESET_PASSWORD',
                        uuid: uuid,
                        token: token,
                    };

                    await request(MutationCheckCredentials, variables);
                } catch (error: unknown) {
                    navigate('/entrar');
                    setAttemptCount(prevCount => prevCount + 1);
                    if (attemptCount >= 5) {
                        return enqueueSnackbar('Erro ao validar link de recuperação. Entre em contato com nosso suporte.', { variant: 'error' });
                    }

                    const genericError = 'Ops! Algo deu errado ao validar o link de recuperação. Tente novamente!'
                    const errorMessage = GetErrorMessage(error, genericError);
                    enqueueSnackbar(errorMessage, { variant: 'error' });
                }
            }

            checkCredentials();
        }
    }, [uuid, token, navigate, request, attemptCount, enqueueSnackbar]);

    return {
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
        handleKeyPress,
    };
};
