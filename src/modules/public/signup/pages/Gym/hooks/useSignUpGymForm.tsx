import { VariantType } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import { MutationCreateToken } from '../../../../../common/graphql';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { CreateTokenResponse } from '../../../../../common/types';
import { EmailValidator, FormatName, FormatPhone, GetErrorMessage } from '../../../../../common/utils';
import { MutationCreateAccess } from '../../../components/graphql';
import { CreateAccessProps } from '../../../components/types';
import { CreateAccessVariables, ValidateFormCreateAccess, ValidatePassword } from '../../../utils';

export const useSignUpGymForm = ({enqueueSnackbar}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {
    // localStorage.clear();
    const jwtSecret = import.meta.env.VITE_APP_JWT_SECRET;
    const { request } = useBackendForFrontend(jwtSecret);
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateAccessProps['formData']>({
        origin: 'GYM',
        name: '',
        email: '',
        password: '',
        fantasyName: '',
        phone: ''
    });

    const [errors, setErrors] = useState<CreateAccessProps['errors']>({
        nameError: '',
        emailError: '',
        passwordError: '',
        fantasyNameError: '',
        phoneError: ''
    });

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleContinue();
        }
    };

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;
        let error: string;

        if (name !== 'email' && value) {
            updatedValue = FormatName(value);
        }

        if (name === "email") {
            if (!validator.isEmail(value)) {
                error = "E-mail inválido";
            }
        }

        if (name === "email") {
            error = EmailValidator(value);
        }

        if (name === "password") {
            error = ValidatePassword(value);
        }

        if (name === 'phone' && value) {
            updatedValue = FormatPhone(value);
        }

        // Atualiza o estado com o novo valor do campo
        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [`${name}Error`]: error,
        }));
    };

    const validateForm = () => {
        let newErrors: CreateAccessProps['errors'] = {};
        newErrors = ValidateFormCreateAccess(formData, activeStep, 'GYM');
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
                const variablesCreateAccess = CreateAccessVariables(formData);
                await request(MutationCreateAccess, variablesCreateAccess);
                createToken();
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

    const createToken = async () => {
        try {
            const variablesCreateToken = {
                origin: 'MANAGEMENT',
                login: formData.email,
                password: formData.password,
            };

            const responseCreateToken: CreateTokenResponse = await request(MutationCreateToken, variablesCreateToken);
            const companyCode = responseCreateToken.createToken.user.profiles[0].companyCode;
            const assignment = responseCreateToken.createToken.user.profiles[0].assignment;

            localStorage.setItem('@iflexfit:token', responseCreateToken.createToken.token);
            localStorage.setItem('@iflexfit:role', responseCreateToken.createToken.user.profiles[0].role);
            localStorage.setItem('@iflexfit:status', responseCreateToken.createToken.user.profiles[0].status);
            localStorage.setItem('@iflexfit:email', responseCreateToken.createToken.user.email);
            localStorage.setItem('@iflexfit:name', responseCreateToken.createToken.user.name);
            localStorage.setItem('@iflexfit:profileCode', responseCreateToken.createToken.user.profileCode);
            localStorage.setItem('@iflexfit:companyCode', companyCode ?? assignment);

            navigate('/academia/configuracoes');
        } catch (error: unknown) {
            navigate('/entrar');
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
        handleFinish,
        handleKeyPress
      };
};
