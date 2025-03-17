import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindCategoriesResponse, PlanAlterData, SetPlanDataSummary } from '../../../common/types';
import { OptionSelect } from '../../../common/ui/types';
import { FormatCash, FormatName, GeneratePeriodDescription, GeneratePeriodLabel, GetErrorMessage, PlanAlterVariables, ValidateFormPlanAlter } from '../../../common/utils';
import { PlanAlterDrawer } from '../components/Drawer';
import { PlanCreateProps } from '../components/Drawer/types';
import { MutationPlanUpSert, QueryFindCategories } from '../components/Graphql';
import { AdminGymDetailsProps } from '../pages/Gym/types';

export const usePlanAlterForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
}: DrawerProps & { data: PlanAlterData }) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [charactersRemaining, setCharactersRemaining] = useState<Record<string, number>>({
        observation: 300, // Inicializa com o contador para o campo principal
    });
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responseModalitiesOptions, setResponseModalitiesOptions] = useState<Array<{ value: string; label: string; amount: string; isDisabled?: boolean }>>([]);
    const [responseCustomServiceOptions, setResponseCustomServiceOptions] = useState<Array<{ value: string; label: string; amount: string; isDisabled?: boolean }>>([]);
    const [responsePeriodicityOptions, setResponsePeriodicityOptions] = useState<Array<{ value: string; label: string; isDisabled?: boolean }>>([]);
    const [planDataSummary, setPlanDataSummary] = useState<SetPlanDataSummary>();
    const [periodicitySelected, setPeriodicitySelected] = useState<Array<{ value: string; label: string;}>>([]);
    const [alertStartDate, setAlertStartDate] = useState(false);
    const calledRef = useRef(false);

    const [focusedFields, setFocusedFields] = useState<{
        gender: boolean;
        stateMarital: boolean;
        customService: boolean;
        periodicity: boolean;
        frequency: boolean;
        access: boolean;
        modalities: boolean;
        referralSource: boolean;
    }>({
        gender: false,
        stateMarital: false,
        customService: false,
        periodicity: false,
        frequency: false,
        access: false,
        modalities: false,
        referralSource: false,
    });

    const handleFocus = (field: string, value: boolean) => {
        setFocusedFields((prev) => ({ ...prev, [field]: value }));
    };

    const [formData, setFormData] = useState<PlanCreateProps['formData']>({
        type: 'UPDATE',
        companyCode: companyCode,
        status: 'ACTIVE',
        name: data.findPlans.name,
        frequency: data.findPlans.frequency,
        access: data.findPlans.access,
        sundayHours: data.findPlans.sundayHours,
        mondayHours: data.findPlans.mondayHours,
        tuesdayHours: data.findPlans.tuesdayHours,
        wednesdayHours: data.findPlans.wednesdayHours,
        thursdayHours: data.findPlans.thursdayHours,
        fridayHours: data.findPlans.fridayHours,
        saturdayHours: data.findPlans.saturdayHours,
        holidayHours: data.findPlans.holidayHours,
        isAllHours: data.findPlans.hours === 'FULL_DAY',
        isCustomHours: data.findPlans.hours === 'CUSTOM',
        planCode: Number(data.findPlans.planCode),
        periodicity: data.findPlans.periodicities.map((item) => item.periodicity),
        periodicityDetails: data.findPlans.periodicities.map((item) => {
            // Função para converter valores no formato "brasileiro" para float
            const parseToFloat = (value: string | number | undefined): number => {
              if (typeof value === 'number') return value;
              if (!value) return 0;
              return parseFloat(value.replace('.', '').replace(',', '.'));
            };
        
            // Calcula o total de amount de modalities
            const totalModalityAmount = data.findPlans.modalities
              .map((modality) => parseToFloat(modality.amount))
              .reduce((sum, value) => sum + value, 0);
        
            // Calcula o total de amount de customServices
            const totalCustomServiceAmount = data.findPlans.customServices
              .map((service) => parseToFloat(service.amount))
              .reduce((sum, value) => sum + value, 0);
        
            // Subtrai os valores do amount da periodicity
            const adjustedAmount = parseToFloat(item.amount) - (totalModalityAmount + totalCustomServiceAmount);
        
            // Formata o valor para exibição no formato brasileiro
            const formatToBRL = (value: number): string => {
              return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            };
        
            return {
                value: item.periodicity,
                label: item.name.includes(' - ') ? item.name.split(' - ')[0] : item.name,
                amount: adjustedAmount > 0 ? formatToBRL(adjustedAmount) : '0,00', // Garante que o valor não seja negativo
                charge: item.charge,
                fees: item.fees,
                observation: item.observation,
                startDate: item.startDate
                    ? item.startDate.split('T')[0]
                    : null,
                startHours: item.startDate
                    ? item.startDate.split('T')[1]?.slice(0, 5) || ''
                    : '',
                endDate: item.endDate
                    ? item.endDate.split('T')[0]
                    : null,
                endHours: item.endDate
                    ? item.endDate.split('T')[1]?.slice(0, 5) || ''
                    : '',
            };
        }),
        startDate: data?.findPlans.startDate
            ? data?.findPlans.startDate.split('T')[0]
            : null,
        startHours: data?.findPlans.startDate
            ? data?.findPlans.startDate.split('T')[1]?.slice(0, 5) || ''
            : '',
        endDate: data?.findPlans.endDate
            ? data?.findPlans.endDate.split('T')[0]
            : null,
        endHours: data?.findPlans.endDate
            ? data?.findPlans.endDate.split('T')[1]?.slice(0, 5) || ''
            : '',
        modalities: data.findPlans.modalities.map((item) => item.categoryCode),
        customService: data.findPlans.customServices.map((item) => item.categoryCode),
        chargeRegistration: data.findPlans.typeCharge === 'PLAN' ? data.findPlans.periodicities[0].charge : '',
        isPlan: data.findPlans.typeCharge === 'PLAN' ? true : false,
        isPeriodicity: data.findPlans.typeCharge === 'PERIODICITY' ? true : false,
        isUnique: data.findPlans.feesFrequency === 'UNIQUE' ? true : false,
        isDaily: data.findPlans.feesFrequency === 'DAILY' ? true : false,
        isValue: data.findPlans.calculationFees === 'VALUE' ? true : false,
        isPercentage: data.findPlans.calculationFees === 'PERCENTAGE' ? true : false,
        observation: data.findPlans.observation,
    });

    const [errors, setErrors] = useState<PlanCreateProps['errors']>({
        nameError: '',
        periodicityError: '',
        modalitiesError: '',
    });

    const frequencyOptions = [
        { value: 'noSelect', label: 'Selecione uma frequência', isDisabled: true },
        { value: 'ALL', label: 'Todos os dias da semana' },
        { value: 'ONE', label: '1 dia da semana' },
        { value: 'TWO', label: '2 dias da semana' },
        { value: 'THREE', label: '3 dias da semana' },
        { value: 'FOUR', label: '4 dias da semana' },
        { value: 'FIVE', label: '5 dias da semana' },
        { value: 'SIX', label: '6 dias da semana' }
    ];

    const accessOptions = [
        { value: 'noSelect', label: 'Selecione um tipo de acesso', isDisabled: true },
        { value: 'ALL', label: 'Ilimitado' },
        { value: 'ONE', label: '1 vez' },
        { value: 'TWO', label: '2 vezes' },
        { value: 'THREE', label: '3 vezes' },
        { value: 'FOUR', label: '4 vezes' },
        { value: 'FIVE', label: '5 vezes' },
        { value: 'SIX', label: '6 vezes' },
        { value: 'SEVEN', label: '7 vezes' },
        { value: 'EIGHT', label: '8 vezes' },
        { value: 'NINE', label: '9 vezes' },
    ];

    const daysOfWeek = [
        { key: "sundayHours", label: "Domingo" },
        { key: "mondayHours", label: "Segunda" },
        { key: "tuesdayHours", label: "Terça" },
        { key: "wednesdayHours", label: "Quarta" },
        { key: "thursdayHours", label: "Quinta" },
        { key: "fridayHours", label: "Sexta" },
        { key: "saturdayHours", label: "Sábado" },
        { key: "holidayHours", label: "Feriado"},
    ];

    const dynamicSteps = ['Informações', 'Regras', 'Modalidades', 'Serviços', 'Valores', 'Resumo'];
    const [selectedChargeValue, setSelectedChargeValue] = useState(data.findPlans.typeCharge === 'PLAN' ? 'isPlan' : 'isPeriodicity');
    const [selectedHoursValue, setSelectedHoursValue] = useState(formData.isAllHours ? 'isAllHours' : 'isCustomHours');
    const [selectedFeesFrequencyValue, setSelectedFeesFrequencyValue] = useState(data.findPlans.feesFrequency === 'UNIQUE' ? 'isUnique' : 'isDaily');
    const [selectedCalculationBaseValue, setSelectedCalculationBaseValue] = useState(data.findPlans.calculationBase === 'VALUE' ? 'isValue' : 'isPercentage');

    const handleTextFieldChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = FormatName(value);
        
        if (name === 'startDate') {
            const isValue = updatedValue && updatedValue.trim() !== '' ? true : false;
            setAlertStartDate(isValue);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
            }));
        }

        if (name === 'chargeRegistration') {
            updatedValue = FormatCash(value)
        }

        if (name === 'observation' && value.length <= 300) {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
            
            setCharactersRemaining((prevState) => ({
                ...prevState,
                [name]: 300 - value.length,
            }));
        }

        if (name.startsWith('observation-')) {
            const [field, periodicityValue] = name.split('-'); // Nome do campo (observation) + valor da periodicidade (1, 2, etc.)
        
            if (value.length <= 300) {
                setFormData((prevState) => {
                    const updatedPeriodicityDetails = prevState.periodicityDetails.map((detail) => {
                        if (detail.value === periodicityValue) {
                            // Atualiza o campo `observation` da periodicidade correspondente
                            return {
                                ...detail,
                                [field]: FormatName(value),
                            };
                        }
                        return detail;
                    });
        
                    return {
                        ...prevState,
                        periodicityDetails: updatedPeriodicityDetails, // Atualiza o estado de periodicityDetails
                    };
                });

                setCharactersRemaining((prevState) => ({
                    ...prevState,
                    [name]: 300 - value.length,
                }));
            }
        }

        if (
            name.includes('amount') || 
            name.includes('charge') || 
            name.includes('fees') || 
            name.includes('startDate') || 
            name.includes('endDate') || 
            name.includes('startHours') || 
            name.includes('endHours')
        ) {
            const [field, periodicityValue] = name.split('-'); // Nome do campo (amount, charge, startDate, etc.) + valor da periodicidade (1, 2, etc.)
            
            setFormData((prevState) => {
                const updatedPeriodicityDetails = prevState.periodicityDetails.map((detail) => {
                if (detail.value === periodicityValue) {
                    let formattedValue = value;
        
                    if (field === 'fees') {
                        if (selectedCalculationBaseValue === 'isValue') {
                            formattedValue = FormatCash(value);
                        } else if (selectedCalculationBaseValue === 'isPercentage') {
                            // Formatar como percentual (apenas números inteiros)
                            formattedValue = value.replace(/[^\d]/g, '');
                        }
                    } else if (field === 'amount' || field === 'charge') {
                        formattedValue = FormatCash(value);
                    }
        
                    return {
                    ...detail,
                    [field]: formattedValue,
                    };
                }
                return detail;
                });
        
                return {
                ...prevState,
                periodicityDetails: updatedPeriodicityDetails,
                };
            });
        }

        // Atualiza o estado com o novo valor do campo
        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue,
        }));

        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    function handleRemovePeriodicity(periodicityToRemove: string) {
        setFormData(prevState => ({
            ...prevState,
            periodicity: prevState.periodicity.filter(periodicity => periodicity !== periodicityToRemove),
            periodicityDetails: prevState.periodicityDetails.filter(detail => detail.value !== periodicityToRemove),
        }));
    }

    const handleSelectChange = (
        newValue: SingleValue<OptionSelect> | MultiValue<OptionSelect>,
        fieldName: string
    ) => {
        let selectedValues: string | string[];
        if (Array.isArray(newValue)) {
            if (fieldName === 'periodicity') {
                const formattedValues = newValue.map(option => {
                    const formatted = {
                        value: option.value,
                        label: option.label.split(' - ')[0],
                        amount: option.amount || '', // Garante que amount seja uma string válida
                        charge: option.charge || '', // Garante que charge seja uma string válida
                    };
                    return formatted;
                });
                // Mesclando valores existentes com novos, priorizando os existentes
                const updatedPeriodicityDetails = [
                    // Mantém somente os itens existentes que ainda estão no novo conjunto
                    ...formData.periodicityDetails.filter(existingItem =>
                    formattedValues.some(newItem => newItem.label === existingItem.label)
                    ),
                    // Adiciona novos itens que não estão nos existentes
                    ...formattedValues.filter(
                    newItem =>
                        !formData.periodicityDetails.some(
                        existingItem => existingItem.label === newItem.label
                        )
                    ),
                ];
                // Atualiza o estado com a lista combinada
                formData.periodicityDetails = updatedPeriodicityDetails;

                setPeriodicitySelected(updatedPeriodicityDetails);
            }

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformFormDataToPlanSummary = (formData: any): SetPlanDataSummary => {
        const { 
            name, 
            modalities, 
            customService, 
            isPlan,
            isUnique,
            isDaily,
            isValue,
            isPercentage,
            isPeriodicity, 
            chargeRegistration, 
            startDate, 
            endDate,
            startHours,
            endHours,
            periodicityDetails,
            observation
        } = formData;

        const mappedModalities = modalities.map((modalityId: string) => {
            const modality = responseModalitiesOptions.find(option => option.value === modalityId);
            return modality ? { 
                value: modality.value, 
                label: modality.label, 
                amount: modality.amount 
            } : null; // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).filter((modality: any): modality is { value: string; label: string; amount: string } => modality !== null);

        const mappedCustomService = customService.map((customServiceId: string) => {
            const customService = responseCustomServiceOptions.find(option => option.value === customServiceId);
            return customService ? { 
                value: customService.value, 
                label: customService.label, 
                amount: customService.amount 
            } : null; // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).filter((customService: any): customService is { value: string; label: string; amount: string } => customService !== null);

        const typeCharge = isPlan ? 'PLAN' : isPeriodicity ? 'PERIODICITY' : '';
        const feesFrequency = isUnique ? 'UNIQUE' : isDaily ? 'DAILY' : '';
        const calculationBase = isValue ? 'VALUE' : isPercentage ? 'PERCENTAGE' : '';

        // Função para calcular o total de um array de valores monetários
        const calculateTotal = (items: { amount: string }[]) => 
            items.reduce((total, item) => {
                // Remove o prefixo "R$", substitui ',' por '.' e ignora separadores de milhar
                const amount = parseFloat(item.amount.replace(/[R$.\s]/g, '').replace(',', '.'));
                return total + (isNaN(amount) ? 0 : amount);
            }, 0);

        // Função para formatar o número no estilo brasileiro
        const formatCurrency = (value: number) => 
            value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const periodicities = periodicityDetails.map((detail: any) => {
            const totalModalities = calculateTotal(mappedModalities);
            const totalCustomService = calculateTotal(mappedCustomService);
    
            const totalValue = (
                parseFloat(detail.amount?.replace(/[R$.\s]/g, '').replace(',', '.') || '0') + 
                totalModalities + 
                totalCustomService
            );
    
            return {
                name: detail.label,
                periodicity: detail.value,
                charge: isPlan ? chargeRegistration : isPeriodicity ? detail.charge : '',
                amount: detail.amount,
                fees: detail.fees,
                startDate: detail.startDate || '',
                startHours: detail.startHours || '',
                endDate: detail.endDate || '',
                endHours: detail.endHours || '',
                observation: detail.observation,
                totalModalities: formatCurrency(totalModalities),
                totalCustomService: formatCurrency(totalCustomService),
                totalValue: totalValue
            };
        });

        const setDataPlanSummary = {
            name,
            modalities: mappedModalities,
            customService: mappedCustomService,
            typeCharge,
            feesFrequency,
            calculationBase,
            startDate: startDate || '',
            startHours: startHours || '',
            endDate: endDate || '',
            endHours: endHours || '',
            observation,
            periodicities
        };
    
        return { setDataPlanSummary };
    };

    const validateForm = () => {
        let newErrors: PlanCreateProps['errors'] = {};
        newErrors = ValidateFormPlanAlter(formData, activeStep, startTime, endTime, selectedDay);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // Atualiza os estados com base no nome do rádio
        if (name === 'charge') {
            setSelectedChargeValue(value);
            formData.isPlan = value === 'isPlan';
            formData.isPeriodicity = value === 'isPeriodicity';
        } else if (name === 'feesFrequency') {
            setSelectedFeesFrequencyValue(value);
            formData.isUnique = value === 'isUnique';
            formData.isDaily = value === 'isDaily';
        } else if (name === 'hours') {
            setSelectedHoursValue(value);
            formData.isAllHours = value === 'isAllHours';
            formData.isCustomHours = value === 'isCustomHours';
        } else if (name === 'calculationBase') {
            setSelectedCalculationBaseValue(value);
            formData.isValue = value === 'isValue';
            formData.isPercentage = value === 'isPercentage';

            setFormData((prevState) => {
                const updatedPeriodicityDetails = prevState.periodicityDetails.map((detail) => {
                return {
                    ...detail,
                    fees: '', // Limpa o valor de 'fees' quando mudar selectedCalculationBaseValue
                };
                });
    
                return {
                ...prevState,
                periodicityDetails: updatedPeriodicityDetails, // Atualiza o estado
                };
            });
        }

        setFormData(prevState => ({
            ...prevState,
        }));

        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    const handleContinue = () => {
        if (validateForm()) {
            const nextStep = dynamicSteps[activeStep + 1];
            if (nextStep === 'Resumo') {
                const summary = transformFormDataToPlanSummary(formData);
                setPlanDataSummary(summary);
            }
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const findCategories = useCallback(async () => {
        try {
            const response: FindCategoriesResponse = await request(QueryFindCategories, { companyCode: companyCode });

            const modalities = response.findCategories.modality.map(modality => ({
                value: modality.categoryCode,
                label: modality.name,
                amount: modality.amount,
            }));

            if (modalities.length === 0) {
                // Exibe uma mensagem mais amigável para o usuário
                enqueueSnackbar(
                    'Nenhuma modalidade ativa foi encontrada. Por favor, ative ao menos uma para prosseguir.',
                    { variant: 'warning' }
                );

                // Define opções padrão quando não há modalidades
                setResponseModalitiesOptions([
                    { value: 'noSelect', label: 'Nenhuma modalidade disponível', amount: '', isDisabled: true },
                ]);
            } else {
                // Define as opções com as modalidades encontradas
                setResponseModalitiesOptions([
                    { value: 'noSelect', label: 'Selecione uma ou mais modalidades', amount: '', isDisabled: true },
                    ...modalities,
                ]);
            }

            const customService = response.findCategories.customService.map(modality => ({
                value: modality.categoryCode,
                label: modality.name,
                amount: modality.amount,
            }));

            if (customService.length === 0) {
                setResponseCustomServiceOptions([
                    { value: 'noSelect', label: 'Nenhum serviço personalizado disponível', amount: '', isDisabled: true },
                ]);
            } else {
                // Define as opções com as modalidades encontradas
                setResponseCustomServiceOptions([
                    { value: 'noSelect', label: 'Selecione um ou mais serviços personalizados', amount: '', isDisabled: true },
                    ...customService,
                ]);
            }
        } catch (error) {
            closeDrawer();

            setResponseModalitiesOptions([
                { value: 'noSelect', label: 'Ocorreu um erro ao buscar suas modalidades.',  amount: '', isDisabled: true },
            ]);

            setResponseCustomServiceOptions([
                { value: 'noSelect', label: 'Ocorreu um erro ao buscar seus serviços personalizados.',  amount: '', isDisabled: true },
            ]);

            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar modalidades e serviços personalizados. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            enqueueSnackbar('Erro ao buscar modalidades cadastradas em sua academia.', { variant: 'error' });
            enqueueSnackbar('Erro ao buscar serviços personalizados cadastradas em sua academia.', { variant: 'error' });
        }
    }, [attemptCount, closeDrawer, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findCategories();

                const periodicity = Array.from({ length: 24 }, (_, index) => {
                    const value = (index + 1).toString(); // `value` como string
                    return {
                    value,
                    label: `${GeneratePeriodLabel(index + 1)} - ${GeneratePeriodDescription(index + 1)}`,
                    description: `${GeneratePeriodDescription(index + 1)}`,
                    };
                });
                
                setResponsePeriodicityOptions([
                    { value: 'noSelect', label: 'Selecione uma ou mais periodicidades', isDisabled: true },
                    ...periodicity,
                ]);
            };

            fetchData();
        }
    }, [findCategories]);

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = PlanAlterVariables(formData, planDataSummary);
                await request(MutationPlanUpSert, variables);
                enqueueSnackbar('Plano atualizado com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao atualizar plano. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao atualizar o plano. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);
    const [activeDrawerStep, setActiveDrawerStep] = useState(0);

    const renderDrawerContent = () => {
            switch (drawerType) {
                case 'PlanDetails':
                    return (
                        <PlanAlterDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={data}
                            initialStep={activeDrawerStep}
                            refresh={() => refresh?.()}
                        />
                    );

                default:
                    break;
            }
        };

    const closeDrawerDetails = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };
    
    const openDrawer = (type: AdminGymDetailsProps[keyof AdminGymDetailsProps], initialStep: number = 0) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
        setActiveDrawerStep(initialStep);
    };

    const [openModalHours, setOpenModalHours] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string>();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleOpenModal = (day: string) => {
        setSelectedDay(day);
        setStartTime("");
        setEndTime("");
        setOpenModalHours(true);
    };

    const handleCloseModal = () => {
        setOpenModalHours(false);
        setSelectedDay('');
    };

    const handleAddTimeSlot = () => {
        if (validateForm()) {
            if (startTime && endTime && selectedDay) {
                const newSlot = `${startTime} às ${endTime}`;

                setFormData((prev) => ({
                    ...prev,
                    [selectedDay]: [...prev[selectedDay], newSlot].sort((a, b) => {
                    const getHour = (time: string) => parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]); 
                    return getHour(a.split(" às ")[0]) - getHour(b.split(" às ")[0]);
                    }),
                }));
                handleCloseModal();
            }
        }
    };

    const handleRemoveTimeSlot = (day: string, index: number) => {
        setFormData((prev) => ({
            ...prev,
            [day]: prev[day].filter((_, i) => i !== index),
        }));
    };

    return {
        setFormData,
        setErrors,
        isLoading,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        responsePeriodicityOptions,
        responseModalitiesOptions,
        responseCustomServiceOptions,
        focusedFields,
        handleFocus,
        handleTextFieldChange,
        handleSelectChange,
        handleBack,
        handleContinue,
        handleFinish,
        charactersRemaining,
        alertStartDate,
        periodicitySelected,
        handleRemovePeriodicity,
        handleRadioChange,
        selectedChargeValue,
        selectedFeesFrequencyValue,
        selectedCalculationBaseValue,
        planDataSummary,
        setActiveStep,
        renderDrawerContent,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        closeDrawerDetails,
        frequencyOptions,
        accessOptions,
        selectedHoursValue,
        daysOfWeek,
        openModalHours,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        handleOpenModal,
        handleCloseModal,
        handleAddTimeSlot,
        handleRemoveTimeSlot,
        selectedDay
    };
};
