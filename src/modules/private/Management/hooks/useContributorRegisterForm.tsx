import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { APIS } from '../../../common/configs/apis.config';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindGroupsResponse } from '../../../common/types';
import { OptionSelect } from '../../../common/ui/types';
import { CalculateAge, ContributorsUpsertVariables, FormatAndValidateCNPJ, FormatAndValidateCPF, FormatAndValidateRG, FormatName, FormatPhone, FormatZipCode, GetErrorMessage, ValidateFormRegisterContributor, ValidatePassport } from '../../../common/utils';
import { ReviewsProps } from '../components/Drawer/types';
import { QueryFindGroups } from '../components/Graphql';
import { MutationContributorUpsert } from '../components/Graphql/MutationContributorUpsert';

export const useContributorRegisterForm = ({
    closeDrawer,
    enqueueSnackbar,
    refresh,
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [isNoNumber, setIsNoNumber] = useState(false);
    const [isNoEmail, setIsNoEmail] = useState(false);
    const [isResponsible, setIsResponsible] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isMinor, setIsMinor] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [isFinishDisabled, setIsFinishDisabled] = useState(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responseGroupsOptions, setResponseGroupsOptions] = useState<Array<{ value: string; label: string; isDisabled?: boolean }>>([]);
    const [isNoConfigGroups, setIsConfigGroups] = useState(false);
    const calledRef = useRef(false);

    const [focusedFields, setFocusedFields] = useState<{
        gender: boolean;
        stateMarital: boolean;
        groupCode: boolean;
        modalities: boolean;
        position: boolean;
    }>({
        gender: false,
        stateMarital: false,
        groupCode: false,
        modalities: false,
        position: false,
    });

    const handleFocus = (field: 'position' | 'gender' | 'stateMarital' | 'groupCode' | 'modalities', value: boolean) => {
    setFocusedFields((prev) => ({ ...prev, [field]: value }));
    };

    const genderOptions = [
        { value: 'noSelect', label: 'Selecione um gênero', isDisabled: true },
        { value: 'WOMAN', label: 'Feminino' },
        { value: 'MAN', label: 'Masculino' },
        { value: 'OTHERS', label: 'Outros' }
    ];

    const stateMaritalOptions = [
        { value: 'noSelect', label: 'Selecione o estado civil', isDisabled: true },
        { value: 'MARRIED', label: 'Casado' },
        { value: 'SINGLE', label: 'Solteiro' },
        { value: 'OTHERS', label: 'Outros' }
    ];

    const positionOptions = [
        { value: 'noSelect', label: 'Selecione o cargo', isDisabled: true },
        { value: 'MANAGER', label: 'Gerente' },
        { value: 'COORDINATOR', label: 'Coordenador' },
        { value: 'INSTRUCTOR', label: 'Instrutor' },
        { value: 'PERSONAL_TRAINER', label: 'Personal Trainer' },
        { value: 'RECEPTIONIST', label: 'Recepcionista' },
        { value: 'CLEANING_STAFF', label: 'Equipe de limpeza' },
        { value: 'MAINTENANCE', label: 'Manutenção' },
        { value: 'SALES', label: 'Vendas' },
        { value: 'NUTRITIONIST', label: 'Nutricionista' },
        { value: 'PHYSIOTHERAPIST', label: 'Fisioterapeuta' },
        { value: 'INTERN', label: 'Estagiário' },
        { value: 'SECURITY', label: 'Segurança' },
        { value: 'ACCOUNTANT', label: 'Contador' },
        { value: 'MARKETING', label: 'Marketing' },
        { value: 'HR', label: 'Recursos Humanos' },
        { value: 'IT_SUPPORT', label: 'Suporte de TI' },
    ];

    const [formData, setFormData] = useState<ReviewsProps['formData']>({
        origin: 'GYM',
        type: 'CREATE',
        status: 'ACTIVE',
        assignment: companyCode,
        name: '',
        birthDate: '',
        identity: '',
        gender: '',
        stateMarital: '',
        address: '',
        number: '',
        complement: '',
        zipCode: '',
        district: '',
        city: '',
        state: '',
        email: '',
        emailStatus: 'PENDING',
        typeContact: 'MAIN',
        description: 'Principal',
        position: '',
        phone: '',
        emergencyContact: '',
        emergencyPhone: '',
        responsible: '',
        groupCode: '',
    });

    const [errors, setErrors] = useState<ReviewsProps['errors']>({
        nameError: '',
        birthDateError: '',
        codeError: '',
        identityError: '',
        genderError: '',
        stateMaritalError: '',
        addressError: '',
        numberError: '',
        complementError: '',
        zipCodeError: '',
        districtError: '',
        cityError: '',
        stateError: '',
        emailError: '',
        descriptionError: '',
        phoneError: '',
        emergencyContactError: '',
        emergencyPhoneError: '',
        responsibleError: '',
        positionError: '',
    });

    const dynamicSteps = isMinor
        ? ['Informações', 'Endereço', 'Contato', 'Responsável'] // Inclui "Responsável" para menores de 18 anos
        : ['Informações', 'Endereço', 'Contato'];

    const handleTextFieldChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name !== 'email' && value) {
            updatedValue = FormatName(value);
        }

        if ((name === 'phone' || name === 'emergencyPhone') && value) {
            updatedValue = FormatPhone(value);
        }

        if (name === 'birthDate' && value) {
            const age = CalculateAge(value);
            if (age < 18) {
                setIsMinor(true);
            } else {
                setIsMinor(false);
            }
        }

        if (name === 'zipCode' && value) {
            updatedValue = FormatZipCode(value);

            setErrors(prevErrors => ({
                ...prevErrors,
                zipCodeError: ''
            }));
        }

        if (name === 'zipCode' && updatedValue.length === 9) {
            axios.get(`${APIS.zipCode}/${updatedValue}/json/`)
                .then(response => {
                    if (response.data.erro) {
                        const { localidade, uf } = response.data;
                        setFormData(prevState => ({
                            ...prevState,
                            city: localidade || '',
                            state: uf || '',
                        }));

                        setErrors(prevErrors => ({
                            ...prevErrors,
                            zipCodeError: 'CEP não encontrado.',
                        }));
                    } else {
                        const { logradouro, bairro, localidade, uf } = response.data;
                        setFormData(prevState => ({
                            ...prevState,
                            address: logradouro || '',
                            district: bairro || '',
                            city: localidade || '',
                            state: uf || '',
                        }));
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            cityError: '',
                            stateError: '',
                        }));
                    }
                })
                .catch(() => {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        zipCodeError: 'Erro ao buscar o CEP',
                    }));
                });
        }

        if (name === 'responsible' && value) {
            if (updatedValue.trim().length > 1) {
                setIsFinishDisabled(false);
            } else {
                setIsFinishDisabled(true);
            }
        }

        if (name === 'identity' && value) {
            // Remove espaços desnecessários no início ou no final
            const trimmedValue = value.trim();
        
            // Remove todos os caracteres não numéricos para validações numéricas
            const numericValue = trimmedValue.replace(/\D/g, '');
        
            // Verifica se contém caracteres alfabéticos
            const containsLetters = /[A-Za-z]/.test(trimmedValue);
        
            // Cenário 1: Validação mínima de 6 caracteres (alfanumérico ou numérico)
            if (trimmedValue.length < 6) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: trimmedValue // Mantém o valor original
                }));
        
                setErrors(prevErrors => ({
                    ...prevErrors,
                    identityError: 'Documento inválido' // Documento curto demais
                }));
        
                return; // Interrompe processamento adicional
            }
        
            // Cenário 2: Formatação e validação apenas para números
            let formatted = trimmedValue; // Valor inicial (não formatado)
            let isValid = false; // Flag de validação
        
            if (!containsLetters) {
                // Apenas números: decidir tipo de documento
                if (numericValue.length === 11) {
                    // CPF
                    ({ formatted, isValid } = FormatAndValidateCPF(numericValue));
                } else if (numericValue.length === 14) {
                    // CNPJ
                    ({ formatted, isValid } = FormatAndValidateCNPJ(numericValue));
                } else if (numericValue.length === 9) {
                    // RG
                    ({ formatted, isValid } = FormatAndValidateRG(numericValue));
                }
            } else {
                // Cenário 3: Validação de passaporte
                const startsWithTwoLetters = /^[A-Za-z]{2}/.test(trimmedValue);
                if (startsWithTwoLetters && trimmedValue.length === 8) {
                    const { formatted: passFormatted, isValid: passIsValid } = ValidatePassport(trimmedValue);
                    formatted = passFormatted;
                    isValid = passIsValid;
                } else {
                    // Cenário 4: Documento alfanumérico desconhecido (não formatado)
                    isValid = trimmedValue.length >= 6; // Apenas valida comprimento
                }
            }
        
            // Atualiza o estado com o valor formatado ou mantido
            setFormData(prevState => ({
                ...prevState,
                [name]: formatted // Valor final
            }));
        
            // Atualiza mensagens de erro
            setErrors(prevErrors => ({
                ...prevErrors,
                identityError: isValid ? '' : 'Documento inválido'
            }));
        
            return; // Finaliza processamento
        }

        // Atualiza o estado com o novo valor do campo
        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));

        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    const handleSelectChange = (
        newValue: SingleValue<OptionSelect> | MultiValue<OptionSelect>,
        fieldName: string
    ) => {
        let selectedValues: string | string[];
        if (Array.isArray(newValue)) {
          // Caso o valor seja múltiplo (não se aplica aqui, mas para garantir flexibilidade em outros campos)
            selectedValues = newValue.map(option => option.value);
        } else if (newValue && 'value' in newValue) {
          // Para valores únicos
            selectedValues = newValue.value;
        } else {
          // Limpa o campo caso não haja valor
            selectedValues = '';
        }

        setFormData(prevState => ({
            ...prevState,
            [fieldName]: selectedValues as string
        }));

        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${fieldName}Error`];
            return errors;
        }); 
    };

    const handleNoNumberToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsNoNumber(checked);
    
        if (checked) {
            setFormData(prevFormData => ({
                ...prevFormData,
                number: 'S/N'
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                number: ''
            }));
        }
    };

    const handleNoEmailToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsNoEmail(checked);
    
        if (checked) {
            setFormData(prevFormData => ({
                ...prevFormData,
                email: 'S/E'
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                email: ''
            }));
        }
    };

    const handleIsResponsibleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsResponsible(checked);
    
        if (checked) {
            setIsFinishDisabled(false);
            setFormData(prevFormData => ({
                ...prevFormData,
                responsible: 'Autodeclaro'
            }));
        } else {
            setIsFinishDisabled(true);
            setFormData(prevFormData => ({
                ...prevFormData,
                responsible: ''
            }));
        }
    };

    const validateForm = () => {
        const nextStep = dynamicSteps[activeStep + 1];
        if (nextStep === 'Responsável') {
            setIsFinishDisabled(true);
        } else {
            setIsFinishDisabled(false);
        }
        
        let newErrors: ReviewsProps['errors'] = {};
        newErrors = ValidateFormRegisterContributor(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (validateForm()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleCloseModal = () => {
        setIsConfigGroups(false);
        closeDrawer();
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = ContributorsUpsertVariables(formData);
                await request(MutationContributorUpsert, variables);
                enqueueSnackbar('Colaborador cadastrado com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao cadastrar colaborador. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao cadastrar colaborador. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const findGroups = useCallback(async () => {
        try {
            const response: FindGroupsResponse = await request(QueryFindGroups, { companyCode: companyCode });

            const groups = response.findGroups
                .map(group => ({
                    value: group.groupCode,
                    label: group.name,
                }))
                .filter(group => group.value && group.label);

            const hasNoGroups = groups.length === 0;

            setIsConfigGroups(hasNoGroups);

            setResponseGroupsOptions([
                { value: 'noSelect', label: 'Selecione um grupo de acesso', isDisabled: true },
                ...groups,
            ]);
        } catch (error) {
            closeDrawer();
            
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar grupos de acesso. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Erro ao buscar grupos de acesso cadastrados em sua academia.', { variant: 'error' });
        }
    }, [attemptCount, closeDrawer, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findGroups();
            };

            fetchData();
        }
    }, [findGroups]);

    return {
        isLoading,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        isNoNumber,
        isNoEmail,
        isResponsible,
        genderOptions,
        stateMaritalOptions,
        focusedFields,
        isFinishDisabled,
        handleFocus,
        handleTextFieldChange,
        handleSelectChange,
        handleNoNumberToggle,
        handleNoEmailToggle,
        handleIsResponsibleToggle,
        handleBack,
        handleContinue,
        handleFinish,
        positionOptions,
        isNoConfigGroups,
        handleCloseModal,
        responseGroupsOptions
    };
};
