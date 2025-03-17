import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import makeAnimated from 'react-select/animated';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps } from '../../../common/types';
import { FormatText, GetErrorMessage, TicketValidateForm } from '../../../common/utils';
import { TicketsProps } from '../components/Drawer/types';
import { MutationTicketUpsert } from '../pages/Gym/graphql/MutationTicketUpsert';
import { TicketUpsertVariables } from '../pages/Gym/utils';

export const useTicketCreateForm = ({
    closeDrawer,
    enqueueSnackbar,
    refresh,
}: DrawerProps) => {
    
    const { request } = useBackendForFrontend();
    const animatedComponents = makeAnimated();
    const [charactersRemaining, setCharactersRemaining] = useState(300);
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep] = useState(0);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const [attemptCount, setAttemptCount] = useState(0);

    const queueOptions = [
        { value: 'noSelect', label: 'Selecione uma área abaixo', isDisabled: true },
        { value: 'GYM_SUPPORT', label: 'Atendimento & Suporte' },
        { value: 'FINANCIAL', label: 'Financeiro' },
    ];

    const [formData, setFormData] = useState<TicketsProps['formData']>({
        action: 'TICKET_CREATE',
        issuerUserCode: profileCode,
        issuerCompanyCode: companyCode,
        recipientUserCode: '',
        recipientCompanyCode: '',
        name: '',
        description: '',
        method: 'TICKET',
        queue: '',
        type: 'IFLEXFIT',
        category: 'PROTOCOL',
        status: 'NEW',
        priority: 'NORMAL',
        sentMessage: false,
        duration: '',
        observation: '',
        responsibleCode: '',
        scheduledAt: '',
        rescheduledAt: '',
        finishedAt: '',
        message: '',
        sentUserCode: profileCode,
        sentCompanyCode: companyCode,
        receivedUserCode: '',
        receivedCompanyCode: '',
    });

    const [errors, setErrors] = useState<TicketsProps['errors']>({
        queueError: '',
        messageError: '',
    });

    const dynamicSteps = ['Informações'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedValue = FormatText(value);

        if (name === 'message' && value.length <= 300) {
            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
            }));
            setCharactersRemaining(300 - value.length);
        }

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

    const handleSelectMuiChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value, 
        }));

        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    const validateForm = () => {
        let newErrors: TicketsProps['errors'] = {};
        newErrors = TicketValidateForm(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = TicketUpsertVariables(formData);
                await request(MutationTicketUpsert, variables);
                enqueueSnackbar('Protocolo aberto com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao abrir protocolo. Entre em contato por outro método de comunicação.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao abrir protocolo. Tente novamente!'
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
        formData,
        errors,
        activeStep,
        dynamicSteps,
        queueOptions,
        animatedComponents,
        handleTextFieldChange,
        handleSelectMuiChange,
        handleFinish,
        charactersRemaining,
    };
};
