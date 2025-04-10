import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import makeAnimated from 'react-select/animated';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps } from '../../../common/types';
import { FormatText, GetErrorMessage, TicketValidateForm } from '../../../common/utils';
import { TicketsProps } from '../components/Drawer/types';
import { MutationNotificationUpsert } from '../pages/Gym/graphql';
import { MutationTicketUpsert } from '../pages/Gym/graphql/MutationTicketUpsert';
import { TicketUpsertVariables } from '../pages/Gym/utils';

export const useTicketCreateForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
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
        issuerUserCode: profileCode,
        issuerCompanyCode: companyCode,
        recipientUserCode: data?.recipientUserCode ? data.recipientUserCode : null,
        recipientCompanyCode: data?.recipientCompanyCode ? data.recipientCompanyCode : null,
        name: '',
        description: '',
        duration: '',
        observation: '',
        responsibleCode: '',
        scheduledAt: '',
        rescheduledAt: '',
        finishedAt: '',
        message: '',
        sentUserCode: profileCode,
        sentCompanyCode: companyCode,
        receivedUserCode: data?.recipientUserCode ? data.recipientUserCode : null,
        receivedCompanyCode: data?.recipientCompanyCode ? data.recipientCompanyCode : null,
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
                const ticket = {
                    action: 'TICKET_CREATE',
                    method: 'TICKET',
                    queue: formData.queue === 'GYM_SUPPORT' ? 'GYM_SUPPORT' : 'FINANCIAL',
                    type: 'IFLEXFIT',
                    category: 'PROTOCOL',
                    status: 'NEW',
                    priority: 'NORMAL',
                    sentMessage: true,
                    ...formData
                }

                const variables = TicketUpsertVariables(ticket);
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

    const handleSuggestionCreate = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const ticket = {
                    action: 'TICKET_CREATE',
                    queue: 'TRIAGE',
                    method: 'TICKET',
                    type: 'IFLEXFIT',
                    category: 'SUGGESTION',
                    status: 'NEW',
                    priority: 'NORMAL',
                    sentMessage: true,
                    ...formData
                }

                const variables = TicketUpsertVariables(ticket);
                await request(MutationTicketUpsert, variables);
                enqueueSnackbar('Sugestão enviada com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao enviar sugestão. Entre em contato por outro método de comunicação.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao enviar sugestão. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleMessageCreate = async (ticketCode: string) => {
        setIsLoading(true);
        try {
            const ticket = {
                action: 'TICKET_MESSAGE_CREATE',
                ticketCode: ticketCode,
                sentMessage: true,
                title: '',
                email: '',
                phone: '',
                observation: '',
                ...formData,
            }
            
            const variables = TicketUpsertVariables(ticket);
            await request(MutationTicketUpsert, variables);
            await notificationPush();
            enqueueSnackbar('Mensagem enviada com sucesso!', { variant: 'success' });
            refresh?.();
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao enviar mensagem. Entre em contato por outro método de comunicação.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao enviar mensagem. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const notificationPush = async () => {
        const variables = {
            input: {
                action: 'CREATE',
                title: `Resposta ao seu protocolo de nº ${data.ticketCode}`,
                description: `Você tem 1 mensagem não lida relacionada ao protocolo de nº ${data.ticketCode}. Para um atendimento mais ágil e eficiente, verifique-a o quanto antes.`,
                issuerUserCode: profileCode,
                issuerCompanyCode: companyCode,
                recipientUserCode: data?.recipientUserCode ? data.recipientUserCode : null,
                recipientCompanyCode: data?.recipientCompanyCode ? data.recipientCompanyCode : null,
                path: 'Support'
            },
        }

        await request(MutationNotificationUpsert, variables);
    };

    const notificationRead = useCallback(async() => {
        const variables = {
            input: {
                action: 'READ_MESSAGE',
                recipientUserCode: profileCode,
                recipientCompanyCode: companyCode,
                title: `Resposta ao seu protocolo de nº ${data.ticketCode}`,
            },
        }

        await request(MutationNotificationUpsert, variables);
    }, [companyCode, data?.ticketCode, profileCode, request]);
        
    useEffect(() => {
        // Configura o intervalo para chamar a cada 30 segundos
        const intervalId = setInterval(() => {
            refresh?.();
            notificationRead?.();
        }, 30 * 1000); // 30 segundos em milissegundos

        // Limpa o intervalo quando o componente desmontar
        return () => clearInterval(intervalId);
    }, [notificationRead, refresh]);

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
        handleSuggestionCreate,
        charactersRemaining,
        handleMessageCreate,
    };
};
