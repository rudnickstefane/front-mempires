import { VariantType } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { OptionSelect } from '../../../common/ui/types';
import { FormatAndValidateIdentity, FormatPhone, FormatText, ValidateFormVisitRegister } from '../../../common/utils';
import { VisitRegisterProps } from '../components/Drawer/types/VisitRegisterProps.type';

export const useVisitRegisterForm = ({
    closeDrawer,
    enqueueSnackbar
}: {
    closeDrawer: () => void;
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {
    
    const animatedComponents = makeAnimated();
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
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

    const gymPlanOptions = [
        { value: 'noSelect', label: 'Selecione como nos conheceu', isDisabled: true },
        { value: 'anual', label: 'Mensal' },
        { value: 'bimestral', label: 'Bimentral' },
        { value: 'trimestral', label: 'Trimestral' }
    ];

    const modalitiesOptions = [
        { value: 'noSelect', label: 'Selecione uma ou mais modalidades', isDisabled: true },
        { value: 'geral', label: 'Geral' },
        { value: 'muscle', label: 'Musculação' },
        { value: 'ballet', label: 'Ballet' },
        { value: 'natacao', label: 'Natação' }
    ];

    const [formData, setFormData] = useState<VisitRegisterProps['formData']>({
        name: '',
        identity: '',
        referralSource: '',
        phone: '',
        modalities: [],
        details: ''
    });

    const [errors, setErrors] = useState<VisitRegisterProps['errors']>({
        nameError: '',
        identityError: '',
        referralSourceError: '',
        modalitiesError: ''
    });

    const dynamicSteps = ['Informações', 'Contato'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        updatedValue = FormatText(value);

        if (name === 'phone' && value) {
            updatedValue = FormatPhone(value);
        }

        // Lógica para formatação e validação do documento de identidade
        if (name === 'identity' && value) {
            const { formatted, isValid } = FormatAndValidateIdentity(value);
            
            // Atualiza o valor no estado com a formatação do documento
            setFormData(prevState => ({
                ...prevState,
                [name]: formatted // Atualiza o campo com o valor formatado
            }));
    
            // Atualiza o erro caso o documento seja inválido
            setErrors(prevErrors => ({
                ...prevErrors,
                identityError: isValid ? '' : 'Documento inválido'
            }));
            
            return; // Impede a atualização adicional de `formData` com o valor não formatado
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

    const validateForm = () => {
        let newErrors: VisitRegisterProps['errors'] = {};
        newErrors = ValidateFormVisitRegister(formData, activeStep);
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
                // Simulando uma requisição ao banco
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay simulado
                enqueueSnackbar('Visitante cadastrado com sucesso!', { variant: 'success' });
                closeDrawer();
            } catch (error) {
                enqueueSnackbar('Erro ao cadastrar visitante!', { variant: 'error' });
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
        dynamicSteps,
        gymPlanOptions,
        modalitiesOptions,
        focusedFields,
        animatedComponents,
        handleFocus,
        handleTextFieldChange,
        handleSelectChange,
        handleBack,
        handleContinue,
        handleFinish
      };
};
