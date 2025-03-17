import axios from 'axios';
import debounce from 'lodash.debounce';
import { ChangeEvent, useCallback, useState } from 'react';
import { APIS } from '../../../common/configs/apis.config';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindCheckUsernameAvailabilityResponse, FindProfileDetailsResponse } from '../../../common/types';
import { EditProfileVariables, FormatAndValidateCPF, FormatIdentity, FormatName, FormatPhone, FormatZipCode, GetErrorMessage, ValidateFormEditProfile } from '../../../common/utils';
import { EditInfosProfileProps } from '../components/Drawer/types/EditInfosProfileProps.type';
import { MutationDeleteContact, MutationEditProfile, QueryCheckUsernameAvailability } from '../components/Graphql';

export const  useEditProfileForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
}: DrawerProps & { data: FindProfileDetailsResponse }) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [isNoNumber, setIsNoNumber] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const [contacts, setContacts] = useState(data?.findProfileDetails.contact ?? []);
    const [editingContact, setEditingContact] = useState<null | { contactCode: string, description: string, phone: string, email: string }>(null);

    const [formData, setFormData] = useState<EditInfosProfileProps['formData']>({
        origin: 'PROFILE',
        profileCode: profileCode,
        name: data?.findProfileDetails.name ?? '',
        birthDate: data?.findProfileDetails.birthDate
            ? data.findProfileDetails.birthDate.split('/').reverse().join('-')
            : '',
        identity: data?.findProfileDetails.identity
            ? FormatIdentity(data.findProfileDetails.identity) : '',
        username: data?.findProfileDetails.username ?? '',
        address: data?.findProfileDetails.address ?? '',
        number: data?.findProfileDetails.number ?? '',
        complement: data?.findProfileDetails.complement ?? '',
        zipCode: data?.findProfileDetails.zipCode
            ? FormatZipCode(data?.findProfileDetails.zipCode)
            : '',
        district: data?.findProfileDetails.district ?? '',
        city: data?.findProfileDetails.city ?? '',
        state: data?.findProfileDetails.state ?? '',
        description: '',
        phone: '',
        email: '',
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
                email: ''
            }));
        }
    };

    const handleEditContact = (contact: { contactCode: string, description: string, phone: string, email: string }) => {
        setEditingContact(contact);
        setFormData({
            ...formData,
            description: contact.description,
            phone: contact.phone,
            email: contact.email,
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
                ? { ...contact, description: formData.description, phone: formData.phone, email: formData.email }
                : contact
            );
            return updatedContacts;
            });

            setFormData({
                ...formData,
                description: '',
                phone: '',
                email: ''
            });

            setEditingContact(null);
        }
    };

    const [debouncedUsername, setDebouncedUsername] = useState('');
    const [lastCheckedUsername, setLastCheckedUsername] = useState('');

    const dynamicSteps = ['Dados Pessoais', 'Endereço', 'Contato'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name !== 'email' && name !== 'username' && value) {
            updatedValue = FormatName(value);
        }

        if (name === 'username' && value) {
            const updatedValue = value.trim();
        
            // Verifica se o valor tem pelo menos 5 caracteres
            if (updatedValue.length < 5) {
                setFormData(prevState => ({
                    ...prevState,
                    username: updatedValue
                }));
        
                setErrors(prevErrors => ({
                    ...prevErrors,
                    usernameError: 'O nome de usuário deve ter no mínimo 5 caracteres.'
                }));
        
                // Resetar estados relacionados à verificação de username
                setIsCheckingUsername(false);
                setIsUsernameAvailable(false);
                return; // Interrompe a execução para valores inválidos
            }
        
            // Se o valor for válido, remove o erro e prossegue
            setFormData(prevState => ({
                ...prevState,
                username: updatedValue
            }));
        
            setErrors(prevErrors => ({
                ...prevErrors,
                usernameError: '' // Remove a mensagem de erro se for válido
            }));
        
            setIsCheckingUsername(true); // Ativa o estado de carregamento
            setIsUsernameAvailable(false); // Redefine a disponibilidade
            setDebouncedUsername(updatedValue); // Define o username para verificação
            if (debouncedUsername && debouncedUsername !== lastCheckedUsername) {
                const debouncedCheck = debounce(async () => {
                    await CheckUsername(debouncedUsername);
                    setLastCheckedUsername(debouncedUsername);
                }, 500);
                debouncedCheck();
                return () => debouncedCheck.cancel();
            }
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

    const CheckUsername = useCallback(async (username: string) => {
        try {
            const response: FindCheckUsernameAvailabilityResponse = await request(QueryCheckUsernameAvailability, { username });
    
            if (response.checkUsernameAvailability) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    usernameError: ''
                }));
                setIsUsernameAvailable(true);
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    usernameError: 'Nome de usuário não disponível.'
                }));
                setIsUsernameAvailable(false);
            }
        } catch (error) {
            setErrors(prevErrors => ({
                ...prevErrors,
                usernameError: 'Erro ao verificar nome de usuário. Tente novamente.'
            }));
            setIsUsernameAvailable(false);
        } finally {
            setIsCheckingUsername(false);
        }
    }, [request]);

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
        let newErrors: EditInfosProfileProps['errors'] = {};
        newErrors = ValidateFormEditProfile(formData, activeStep);
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
                const variables = EditProfileVariables(formData, contacts);
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
        isCheckingUsername,
        isUsernameAvailable,
        handleAddContact,
        contacts,
        handleEditContact,
        handleDeleteContact,
        editingContact,
        handleConfirmEditContact,
      };
};
