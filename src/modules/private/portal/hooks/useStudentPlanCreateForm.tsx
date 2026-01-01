import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindPlansResponse } from '../../../common/types';
import { OptionSelect } from '../../../common/ui/types';
import { FormatText, GetErrorMessage, ValidateFormStudentPlanCreate } from '../../../common/utils';
import { StudentRegisterProps } from '../components/Drawer/types';
import { MutationStudentPlansUpsert, QueryFindPlans } from '../components/Graphql';

export const useStudentPlanCreateForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refreshInternal,
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [isNoConfigPlans, setIsConfigPlans] = useState(false);
    const [charactersRemaining, setCharactersRemaining] = useState(300);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const [isFinishDisabled, setIsFinishDisabled] = useState(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responsePlansOptions, setResponsePlansOptions] = useState<Array<{ value: string; label: string; isDisabled?: boolean }>>([]);
    const calledRef = useRef(false);

    const [focusedFields, setFocusedFields] = useState<{
        periodicityCode: boolean;
    }>({
        periodicityCode: false,
    });

    const handleFocus = (field: 'periodicityCode', value: boolean) => {
    setFocusedFields((prev) => ({ ...prev, [field]: value }));
    };

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
        periodicityCodeError: '',
        paymentDayError: '',
    });

    const dynamicSteps = ['Informações'];

    const handleTextFieldChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'detailsPlan' && value.length <= 300) {
            updatedValue = FormatText(value);

            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
            setCharactersRemaining(300 - value.length);
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
          [fieldName]: selectedValues  // Atualiza o estado com o valor único
        }));

        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    };

    const validateForm = () => {
        const nextStep = dynamicSteps[activeStep + 1];
        if (nextStep === 'Responsável') {
            setIsFinishDisabled(true);
        } else {
            setIsFinishDisabled(false);
        }
        
        let newErrors: StudentRegisterProps['errors'] = {};
        newErrors = ValidateFormStudentPlanCreate(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
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
                const paymentDay = formData.paymentDay
                    ? new Date(Date.UTC(
                        parseInt(formData.paymentDay.substring(0, 4)), // Ano
                        parseInt(formData.paymentDay.substring(5, 7)) - 1, // Mês (zero-indexed)
                        parseInt(formData.paymentDay.substring(8, 10)), // Dia
                        0, 0, 0, 0 // Hora, minuto, segundo, milissegundo zerados
                        ))
                    : new Date(new Date().setUTCHours(0, 0, 0, 0)); // Data atual com 00 horas UTC
                    
                const variables = {
                    input: [
                            {
                            studentCode: data.profileCode,
                            companyCode: companyCode,
                            periodicityCode: Number(formData.periodicityCode),
                            paymentDay: paymentDay,
                            detailsPlan: formData.detailsPlan,
                        }
                    ]
                };

                await request(MutationStudentPlansUpsert, variables);
                enqueueSnackbar('Plano associado com sucesso!', { variant: 'success' });
                closeDrawer();
                refreshInternal?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao associar plano com aluno. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao associar plano com aluno. Tente novamente!'
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
        responsePlansOptions,
        focusedFields,
        isFinishDisabled,
        handleFocus,
        handleTextFieldChange,
        handleSelectChange,
        handleBack,
        handleFinish,
        charactersRemaining,
        handleCloseModal,
        handleRadioChange,
        selectedPaymentValue,
    };
};
