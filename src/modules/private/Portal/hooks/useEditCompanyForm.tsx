/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { APIS } from '../../../common/configs/apis.config';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindCompanyDetailsResponse } from '../../../common/types';
import { EditCompanyVariables, FormatAndValidateCNPJ, FormatIdentity, FormatName, FormatPhone, FormatZipCode, GetErrorMessage, ValidateFormEditCompany } from '../../../common/utils';
import { EditInfosCompanyProps } from '../components/Drawer/types/EditInfosCompanyProps.type';
import { MutationDeleteContact, MutationEditCompany } from '../components/Graphql';

export const  useEditCompanyForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
}: DrawerProps & { data: FindCompanyDetailsResponse }) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [isNoNumber, setIsNoNumber] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const [contacts, setContacts] = useState(data?.findCompanyDetails.contact ?? []);
    const [editingContact, setEditingContact] = useState<null | { contactCode: string, description: string, phone: string, email: string }>(null);

    const [formData, setFormData] = useState<EditInfosCompanyProps['formData']>({
        origin: 'COMPANY',
        companyCode: companyCode,
        profileCode: profileCode,
        fantasyName: data?.findCompanyDetails.fantasyName ?? '',
        birthDate: data?.findCompanyDetails.birthDate
            ? data.findCompanyDetails.birthDate.split('/').reverse().join('-')
            : '',
            code: data?.findCompanyDetails.code
            ? FormatIdentity(data.findCompanyDetails.code) : '',
        username: data?.findCompanyDetails.username ?? '',
        address: data?.findCompanyDetails.address ?? '',
        number: data?.findCompanyDetails.number ?? '',
        complement: data?.findCompanyDetails.complement ?? '',
        zipCode: data?.findCompanyDetails.zipCode
            ? FormatZipCode(data?.findCompanyDetails.zipCode)
            : '',
        district: data?.findCompanyDetails.district ?? '',
        city: data?.findCompanyDetails.city ?? '',
        state: data?.findCompanyDetails.state ?? '',
        description: '',
        phone: '',
        email: '',
    } as EditInfosCompanyProps['formData']);

    const [errors, setErrors] = useState<EditInfosCompanyProps['errors']>({
        fantasyNameError: '',
        birthDateError: '',
        codeError: '',
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
            setContacts((prevContacts: any[]) => {
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
            setContacts((prevContacts: any[]) => {
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

    const dynamicSteps = ['Dados Pessoais', 'Endereço', 'Contato'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name !== 'email') {
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
        if (name === 'code' && value) {
            const numericValue = value.replace(/[^0-9]/g, '');
            const { formatted, isValid } = FormatAndValidateCNPJ(numericValue);
            
            // Atualiza o valor no estado com a formatação do documento
            setFormData(prevState => ({
                ...prevState,
                [name]: formatted // Atualiza o campo com o valor formatado
            }));
    
            // Atualiza o erro caso o documento seja inválido
            setErrors(prevErrors => ({
                ...prevErrors,
                codeError: isValid ? '' : 'CNPJ inválido'
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
        let newErrors: EditInfosCompanyProps['errors'] = {};
        newErrors = ValidateFormEditCompany(formData, activeStep);
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
                const variables = EditCompanyVariables(formData, contacts);
                await request(MutationEditCompany, variables);
                enqueueSnackbar('Alterações realizadas com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao atualizar os dados. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                
                const genericError = 'Ops! Algo deu errado ao atualizar os dados. Tente novamente!'
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
        handleAddContact,
        contacts,
        handleEditContact,
        handleDeleteContact,
        editingContact,
        handleConfirmEditContact,
      };
};
