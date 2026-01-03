import { ChangeEvent, useState } from 'react';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps } from '../../../common/types';
import { FormatCash, FormatText, GetErrorMessage, ValidateFormReversedTransaction } from '../../../common/utils';
import { TransactionsProps } from '../components/Drawer/types';
import { MutationTransactionsUpSert } from '../components/Graphql';

export const useReversedTransactionForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refreshInternal
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [charactersRemaining, setCharactersRemaining] = useState<Record<string, number>>({
        reversedReason: 300, // Inicializa com o contador para o campo principal
    });
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));

    const [formData, setFormData] = useState<TransactionsProps['formData']>({
        reversed: data.reversed,
        reversedReason: data.reversedReason,
        reversedType: '',
    });

    const [errors, setErrors] = useState<TransactionsProps['errors']>({
        reversedError: '',
        reversedReasonError: '',
    });

    const dynamicSteps = [
            formData.reversedType ? formData.reversedType : 'Opções', 
            'Informações',
        ];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        updatedValue = FormatText(value);

        if (name === 'reversed') {
            updatedValue = FormatCash(value);
        
            const reversedValue = parseFloat(
                updatedValue.replace(/\./g, '').replace(',', '.')
            ) || 0;
        
            const mainAmountValue = parseFloat(
                data.mainAmount.replace(/\./g, '').replace(',', '.')
            ) || 0;
        
            const secondaryAmountValue = parseFloat(
                data.secondaryAmount.replace(/\./g, '').replace(',', '.')
            ) || 0;
        
            const maxAmount = mainAmountValue + secondaryAmountValue;
        
            if (reversedValue > maxAmount) {
                updatedValue = FormatCash(maxAmount.toFixed(2).toString().replace('.', ','));
            } else {
                const maxLength = (data.mainAmount + data.secondaryAmount).replace(/\D/g, '').length;
                const currentLength = updatedValue.replace(/\D/g, '').length;
        
                if (currentLength > maxLength) {
                    updatedValue = updatedValue.slice(0, updatedValue.length - 1);
                }
            }
        }

        if (name === 'reversedReason' && value.length <= 300) {
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

    const validateForm = () => {
        let newErrors: TransactionsProps['errors'] = {};
        newErrors = ValidateFormReversedTransaction(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleReversedSelected = (reversedType: string) => {
        setFormData((prevData) => ({
            ...prevData,
            reversedType,
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
                reversed: '',
                reversedReason: '',
            });

            setErrors({
                reversedError: '',
                reversedReasonError: '',
            });
        }

        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = {
                    data: {
                        operation: 'UPDATE',
                        input: {
                            transactionCode: Number(data.transactionCode),
                            action: 'REVERSED',
                            reversedUserCode: profileCode,
                            reversed: parseFloat(formData.reversed?.replace(/[R$.\s]/g, '').replace(',', '.') || '0'),
                            reversedReason: formData.reversedReason,
                        },
                    },
                }
    
                await request(MutationTransactionsUpSert, variables);
    
                enqueueSnackbar('Transação reembolsada com sucesso', { variant: 'success' });
                refreshInternal?.();
                closeDrawer();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao reembolsar transação. Entre em contato com nosso suporte.', { variant: 'error' });
                }
    
                const genericError = 'Ops! Algo deu errado ao reembolsar transação. Tente novamente!'
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
        handleTextFieldChange,
        handleReversedSelected,
        handleBack,
        handleContinue,
        handleFinish,
        charactersRemaining,
    };
};
