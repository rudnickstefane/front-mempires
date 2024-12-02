import { VariantType } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { OptionSelect } from '../../../common/ui/types';
import { FormatPhone, FormatText, FormatTime, ValidateFormContactCreate } from '../../../common/utils';
import { ContactCreateProps } from '../components/Drawer/types';

export const useContactCreateForm = ({
    closeDrawer,
    enqueueSnackbar
}: {
    closeDrawer: () => void;
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {
    
    const animatedComponents = makeAnimated();
    const [isLoading, setIsLoading] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [focusedFields, setFocusedFields] = useState<{
        searchStudent: boolean;
        reason: boolean;
        priority: boolean;
        responsible: boolean;
    }>({
        searchStudent: false,
        reason: false,
        priority: false,
        responsible: false,
    });

    const handleFocus = (field: 'searchStudent' | 'reason' | 'priority' | 'responsible', value: boolean) => {
        setFocusedFields((prev) => ({ ...prev, [field]: value }));
    };

    const searchStudentOptions = [
        { value: 'noSelect', label: 'Selecione uma prioridade', isDisabled: true },
        { value: 'anual', label: 'Normal' },
        { value: 'bimestral', label: 'Bimentral' },
        { value: 'trimestral', label: 'Trimestral' }
    ];

    const [formData, setFormData] = useState<ContactCreateProps['formData']>({
        searchStudent: '',
        reason: '',
        priority: 'anual',
        phone: '',
        message: '',
        details: '',
        contactType: '',
        date: '',
        hours: '',
        responsible: '',
        title: '',
        email: ''
    });

    const [errors, setErrors] = useState<ContactCreateProps['errors']>({
        searchStudentError: '',
        reasonError: '',
        messageError: '',
        priorityError: '',
        dateError: '',
        hoursError: '',
        titleError: ''
    });

    const dynamicSteps = isScheduling
        ? [
            formData.contactType ? formData.contactType : 'Meio de Contato', 
            'Informações', 
            'Agendamento'
        ]
        : [
            formData.contactType ? formData.contactType : 'Meio de Contato', 
            'Informações'
        ];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        updatedValue = FormatText(value);

        if (name === 'hours' && value) {
            updatedValue = FormatTime(value);
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
            [name]: ''
        }));
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

    const handleSchedulingToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsScheduling(checked);
    
        if (checked) {
            setFormData(prevFormData => ({
                ...prevFormData,
                streetNumber: 'S/N' // Define "Sem número"
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                streetNumber: '' // Limpa o valor
            }));
        }
    };

    const validateForm = () => {
        let newErrors: ContactCreateProps['errors'] = {};
        console.log(formData);
        newErrors = ValidateFormContactCreate(formData, activeStep);
        console.log(newErrors);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleContactSelected = (contactType: string) => {
        setFormData((prevData) => ({
            ...prevData,
            contactType,
        }));

        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleContinue = () => {
        if (validateForm()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep === 1) {
            setFormData({
                searchStudent: '',
                reason: '',
                priority: 'anual',
                phone: '',
                message: '',
                details: '',
                contactType: '',
                date: '',
                hours: '',
                responsible: '',
                title: '',
                email: ''
            });

            setErrors({
                searchStudentError: '',
                reasonError: '',
                messageError: '',
                priorityError: '',
                dateError: '',
                hoursError: '',
                titleError: '',
                emailError: ''
            });

            setIsScheduling(false);
        }
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                // Simulando uma requisição ao banco
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay simulado
                enqueueSnackbar('Contato cadastrado com sucesso!', { variant: 'success' });
                closeDrawer();
            } catch (error) {
                enqueueSnackbar('Erro ao cadastrar o contato!', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        setFormData,
        setErrors,
        isLoading,
        isScheduling,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        focusedFields,
        searchStudentOptions,
        animatedComponents,
        handleFocus,
        handleTextFieldChange,
        handleSelectChange,
        handleContactSelected,
        handleSchedulingToggle,
        handleBack,
        handleContinue,
        handleFinish
      };
};
