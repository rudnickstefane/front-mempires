import axios from 'axios';
import { VariantType } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { API_URLS } from '../../../../config/apis.config';
import { OptionSelect } from '../../../common/ui/types';
import { CalculateAge, FormatAndValidateIdentity, FormatPhone, FormatText, FormatZipCode, ValidateFormRegisterStudent } from '../../../common/utils';
import { StudentRegisterProps } from '../components/Drawer/types';

export const useStudentRegisterForm = ({
    closeDrawer,
    enqueueSnackbar
}: {
    closeDrawer: () => void;
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isNoNumber, setIsNoNumber] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isMinor, setIsMinor] = useState(false);
    const [focusedFields, setFocusedFields] = useState<{
        gender: boolean;
        stateMarital: boolean;
        gymPlan: boolean;
        modalities: boolean;
    }>({
        gender: false,
        stateMarital: false,
        gymPlan: false,
        modalities: false,
    });

    const handleFocus = (field: 'gender' | 'stateMarital' | 'gymPlan' | 'modalities', value: boolean) => {
    setFocusedFields((prev) => ({ ...prev, [field]: value }));
    };

    const genderOptions = [
        { value: 'noSelect', label: 'Selecione um gênero', isDisabled: true },
        { value: 'feminine', label: 'Feminino' },
        { value: 'masculine', label: 'Masculino' },
        { value: 'other', label: 'Outros' }
    ];

    const stateMaritalOptions = [
        { value: 'noSelect', label: 'Selecione o estado civil', isDisabled: true },
        { value: 'married', label: 'Casado' },
        { value: 'single', label: 'Solteiro' },
        { value: 'other', label: 'Outros' }
    ];

    const gymPlanOptions = [
        { value: 'noSelect', label: 'Selecione um plano', isDisabled: true },
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

    const [formData, setFormData] = useState<StudentRegisterProps['formData']>({
        name: '',
        identity: '',
        email: '',
        phone: '',
        stateMarital: '',
        gender: '',
        streetAddress: '',
        streetNumber: '',
        addressComplement: '',
        zipCode: '',
        neighborhood: '',
        city: '',
        state: '',
        birthDate: '',
        responsible: '',
        profession: '',
        company: '',
        gymPlan: '',
        modalities: [],
        paymentDay: '',
        contactNameEmergency: '',
        contactPhoneEmergency: '',
        guardianName: '',
        planDetails: ''
    });

    const [errors, setErrors] = useState<StudentRegisterProps['errors']>({
        nameError: '',
        identityError: '',
        emailError: '',
        streetAddressError: '',
        streetNumberError: '',
        zipCodeError: '',
        neighborhoodError: '',
        cityError: '',
        stateError: '',
        birthDateError: '',
        responsibleError: '',
        gymPlanError: '',
        modalitiesError: '',
        paymentDayError: '',
        guardianNameError: ''
    });

    const dynamicSteps = isMinor
        ? ['Informações', 'Endereço', 'Plano', 'Contato', 'Responsável'] // Inclui "Responsável" para menores de 18 anos
        : ['Informações', 'Endereço', 'Plano', 'Contato'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name !== 'email' && value) {
            updatedValue = FormatText(value);
        }

        if (name === 'phone' && value) {
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
            axios.get(`${API_URLS.VIA_CEP}/${updatedValue}/json/`)
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
                            neighborhood: bairro || '',
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
      

    const handleNoNumberToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsNoNumber(checked);
    
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
        let newErrors: StudentRegisterProps['errors'] = {};
        newErrors = ValidateFormRegisterStudent(formData, activeStep);
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
                enqueueSnackbar('Aluno cadastrado com sucesso!', { variant: 'success' });
                closeDrawer();
            } catch (error) {
                enqueueSnackbar('Erro ao cadastrar aluno!', { variant: 'error' });
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
        isNoNumber,
        genderOptions,
        stateMaritalOptions,
        gymPlanOptions,
        modalitiesOptions,
        focusedFields,
        handleFocus,
        handleTextFieldChange,
        handleSelectChange,
        handleNoNumberToggle,
        handleBack,
        handleContinue,
        handleFinish
      };
};
