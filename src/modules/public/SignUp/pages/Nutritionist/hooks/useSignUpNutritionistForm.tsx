import { VariantType } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { CreateAccessResponse } from '../../../../../common/types';
import { FormatAndValidateCodeAndIdentity, FormatName, FormatPhone, GetErrorMessage } from '../../../../../common/utils';
import { MutationCreateAccess } from '../../../components/graphql';
import { CreateAccessProps } from '../../../components/types';
import { CreateAccessVariables, ValidateFormCreateAccess } from '../../../utils';

export const useSignUpNutritionistForm = ({enqueueSnackbar}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateAccessProps['formData']>({
        origin: 'NUT',
        name: '',
        email: '',
        password: '',
        code: '',
        phone: ''
    });

    const [errors, setErrors] = useState<CreateAccessProps['errors']>({
        nameError: '',
        emailError: '',
        passwordError: '',
        codeError: '',
        phoneError: ''
    });

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;
        let error: string;
    
        if (name !== 'email' && value) {
            updatedValue = FormatName(value);
        }
    
        if (name === 'code' && value) {
            const { formatted, isValid } = FormatAndValidateCodeAndIdentity(value);
    
            updatedValue = formatted;
            if (!isValid) {
                error = 'CPF inválido';
            }
        }
    
        if (name === 'phone' && value) {
            updatedValue = FormatPhone(value);
        }
    
        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue,
        }));
    
        setErrors(prevErrors => ({
            ...prevErrors,
            [`${name}Error`]: error,
        }));
    };

    const validateForm = () => {
        let newErrors: CreateAccessProps['errors'] = {};
        newErrors = ValidateFormCreateAccess(formData, activeStep, 'NUT');
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (validateForm()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = CreateAccessVariables(formData);
                const response: CreateAccessResponse = await request(MutationCreateAccess, variables);
                const userData = response.createAccess[0];
                
                navigate('/gestao', { 
                    state: { 
                        user: userData, 
                        email: formData.email, 
                        password: formData.password,
                    } 
                });
                enqueueSnackbar('Cadastro realizado com sucesso!', { variant: 'success' });
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao criar conta. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao criar sua conta. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        setFormData,
        setErrors,
        isLoading,
        formData,
        errors,
        activeStep,
        handleTextFieldChange,
        handleBack,
        handleContinue,
        handleFinish
      };
};
