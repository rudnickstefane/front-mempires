import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindCategoriesResponse } from '../../../common/types';
import { OptionSelect } from '../../../common/ui/types';
import { ClassCreateVariables, FormatName, GetErrorMessage, ValidateFormClassCreate } from '../../../common/utils';
import { ClassCreateProps } from '../components/Drawer/types/ClassCreateProps.type';
import { MutationClassUpsert, QueryFindCategories } from '../components/Graphql';

export const useClassCreateForm = ({
    closeDrawer,
    enqueueSnackbar,
    refresh,
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [alertStartDate, setAlertStartDate] = useState(false);
    const [charactersRemaining, setCharactersRemaining] = useState<Record<string, number>>({
        observation: 300, // Inicializa com o contador para o campo principal
    });
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [attemptCount, setAttemptCount] = useState(0);
    const calledRef = useRef(false);
    const [responseModalitiesOptions, setResponseModalitiesOptions] = useState<Array<{ value: string; label: string; amount: string; isDisabled?: boolean }>>([]);

    const [focusedFields, setFocusedFields] = useState<{
        modalities: boolean;
    }>({
        modalities: false,
    });

    const handleFocus = (field: string, value: boolean) => {
        setFocusedFields((prev) => ({ ...prev, [field]: value }));
    };

    const [formData, setFormData] = useState<ClassCreateProps['formData']>({
        type: 'CREATE',
        companyCode: companyCode,
        name: '',
        status: 'ACTIVE',
        startDate: '',
        endDate: '',
        observation: '',
        startHours: '',
        endHours: '',
        modalities: [],
        studentsPerHour: '',
        minimumAlert: '',
        sundayHours: [],
        mondayHours: [],
        tuesdayHours: [],
        wednesdayHours: [],
        thursdayHours: [],
        fridayHours: [],
        saturdayHours: [],
        holidayHours: [],
    });

    const [errors, setErrors] = useState<ClassCreateProps['errors']>({
        nameError: '',
        startDateError: '',
        endDateError: '',
        modalitiesError: '',
        studentsPerHourError: '',
        minimumAlertError: ''
    });

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

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = ClassCreateVariables(formData);
                await request(MutationClassUpsert, variables);
                enqueueSnackbar('Cadastro da turma realizada com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao cadastrar turma. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao cadastrar a turma. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleContinue = () => {
        if (validateForm()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const [openModalHours, setOpenModalHours] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string>();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

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
        } catch (error) {
            closeDrawer();

            setResponseModalitiesOptions([
                { value: 'noSelect', label: 'Ocorreu um erro ao buscar suas modalidades.',  amount: '', isDisabled: true },
            ]);

            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar modalidades. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            enqueueSnackbar('Erro ao buscar modalidades cadastradas em sua academia.', { variant: 'error' });
        }
    }, [attemptCount, closeDrawer, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findCategories();
            };

            fetchData();
        }
    }, [findCategories]);

    return {
        setFormData,
        setErrors,
        isLoading,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        handleTextFieldChange,
        handleSelectChange,
        handleFinish,
        alertStartDate,
        charactersRemaining,
        handleContinue,
        handleBack,
        handleAddTimeSlot,
        handleRemoveTimeSlot,
        selectedDay,
        daysOfWeek,
        openModalHours,
        startTime,
        setEndTime,
        setStartTime,
        endTime,
        handleCloseModal,
        handleOpenModal,
        responseModalitiesOptions,
        focusedFields,
        handleFocus
    };
};
