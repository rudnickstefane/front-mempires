import { VariantType } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { MutationAccountRecovery } from '../graphql';
import { GetErrorMessage } from '../utils';
import { useBackendForFrontend } from './useBackendForFrontend';

export const useRecoveryForm = ({enqueueSnackbar}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {
    // localStorage.clear();
    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);

    const [formData, setFormData] = useState({
        origin: 'MANAGEMENT',
        recovery: '',
    });

    const [errors, setErrors] = useState({
        recoveryError: '',
    });

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleRecovery();
        }
    };

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = '';

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
            recoveryError: '',
        });
    
        if (!formData.recovery.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                loginError: 'Email, Usuário, CPF ou CNPJ é obrigatório.',
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
                    recovery: formData.recovery,
                };

                await request(MutationAccountRecovery, variables);

                setEmailSent(true);
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao recuperar acesso. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao enviar instruções para recuperar seu acesso. Tente novamente!'
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
        emailSent,
        handleTextFieldChange,
        handleRecovery,
        handleKeyPress,
    };
};
