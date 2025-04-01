import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindCategoriesResponse } from '../../../common/types';
import { OptionSelect } from '../../../common/ui/types';
import { FormatAndValidateCNPJ, FormatAndValidateCPF, FormatAndValidateRG, FormatName, FormatPhone, GetErrorMessage, ValidateFormVisitRegister, ValidatePassport } from '../../../common/utils';
import { VisitRegisterProps } from '../components/Drawer/types/VisitRegisterProps.type';
import { QueryFindCategories } from '../components/Graphql';
import { MutationVisitRegister, QueryFindStudent } from '../pages/Gym/graphql';
import { FindStudentResponse } from '../pages/Gym/types';
import { VisitRegisterVariables } from '../pages/Gym/utils';

export const useVisitRegisterForm = ({
    closeDrawer,
    enqueueSnackbar,
    refresh,
}: DrawerProps) => {
    
    const { request } = useBackendForFrontend();
    const animatedComponents = makeAnimated();
    const [charactersRemaining, setCharactersRemaining] = useState(300);
    const [isNoEmail, setIsNoEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [attemptCount, setAttemptCount] = useState(0);
    const [referralSelected, setReferralSelected] = useState<string>();
    const [isIndication, setIsIndication] = useState(false);
    const [responseStudent, setResponseStudent] = useState<FindStudentResponse | null>();
    const [responseModalitiesOptions, setResponseModalitiesOptions] = useState<Array<{ value: string; label: string; isDisabled?: boolean }>>([]);
    const calledRef = useRef(false);
    const [focusedFields, setFocusedFields] = useState<{
        gender: boolean;
        stateMarital: boolean;
        referralSource: boolean;
        modalities: boolean;
    }>({
        gender: false,
        stateMarital: false,
        referralSource: false,
        modalities: false,
    });

    const handleFocus = (field: 'referralSource' | 'modalities', value: boolean) => {
        setFocusedFields((prev) => ({ ...prev, [field]: value }));
    };

    const findModality = useCallback(async () => {
        try {
            const response: FindCategoriesResponse = await request(QueryFindCategories, { companyCode: companyCode });

            const modalities = response.findCategories.modality.map(modality => ({
                value: modality.categoryCode,
                label: modality.name,
            }));

            setResponseModalitiesOptions([
                { value: 'noSelect', label: 'Selecione uma ou mais modalidades', isDisabled: true },
                ...modalities,
            ]);
        } catch (error) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar modalidades. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Erro ao buscar modalidades cadastradas em sua academia.', { variant: 'error' });
        }
    }, [attemptCount, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findModality();
            };

            fetchData();
        }
    }, [findModality]);

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

    const [formData, setFormData] = useState<VisitRegisterProps['formData']>({
        assignment: companyCode,
        name: '',
        identity: '',
        referralSource: '',
        indicationSearch: '',
        modalities: [],
        observation: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState<VisitRegisterProps['errors']>({
        nameError: '',
        identityError: '',
        referralSourceError: '',
        modalitiesError: '',
        emailError: '',
        phoneError: '',
    });

    const dynamicSteps = ['Informações', 'Contato'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name != 'email' && value) {
            updatedValue = FormatName(value);
        }

        if (name === 'phone' && value) {
            updatedValue = FormatPhone(value);
        }

        if (name === 'observation' && value.length <= 300) {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
            setCharactersRemaining(300 - value.length);
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

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
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

    const validateForm = () => {
        let newErrors: VisitRegisterProps['errors'] = {};
        const indicationCode = responseStudent?.findStudent.profileCode;

        newErrors = ValidateFormVisitRegister(formData, activeStep, indicationCode, isIndication);
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
                const indicationCode = responseStudent?.findStudent.profileCode;
                const variables = VisitRegisterVariables(formData, indicationCode);
                await request(MutationVisitRegister, variables);
                enqueueSnackbar('Visitante cadastrado com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao cadastrar visitante. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao cadastrar visitante. Tente novamente!'
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
        isNoEmail,
        handleNoEmailToggle,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        referralSourceOptions,
        responseModalitiesOptions,
        focusedFields,
        animatedComponents,
        handleFocus,
        handleTextFieldChange,
        handleSelectChange,
        handleBack,
        handleContinue,
        handleFinish,
        charactersRemaining,
        responseStudent,
        referralSelected
      };
};
