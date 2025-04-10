/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { ClassAlterData, DrawerProps, FindCategoriesResponse } from '../../../common/types';
import { OptionSelect } from '../../../common/ui/types';
import { ClassCreateVariables, FormatName, GeneratePeriodDescription, GeneratePeriodLabel, GetErrorMessage, ValidateFormClassCreate } from '../../../common/utils';
import { ClassAlterDrawer } from '../components/Drawer';
import { PlanCreateProps } from '../components/Drawer/types';
import { ClassCreateProps } from '../components/Drawer/types/ClassCreateProps.type';
import { MutationClassUpsert, QueryFindCategories } from '../components/Graphql';
import { AdminGymDetailsProps } from '../pages/Gym/types';

export const useClassAlterForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
}: DrawerProps & { data: ClassAlterData }) => {

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

    const [formData, setFormData] = useState<ClassCreateProps['formData']>({
        type: 'UPDATE',
        companyCode: companyCode,
        studentsPerHour: data.findClasses.studentsPerHour,
        minimumAlert: data.findClasses.minimumAlert,
        status: 'ACTIVE',
        name: data.findClasses.name,
        sundayHours: data.findClasses.sundayHours,
        mondayHours: data.findClasses.mondayHours,
        tuesdayHours: data.findClasses.tuesdayHours,
        wednesdayHours: data.findClasses.wednesdayHours,
        thursdayHours: data.findClasses.thursdayHours,
        fridayHours: data.findClasses.fridayHours,
        saturdayHours: data.findClasses.saturdayHours,
        holidayHours: data.findClasses.holidayHours,
        classCode: Number(data.findClasses.classCode),
        startDate: data?.findClasses.startDate
            ? data?.findClasses.startDate.split('T')[0]
            : null,
        startHours: data?.findClasses.startDate
            ? data?.findClasses.startDate.split('T')[1]?.slice(0, 5) || ''
            : '',
        endDate: data?.findClasses.endDate
            ? data?.findClasses.endDate.split('T')[0]
            : null,
        endHours: data?.findClasses.endDate
            ? data?.findClasses.endDate.split('T')[1]?.slice(0, 5) || ''
            : '',
        modalities: data.findClasses?.modalities?.map((item: { categoryCode: any; }) => item.categoryCode),
        observation: data.findClasses.observation,
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

    const dynamicSteps = ['Informações', 'Regras'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'startDate') {
            const isValue = updatedValue && updatedValue.trim() !== '' ? true : false;
            setAlertStartDate(isValue);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
            }));
        }

        if (name === 'name' && value) {
            updatedValue = FormatName(value);
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

    const handleSelectChange = (
        newValue: SingleValue<OptionSelect> | MultiValue<OptionSelect>,
        fieldName: string
    ) => {
        let selectedValues: string | string[];
        if (Array.isArray(newValue)) {
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
        let newErrors: ClassCreateProps['errors'] = {};
        newErrors = ValidateFormClassCreate(formData, activeStep, startTime, endTime, selectedDay);
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

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = ClassCreateVariables(formData);
                await request(MutationClassUpsert, variables);
                enqueueSnackbar('Turma atualizada com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao atualizar turma. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao atualizar turma. Tente novamente!'
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
                case 'ClassDetail':
                    return (
                        <ClassAlterDrawer 
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
                    [selectedDay]: [...(prev[selectedDay] as string[] || []), newSlot].sort((a, b) => {
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
            [day]: (prev[day] as string[]).filter((_, i) => i !== index),
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
        setActiveStep,
        renderDrawerContent,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        closeDrawerDetails,
        frequencyOptions,
        accessOptions,
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
