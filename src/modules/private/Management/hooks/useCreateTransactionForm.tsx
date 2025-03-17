import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps } from '../../../common/types';
import { FormatCash, FormatText, GetErrorMessage, ValidateFormCreateTransaction } from '../../../common/utils';
import { TransactionsProps } from '../components/Drawer/types';
import { MutationTransactionsUpSert } from '../components/Graphql';

export const useCreateTransactionForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refreshInternal
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const [attemptCount, setAttemptCount] = useState(0);

    const [formData, setFormData] = useState<TransactionsProps['formData']>({
        type: '',
        description: '',
        amount: '',
        dueDate: '',
    });

    const [errors, setErrors] = useState<TransactionsProps['errors']>({
        typeError: '',
        descriptionError: '',
        amountError: '',
    });

    const dynamicSteps = ['Informações'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let updatedValue = FormatText(value);

        if (name === 'amount') {
            updatedValue = FormatCash(value);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
            }));
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: updatedValue,
        }));

        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    const validateForm = () => {
        let newErrors: TransactionsProps['errors'] = {};
        newErrors = ValidateFormCreateTransaction(formData, activeStep);
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
                const variables = {
                    data: {
                        operation: 'CREATE',
                        input: {
                            type: formData.type,
                            issuerCode: companyCode,
                            originCode: profileCode,
                            recipientProfileCode: data.profileCode,
                            description: formData.description,
                            amount: parseFloat(formData.amount?.replace(/[R$.\s]/g, '').replace(',', '.') || '0'),
                            dueDate: formData.dueDate,
                        },
                    },
                }
    
                await request(MutationTransactionsUpSert, variables);
    
                enqueueSnackbar('Pagamento efetuado com sucesso!', { variant: 'success' });
                refreshInternal?.();
                closeDrawer();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao processar pagamento transação. Entre em contato com nosso suporte.', { variant: 'error' });
                }
    
                const genericError = 'Ops! Algo deu errado ao processar pagamento da transação. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value  // Atualiza o estado com o valor único
        }));
        
        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    return {
        setFormData,
        setErrors,
        isLoading,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        handleTextFieldChange,
        handleBack,
        handleContinue,
        handleFinish,
        handleSelectChange
    };
};
