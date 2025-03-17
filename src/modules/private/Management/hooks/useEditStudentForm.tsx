import axios from 'axios';
import { ChangeEvent, useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { APIS } from '../../../common/configs/apis.config';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, StudentData } from '../../../common/types';
import { OptionSelect } from '../../../common/ui/types';
import { EditProfileVariables, FormatAndValidateCNPJ, FormatAndValidateCPF, FormatAndValidateRG, FormatIdentity, FormatName, FormatPhone, FormatZipCode, GetErrorMessage, ValidateFormEditStudent } from '../../../common/utils';
import { EditInfosProfileProps } from '../components/Drawer/types/EditInfosProfileProps.type';
import { MutationDeleteContact, MutationEditProfile } from '../components/Graphql';
import { QueryFindStudent } from '../pages/Gym/graphql';
import { FindStudentResponse } from '../pages/Gym/types';

export const  useEditStudentForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
}: DrawerProps & { data: StudentData }) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [isNoNumber, setIsNoNumber] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const [contacts, setContacts] = useState(data?.contact ?? []);
    const [editingContact, setEditingContact] = useState<null | { contactCode: string, description: string, phone: string, email: string }>(null);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [isIndication, setIsIndication] = useState(false);
    const [referralSelected, setReferralSelected] = useState<string>();
    const [responseStudent, setResponseStudent] = useState<FindStudentResponse | null>();

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

    const [formData, setFormData] = useState<EditInfosProfileProps['formData']>({
        profileCode: data?.profileCode,
        name: data?.name ?? '',
        birthDate: data?.birthDate
            ? data.birthDate.split('/').reverse().join('-')
            : '',
        identity: data?.identity
            ? FormatIdentity(data.identity) : '',
        gender: data?.gender,
        stateMarital: data?.stateMarital,
        profession: data?.profession,
        company: data?.company,
        username: data?.username ?? '',
        address: data?.address ?? '',
        number: data?.number ?? '',
        complement: data?.complement ?? '',
        zipCode: data?.zipCode
            ? FormatZipCode(data?.zipCode)
            : '',
        district: data?.district ?? '',
        city: data?.city ?? '',
        state: data?.state ?? '',
        description: '',
        phone: '',
        emergencyContact: '',
        emergencyPhone: '',
        email: '',
        referralSource: '',
        indicationSearch: '',
    } as EditInfosProfileProps['formData']);

    const [errors, setErrors] = useState<EditInfosProfileProps['errors']>({
        nameError: '',
        birthDateError: '',
        identityError: '',
        usernameError: '',
        addressError: '',
        numberError: '',
        complementError: '',
        zipCodeError: '',
        districtError: '',
        cityError: '',
        stateError: '',
        descriptionError: '',
        phoneError: '',
        emailError: '',
    });

    const handleAddContact = () => {
        if (validateForm()) {        
            const newContact = {
                contactCode: '', 
                type: "SECOND",
                description: formData.description,
                phone: formData.phone,
                email: formData.email,
                emergencyContact: formData.emergencyContact,
                emergencyPhone: formData.emergencyPhone,
            };
            
            // Adiciona o novo contato abaixo do "MAIN"
            setContacts((prevContacts) => {
                const mainContact = prevContacts.find(contact => contact.type === "MAIN");
                if (mainContact) {
                    const mainIndex = prevContacts.indexOf(mainContact);
                    const newContacts = [
                        ...prevContacts.slice(0, mainIndex + 1),
                        newContact, // Adiciona o novo contato
                        ...prevContacts.slice(mainIndex + 1)
                    ];
                    return newContacts;
                }
                return [...prevContacts, newContact]; // Caso não tenha o MAIN, adiciona no final
            });
            
            // Limpa os campos após adicionar o novo contato
            setFormData((prevState) => ({
                ...prevState,
                description: '',
                phone: '',
                email: '',
                emergencyContact: '',
                emergencyPhone: '',
            }));
        }
    };

    const handleEditContact = (contact: { contactCode: string, description: string, phone: string, email: string, emergencyContact: string, emergencyPhone: string }) => {
        setEditingContact(contact);
        setFormData({
            ...formData,
            description: contact.description,
            phone: contact.phone,
            email: contact.email,
            emergencyContact: contact.emergencyContact,
            emergencyPhone: contact.emergencyPhone,
        });
    };

    const handleDeleteContact = async (contact: { contactCode: string }) => {
        try {
            const contactCode = Number(contact.contactCode);
            await request(MutationDeleteContact, { contactCode });
            enqueueSnackbar('Contato apagado com sucesso!', { variant: 'success' });
            closeDrawer();
            refresh?.();
        } catch (error) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao apagar contato. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Ops! Algo deu errado ao apagar o contato. Tente novamente!', { variant: 'error' });
        }
    };

    const handleConfirmEditContact = () => {
        if (editingContact && validateForm()) {
            setContacts((prevContacts) => {
            const updatedContacts = prevContacts.map(contact => 
                contact.contactCode === editingContact.contactCode
                ? { ...contact, description: formData.description, phone: formData.phone, email: formData.email, emergencyContact: formData.emergencyContact, emergencyPhone: formData.emergencyPhone }
                : contact
            );
            return updatedContacts;
            });

            setFormData({
                ...formData,
                description: '',
                phone: '',
                email: '',
                emergencyContact: '',
                emergencyPhone: '',
            });

            setEditingContact(null);
        }
    };

    const dynamicSteps = ['Dados Pessoais', 'Endereço', 'Contato'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name !== 'email' && name !== 'username' && value) {
            updatedValue = FormatName(value);
        }


        if ((name === 'phone' || name === 'emergencyPhone') && value) {
            updatedValue = FormatPhone(value);
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

        // Lógica para formatação e validação do documento de identidade
        if (name === 'identity' && value) {
            const numericValue = value.replace(/[^0-9]/g, '');
            const { formatted, isValid } = FormatAndValidateCPF(numericValue);
            
            // Atualiza o valor no estado com a formatação do documento
            setFormData(prevState => ({
                ...prevState,
                [name]: formatted // Atualiza o campo com o valor formatado
            }));
    
            // Atualiza o erro caso o documento seja inválido
            setErrors(prevErrors => ({
                ...prevErrors,
                identityError: isValid ? '' : 'CPF inválido'
            }));
            
            return; // Impede a atualização adicional de `formData` com o valor não formatado
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

    const validateForm = () => {
        const indicationCode = responseStudent?.findStudent.profileCode;

        let newErrors: EditInfosProfileProps['errors'] = {};
        newErrors = ValidateFormEditStudent(formData, activeStep, indicationCode, isIndication);
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
        if (contacts) {
            setIsLoading(true);
            try {
                const indicationCode = responseStudent?.findStudent.profileCode;
                const variables = EditProfileVariables(formData, contacts, indicationCode);
                await request(MutationEditProfile, variables);
                enqueueSnackbar('Alterações realizadas com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao atualizar seus dados. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                
                const genericError = 'Ops! Algo deu errado ao atualizar seus dados. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        } else {
            validateForm();
        }
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

    return {
        setFormData,
        setErrors,
        isLoading,
        formData,
        errors,
        activeStep,
        setActiveStep,
        dynamicSteps,
        isNoNumber,
        handleTextFieldChange,
        handleNoNumberToggle,
        handleBack,
        handleContinue,
        handleFinish,
        handleAddContact,
        contacts,
        handleEditContact,
        handleDeleteContact,
        editingContact,
        handleConfirmEditContact,
        focusedFields,
        handleFocus,
        genderOptions,
        stateMaritalOptions,
        handleSelectChange,
        referralSourceOptions,
        referralSelected,
        responseStudent
    };
};
