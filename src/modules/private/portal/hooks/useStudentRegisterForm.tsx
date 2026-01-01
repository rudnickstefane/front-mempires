import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { APIS } from '../../../common/configs/apis.config';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindPlansResponse } from '../../../common/types';
import { OptionSelect } from '../../../common/ui/types';
import { CalculateAge, FormatAndValidateCNPJ, FormatAndValidateCPF, FormatAndValidateRG, FormatName, FormatPhone, FormatText, FormatZipCode, GetErrorMessage, StudentUpsertVariables, ValidateFormRegisterStudent, ValidatePassport } from '../../../common/utils';
import { StudentRegisterProps } from '../components/Drawer/types';
import { MutationStudentUpsert, QueryFindPlans } from '../components/Graphql';
import { QueryFindStudent } from '../pages/Gym/graphql';
import { FindStudentResponse } from '../pages/Gym/types';

export const useStudentRegisterForm = ({
    closeDrawer,
    enqueueSnackbar,
    refresh,
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [isNoNumber, setIsNoNumber] = useState(false);
    const [isNoConfigPlans, setIsConfigPlans] = useState(false);
    const [isNoEmail, setIsNoEmail] = useState(false);
    const [charactersRemaining, setCharactersRemaining] = useState(300);
    const [isResponsible, setIsResponsible] = useState(false);
    const [isFinanceResponsible, setIsFinanceResponsible] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isMinor, setIsMinor] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [responseFinanceResponsible, setResponseFinanceResponsible] = useState<FindStudentResponse | null>();
    const [isFinishDisabled, setIsFinishDisabled] = useState(false);
    const [isIndication, setIsIndication] = useState(false);
    const [referralSelected, setReferralSelected] = useState<string>();
    const [responseStudent, setResponseStudent] = useState<FindStudentResponse | null>();
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responsePlansOptions, setResponsePlansOptions] = useState<Array<{ value: string; label: string; isDisabled?: boolean }>>([]);
    const calledRef = useRef(false);

    const [focusedFields, setFocusedFields] = useState<{
        gender: boolean;
        stateMarital: boolean;
        periodicityCode: boolean;
        modalities: boolean;
        referralSource: boolean;
    }>({
        gender: false,
        stateMarital: false,
        periodicityCode: false,
        modalities: false,
        referralSource: false,
    });

    const handleFocus = (field: 'referralSource' | 'gender' | 'stateMarital' | 'periodicityCode' | 'modalities', value: boolean) => {
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

    const referralSourceOptions = [
        { value: 'noSelect', label: 'Selecione como nos conheceu', isDisabled: true },
        { value: 'billboard', label: 'Outdoor' },
        { value: 'call', label: 'Ligação' },
        { value: 'email', label: 'E-mail Marketing' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'flyer', label: 'Panfleto' },
        { value: 'friend', label: 'Indicação de amigo' },
        { value: 'google', label: 'Google' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'student', label: 'Indicação de aluno ou colaborador' },
        { value: 'website', label: 'Site' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'others', label: 'Outros' },
    ];

    const [formData, setFormData] = useState<StudentRegisterProps['formData']>({
        origin: 'GYM',
        type: 'CREATE',
        status: 'ACTIVE',
        assignment: companyCode,
        name: '',
        birthDate: '',
        identity: '',
        gender: null,
        stateMarital: null,
        profession: '',
        company: '',
        address: '',
        number: '',
        complement: '',
        zipCode: '',
        district: '',
        city: '',
        state: '',
        periodicityCode: '',
        paymentDay: '',
        modalities: [],
        statusModality: '',
        detailsPlan: '',
        email: '',
        emailStatus: 'PENDING',
        typeContact: 'MAIN',
        description: null,
        referralSource: '',
        phone: '',
        emergencyContact: '',
        emergencyPhone: '',
        responsible: '',
        financeResponsible: '',
        indicationSearch: '',
    });

    const [errors, setErrors] = useState<StudentRegisterProps['errors']>({
        nameError: '',
        birthDateError: '',
        codeError: '',
        identityError: '',
        genderError: '',
        stateMaritalError: '',
        professionError: '',
        companyError: '',
        addressError: '',
        numberError: '',
        complementError: '',
        zipCodeError: '',
        districtError: '',
        cityError: '',
        stateError: '',
        periodicityCodeError: '',
        paymentDayError: '',
        modalitiesError: '',
        statusModalityError: '',
        detailsPlanError: '',
        emailError: '',
        descriptionError: '',
        phoneError: '',
        emergencyContactError: '',
        emergencyPhoneError: '',
        responsibleError: '',
        financeResponsibleError: '',
        indicationSearchError: '',
    });

    const dynamicSteps = isMinor
        ? ['Informações', 'Endereço', 'Plano', 'Contato', 'Responsável'] // Inclui "Responsável" para menores de 18 anos
        : ['Informações', 'Endereço', 'Plano', 'Contato'];

    const handleTextFieldChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name !== 'email' && value) {
            updatedValue = FormatName(value);
        }

        if ((name === 'phone' || name === 'emergencyPhone') && value) {
            updatedValue = FormatPhone(value);
        }

        if (name === 'detailsPlan' && value.length <= 300) {
            updatedValue = FormatText(value);

            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
            setCharactersRemaining(300 - value.length);
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

        // Lógica para formatação e validação do CPF e CNPJ
        if (name === 'financeResponsible' && value) {
            const trimmedValue = value.trim();
            const identity = trimmedValue.replace(/\D/g, '');
            const { formatted, isValid } = FormatAndValidateCPF(value);
            
            // Atualiza o valor no estado com a formatação do documento
            setFormData(prevState => ({
                ...prevState,
                [name]: formatted // Atualiza o campo com o valor formatado
            }));
    
            setResponseFinanceResponsible(null);
            setIsFinishDisabled(true);
            setErrors(prevErrors => ({
                ...prevErrors,
                financeResponsibleError: isValid ? '' : 'CPF inválido',
                searchFinanceResponsibleError: ''
            }));

            if ((Number(identity.length) === 11 && isValid)) {
                setIsLoading(true);
                try {
                    const response: FindStudentResponse = await request(QueryFindStudent, { companyCode: companyCode, search: identity });
                    setResponseFinanceResponsible(response);
                    setIsFinishDisabled(false);
                } catch (error: unknown) {
                    setAttemptCount(prevCount => prevCount + 1);
                    if (attemptCount >= 5) {
                        return enqueueSnackbar('Erro ao localizar responsável financeiro. Entre em contato com nosso suporte.', { variant: 'error' });
                    }
        
                    setResponseFinanceResponsible(null);
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        searchFinanceResponsibleError: 'Cadastro não encontrado.',
                    }));
        
                    setIsFinishDisabled(true);
        
                    const genericError = 'Ops! Algo deu errado ao localizar o responsável financeiro. Tente novamente!'
                    const errorMessage = GetErrorMessage(error, genericError);
                    enqueueSnackbar(errorMessage, { variant: 'error' });
                } finally {
                    setIsLoading(false);
                }
            }
            
            return;
        }

        // Lógica para formatação e validação do CPF e CNPJ
        if (name === 'indicationSearch' && value) {
            // Remove todos os caracteres não numéricos para validações numéricas
            const numericValue = value.replace(/\D/g, '');
        
            // Verifica se contém caracteres alfabéticos
            const containsLetters = /[A-Za-z]/.test(value);
        
            // Cenário 1: Validação mínima de 6 caracteres (alfanumérico ou numérico)
            if (value.length < 2) {
                setResponseStudent(null);

                setErrors(prevErrors => ({
                    ...prevErrors,
                    searchFindStudentError: '',
                }));

                setFormData(prevState => ({
                    ...prevState,
                    [name]: value // Mantém o valor original
                }));
        
                return; // Interrompe processamento adicional
            }
        
            // Cenário 2: Formatação e validação apenas para números
            let formatted = value; // Valor inicial (não formatado)
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
                isValid = value.length >= 2; // Apenas valida comprimento
            }
        
            // Atualiza o estado com o valor formatado ou mantido
            setFormData(prevState => ({
                ...prevState,
                [name]: formatted // Valor final
            }));
        
            // Atualiza mensagens de erro
            setErrors(prevErrors => ({
                ...prevErrors,
                indicationSearchError: isValid ? '' : 'Documento inválido'
            }));

            handleSearchChange(value, isValid);

            return;
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

    function useDebounce(callback: (value: string, isValid: boolean) => void, delay: number) {
        const timeoutRef = useRef<NodeJS.Timeout | null>(null);

        return (value: string, isValid: boolean) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(value, isValid);
            }, delay);
        };
    }

    const handleSearchChange = useDebounce(async (value: string, isValid: boolean) => {
        if (value.length === 2) {
            setResponseStudent(null);
            return;
        }

        if (!isValid) {
            setErrors(prevErrors => ({
                ...prevErrors,
                searchFindStudentError: '',
            }));
            return;
        }

        try {
            const response: FindStudentResponse = await request(QueryFindStudent, { companyCode: companyCode, search: value });
            setResponseStudent(response);
        } catch (error: unknown) {
            setResponseStudent(null);
            setErrors(prevErrors => ({
                ...prevErrors,
                searchFindStudentError: 'Aluno não encontrado.',
            }));

            const genericError = 'Ops! Algo deu errado ao localizar aluno. Tente novamente!';
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    }, 650);

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

        if (
            selectedValues === 'billboard' ||
            selectedValues === 'call' ||
            selectedValues === 'email' ||
            selectedValues === 'facebook' ||
            selectedValues === 'flyer' ||
            selectedValues === 'friend' ||
            selectedValues === 'google' ||
            selectedValues === 'instagram' ||
            selectedValues === 'website' ||
            selectedValues === 'whatsapp' ||
            selectedValues === 'others'
        ) {
            setReferralSelected('');
            setResponseStudent(null);
            setIsIndication(false);
            formData.indicationSearch = '';
            setFormData(prevState => ({
                ...prevState,
                [fieldName]: selectedValues,
            }));
        }

        if (selectedValues === 'student') {
            setReferralSelected('student');
            setIsIndication(true);
            setFormData(prevState => ({
                ...prevState,
                [fieldName]: selectedValues,  // Atualiza o estado com 'student'
            }));
        }

        setFormData(prevState => ({
            ...prevState,
          [fieldName]: selectedValues  // Atualiza o estado com o valor único
        }));

        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
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
            setFormData(prevFormData => ({
                ...prevFormData,
                responsible: 'Autodeclaro'
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                responsible: ''
            }));
        }
    };

    const handleFinanceResponsibleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsFinanceResponsible(checked);
        setIsFinishDisabled(true);
    
        if (checked) {
            setIsFinishDisabled(false);
            setResponseFinanceResponsible(null);
            setFormData(prevFormData => ({
                ...prevFormData,
                financeResponsible: 'Autodeclaro',
            }));

            setErrors(prevErrors => ({
                ...prevErrors,
                financeResponsibleError: '',
                searchFinanceResponsibleError: '',
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                financeResponsible: '',
            }));

            setErrors(prevErrors => ({
                ...prevErrors,
                financeResponsibleError: '',
                searchFinanceResponsibleError: ''
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

        const indicationCode = responseStudent?.findStudent.profileCode;
        
        let newErrors: StudentRegisterProps['errors'] = {};
        newErrors = ValidateFormRegisterStudent(formData, activeStep, indicationCode, isIndication);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (validateForm()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleCloseModal = () => {
        setIsConfigPlans(false);
        closeDrawer();
    };

    const findPlans = useCallback(async () => {
        try {
            const response: FindPlansResponse = await request(QueryFindPlans, { companyCode: companyCode });

            const plans = response.findPlans
                .flatMap(plan =>
                    plan.periodicities.map(periodicity => {
                    // Ajusta o texto do label dependendo do nome da periodicidade
                    const periodicityName = periodicity.name.includes('meses')
                        ? `Pagamento a cada ${periodicity.name.replace('meses', '').trim()} meses`
                        : `Pagamento ${periodicity.name}`;

                    return {
                        value: periodicity.periodicityCode,
                        label: `${plan.name} - ${periodicityName}`,
                    };
                    })
                )
                .filter(plan => plan.value && plan.label);

            // Verifica se há algum plano
            const hasNoPlans = plans.length === 0;

            setIsConfigPlans(hasNoPlans);

            setResponsePlansOptions([
                { value: 'noSelect', label: 'Selecione um plano', isDisabled: true },
                ...plans,
            ]);
        } catch (error) {
            closeDrawer();
            
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar planos. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Erro ao buscar planos cadastrados em sua academia.', { variant: 'error' });
        }
    }, [attemptCount, closeDrawer, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findPlans();
            };

            fetchData();
        }
    }, [findPlans]);

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const [selectedPaymentValue, setSelectedPaymentDayValue] = useState(formData.paymentDay ? 'programmed' : 'today');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setSelectedPaymentDayValue(value);

        setFormData((prevState) => {
            return {
            ...prevState,
            paymentDay: '', // Atualiza o estado
            };
        });

        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const financeResponsibleCode = responseFinanceResponsible?.findStudent.profileCode;
                const indicationCode = responseStudent?.findStudent.profileCode;
                const variables = StudentUpsertVariables(formData, financeResponsibleCode, indicationCode);
                await request(MutationStudentUpsert, variables);
                enqueueSnackbar('Cadastro do aluno realizado com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao matricular o aluno. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao matricular o aluno. Tente novamente!'
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
        isNoConfigPlans,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        isNoNumber,
        isNoEmail,
        isResponsible,
        isFinanceResponsible,
        genderOptions,
        stateMaritalOptions,
        responsePlansOptions,
        responseFinanceResponsible,
        responseStudent,
        focusedFields,
        isFinishDisabled,
        handleFocus,
        handleTextFieldChange,
        handleSelectChange,
        handleNoNumberToggle,
        handleNoEmailToggle,
        handleIsResponsibleToggle,
        handleFinanceResponsibleToggle,
        handleBack,
        handleContinue,
        handleFinish,
        charactersRemaining,
        referralSourceOptions,
        referralSelected,
        handleCloseModal,
        handleRadioChange,
        selectedPaymentValue,
    };
};
