import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps } from '../../../common/types';
import { FormatCash, GetErrorMessage, ValidateFormReceiveTransaction } from '../../../common/utils';
import { TransactionsProps } from '../components/Drawer/types';
import { MutationTransactionsUpSert } from '../components/Graphql';

export const useEditTransactionForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refreshInternal
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const [proofPayment, setImage] = useState<string>('');
    const [fileName, setFileName] = useState<string | null>(null);

    const [formData, setFormData] = useState<TransactionsProps['formData']>({
        description: data.description,
        type: data.type,
        reversed: data.reversed,
        reversedReason: data.reversedReason,
        receiveType: '',
        paymentMethod: '',
        secondaryPaymentMethod: '',
        amount: data.amount,
        dueDate: data.dueData,
        change: '',
        fees: '',
        mainAmount: '',
        secondaryAmount: '',
        missingValue: '',
        rewardsCredit: '',
        proofPayment: proofPayment,
        yesConvert: false,
        noConvert: true,
    });

    const [errors, setErrors] = useState<TransactionsProps['errors']>({
        reversedError: '',
        reversedReasonError: '',
        paymentMethodError: '',
        secondaryPaymentMethodError: '',
        mainAmountError: '',
        secondaryAmountError: '',
    });

    const dynamicSteps = ['Informações'];

    const handleProofPaymentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                setFileName(file.name); // Armazena o nome do arquivo
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteProofPayment = () => {
        setImage('');
    };

    const handleReversedSelected = (receiveType: string) => {
        setFormData((prevData) => ({
            ...prevData,
            receiveType,
        }));

        setActiveStep((prevStep) => prevStep + 1);
    };

    const [selectedRewardsValue, setSelectedRewardsValue] = useState(formData.yesConvert ? 'yesConvert' : 'noConvert');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // Atualiza os estados com base no nome do rádio
        if (name === 'rewards') {
            setSelectedRewardsValue(value);
        }

        setFormData(prevState => ({
            ...prevState,
        }));

        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const updatedValue = FormatCash(value);
        const newUpdatedValue = parseFloat(
            updatedValue.replace(/\./g, '').replace(',', '.')
        ) || 0;

        const totalTransaction = parseFloat(
            data.amount.replace(/\./g, '').replace(',', '.')
        ) || 0;

        const totalRewards = parseFloat(
            data.rewardsCredit.replace(/\./g, '').replace(',', '.')
        ) || 0;

        let mainAmount = formData.mainAmount ? parseFloat(formData.mainAmount.replace(/\./g, '').replace(',', '.')) : 0;
        let secondaryAmount = formData.secondaryAmount
        ? parseFloat(formData.secondaryAmount.replace(/\./g, '').replace(',', '.'))
        : 0;
        const fees = formData.fees ? parseFloat(formData.fees.replace(/\./g, '').replace(',', '.')) : 0;

        let change = 0;
        let amount = 0;
        let missingValue = 0;

        if (name === 'mainAmount') {
            mainAmount = newUpdatedValue;

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
            }));
        }

        if (name === 'secondaryAmount') {
            secondaryAmount = newUpdatedValue;
            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
            }));
        }

        // Caso combinePaymentMethod seja false e paymentMethod seja REWARDS_CREDIT
        if (!combinePaymentMethod && formData.paymentMethod === 'REWARDS_CREDIT') {
            if (name === 'mainAmount') {
                mainAmount = newUpdatedValue;
        
                if (mainAmount > totalRewards) {
                    mainAmount = totalRewards;
                }
            }

            amount = fees + mainAmount + secondaryAmount;

            if (amount < totalTransaction) {
                // Caso o valor total inserido seja menor que o totalTransaction, calcular o valor faltante
                missingValue = totalTransaction - amount;
            } else if (amount > totalTransaction) {
                change = totalTransaction + fees - mainAmount - secondaryAmount;
            }

            setFormData((prevState) => ({
                ...prevState,
                [name]: updatedValue,
                change: FormatCash(change.toFixed(2)),
                amount: FormatCash(amount.toFixed(2)),
                mainAmount: FormatCash(mainAmount.toFixed(2)),
                missingValue: FormatCash(missingValue.toFixed(2)),
            }));
            return;
        }

        // Caso combinePaymentMethod seja true e paymentMethod seja REWARDS_CREDIT
        if (combinePaymentMethod &&
            formData.paymentMethod === 'REWARDS_CREDIT' &&
            formData.secondaryPaymentMethod !== 'CASH' &&
            formData.secondaryPaymentMethod !== ''
        ) {
            if (name === 'mainAmount') {
                mainAmount = newUpdatedValue;
        
                if (mainAmount > totalRewards) {
                    mainAmount = totalRewards;
                    secondaryAmount = totalTransaction - mainAmount
                } else {
                    secondaryAmount = totalTransaction - mainAmount;
                }
            }

            amount = fees + mainAmount + secondaryAmount;

            if (amount < totalTransaction) {
                // Caso o valor total inserido seja menor que o totalTransaction, calcular o valor faltante
                missingValue = totalTransaction - amount;
            } else if (amount > totalTransaction) {
                change = totalTransaction + fees - mainAmount - secondaryAmount;
            }

            setFormData((prevState) => ({
                ...prevState,
                [name]: updatedValue,
                change: FormatCash(change.toFixed(2)),
                amount: FormatCash(amount.toFixed(2)),
                mainAmount: FormatCash(mainAmount.toFixed(2)),
                secondaryAmount: FormatCash(secondaryAmount.toFixed(2)),
                missingValue: FormatCash(missingValue.toFixed(2)),
            }));
            return;
        }

        // Caso combinePaymentMethod seja true e secondaryPaymentMethod seja REWARDS_CREDIT
        if (combinePaymentMethod && formData.secondaryPaymentMethod === 'REWARDS_CREDIT') {
            if (name === 'secondaryAmount') {
                secondaryAmount = newUpdatedValue;
        
                if (secondaryAmount > totalRewards) {
                    secondaryAmount = totalRewards;
                    mainAmount = totalTransaction - secondaryAmount
                } else {
                    mainAmount = totalTransaction - secondaryAmount;
                }
            }

            amount = fees + mainAmount + secondaryAmount;

            if (amount < totalTransaction) {
                // Caso o valor total inserido seja menor que o totalTransaction, calcular o valor faltante
                missingValue = totalTransaction - amount;
            } else if (amount > totalTransaction) {
                change = totalTransaction + fees - mainAmount - secondaryAmount;
            }

            setFormData((prevState) => ({
                ...prevState,
                [name]: updatedValue,
                change: FormatCash(change.toFixed(2)),
                amount: FormatCash(amount.toFixed(2)),
                mainAmount: FormatCash(mainAmount.toFixed(2)),
                secondaryAmount: FormatCash(secondaryAmount.toFixed(2)),
                missingValue: FormatCash(missingValue.toFixed(2)),
            }));
            return;
        }

        // Caso combinePaymentMethod seja false e paymentMethod seja CASH
        if (!combinePaymentMethod && formData.paymentMethod === 'CASH') {
            amount = fees + mainAmount + secondaryAmount;

            if (amount < totalTransaction) {
                // Caso o valor total inserido seja menor que o totalTransaction, calcular o valor faltante
                missingValue = totalTransaction - amount;
            } else if (amount > totalTransaction) {
                change = totalTransaction + fees - mainAmount - secondaryAmount;
            }

            setFormData((prevState) => ({
                ...prevState,
                [name]: updatedValue,
                change: FormatCash(change.toFixed(2)),
                amount: FormatCash(newUpdatedValue.toFixed(2)),
                missingValue: FormatCash(missingValue.toFixed(2)),
            }));
            return;
        }

        // Caso combinePaymentMethod seja true, e paymentMethod seja CASH e secondaryPaymentMethod não for CASH
        if (
            combinePaymentMethod &&
            formData.paymentMethod === 'CASH' &&
            (formData.secondaryPaymentMethod !== 'CASH' && formData.secondaryPaymentMethod !== '')
        ) {
            if (name === 'secondaryAmount') {
                secondaryAmount = newUpdatedValue;
        
                if (secondaryAmount > totalTransaction) {
                    secondaryAmount = totalTransaction;
                    mainAmount = 0;
                }
            }

            amount = fees + mainAmount + secondaryAmount;

            if (amount < totalTransaction) {
                // Caso o valor total inserido seja menor que o totalTransaction, calcular o valor faltante
                missingValue = totalTransaction - amount;
            } else if (amount > totalTransaction) {
                change = totalTransaction + fees - mainAmount - secondaryAmount;
            }

            setFormData((prevState) => ({
                ...prevState,
                mainAmount: FormatCash(mainAmount.toFixed(2)),
                secondaryAmount: FormatCash(secondaryAmount.toFixed(2)),
                change: FormatCash(change.toFixed(2)),
                amount: FormatCash(amount.toFixed(2)),
                missingValue: FormatCash(missingValue.toFixed(2)), // Soma de mainAmount e secondaryAmount
            }));
            return;
        }

        // Caso combinePaymentMethod seja true, e secondaryPaymentMethod seja CASH e paymentMethod não for CASH
        if (
            combinePaymentMethod &&
            formData.secondaryPaymentMethod === 'CASH' &&
            formData.paymentMethod !== 'CASH' && formData.paymentMethod !== ''
        ) {
            if (name === 'mainAmount') {
                mainAmount = newUpdatedValue;
        
                if (mainAmount > totalTransaction) {
                    mainAmount = totalTransaction;
                    secondaryAmount = 0;
                }
            }

            amount = fees + secondaryAmount + mainAmount;

            if (amount < totalTransaction) {
                // Caso o valor total inserido seja menor que o totalTransaction, calcular o valor faltante
                missingValue = totalTransaction - amount;
            } else if (amount > totalTransaction) {
                // Caso o valor total inserido seja maior que o totalTransaction, calcular o troco
                change = totalTransaction + fees - secondaryAmount - mainAmount;
            }

            setFormData((prevState) => ({
                ...prevState,
                mainAmount: FormatCash(mainAmount.toFixed(2)),
                secondaryAmount: FormatCash(secondaryAmount.toFixed(2)),
                change: FormatCash(change.toFixed(2)),
                amount: FormatCash(amount.toFixed(2)),
                missingValue: FormatCash(missingValue.toFixed(2)),
            }));
            return;
        }

        // Caso combinePaymentMethod seja true, e paymentMethod não for CASH e secondaryPaymentMethod não for CASH
        if (
            combinePaymentMethod &&
            formData.secondaryPaymentMethod !== 'CASH' &&
            formData.secondaryPaymentMethod !== '' &&
            formData.paymentMethod !== 'CASH'
        ) {
            if (name === 'mainAmount') {
                mainAmount = newUpdatedValue;
        
                if (mainAmount > totalTransaction) {
                    mainAmount = totalTransaction;
                    secondaryAmount = 0;
                } else {
                    secondaryAmount = totalTransaction - mainAmount;
                }
            }
        
            if (name === 'secondaryAmount') {
                secondaryAmount = newUpdatedValue;
        
                if (secondaryAmount > totalTransaction) {
                    secondaryAmount = totalTransaction;
                    mainAmount = 0;
                } else {
                    mainAmount = totalTransaction - secondaryAmount;
                }
            }

            amount = fees + secondaryAmount + mainAmount;

            const totalAllocated = mainAmount + secondaryAmount;

            if (totalAllocated > totalTransaction) {
                if (name === 'mainAmount') {
                    mainAmount = newUpdatedValue;
                    secondaryAmount = totalTransaction - mainAmount;
                } else if (name === 'secondaryAmount') {
                    secondaryAmount = newUpdatedValue;
                    mainAmount = totalTransaction - secondaryAmount;
                }
            }

            mainAmount = Math.max(0, mainAmount);
            secondaryAmount = Math.max(0, secondaryAmount);

            if (amount < totalTransaction) {
                // Caso o valor total inserido seja menor que o totalTransaction, calcular o valor faltante
                missingValue = totalTransaction - amount;
            } else if (amount > totalTransaction) {
                // Caso o valor total inserido seja maior que o totalTransaction, calcular o troco
                change = totalTransaction + fees - secondaryAmount - mainAmount;
            }

            setFormData((prevState) => ({
                ...prevState,
                mainAmount: FormatCash(mainAmount.toFixed(2)),
                secondaryAmount: FormatCash(secondaryAmount.toFixed(2)),
                amount: FormatCash(amount.toFixed(2)),
                change: FormatCash(change.toFixed(2)),
                missingValue: FormatCash(missingValue.toFixed(2)),
            }));
            return;
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: updatedValue,
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        setFormData((prevState) => {
            type PaymentMethod = "CASH" | "REWARDS_CREDIT" | "CARD" | "PIX" | "BANK_TRANSFER";

            if (
                name === "paymentMethod" &&
                (value as PaymentMethod) !== "CASH" &&
                (value as PaymentMethod) !== "REWARDS_CREDIT" &&
                !combinePaymentMethod
            ) {
                return {
                    ...prevState,
                    [name]: value,
                    amount: data.amount,
                };
            }

            // Verifica se o método principal está sendo alterado e limpa o secundário se houver conflito
            if (name === 'paymentMethod' && prevState.secondaryPaymentMethod !== 'CARD') {
                return {
                    ...prevState,
                    [name]: value,
                    secondaryPaymentMethod: '',
                    mainAmount: '', // Limpa o método secundário
                    amount: '',
                };
            }

            if (name === 'paymentMethod') {
                return {
                    ...prevState,
                    [name]: value,
                    amount: '',
                    secondaryAmount: '',
                    mainAmount: '',
                    missingValue: '',
                };
            }

            if (name === 'secondaryPaymentMethod') {
                return {
                    ...prevState,
                    [name]: value,
                    secondaryAmount: '', // Limpa o método secundário
                    amount: '',
                    mainAmount: '',
                };
            }

            return { ...prevState, [name]: value };
        });
        
        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    const validateForm = () => {
        let newErrors: TransactionsProps['errors'] = {};
        newErrors = ValidateFormReceiveTransaction(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (validateForm()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep === 1) {
            setCombinePaymentMethod(false);
            setImage('');

            setFormData({
                reversed: '',
                reversedReason: '',
                amount: '',
                mainAmount: '',
                secondaryAmount: '',
                missingValue: '',
                change: '',
                paymentMethod: '',
                secondaryPaymentMethod: ''
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

            const changeOrRewards = parseFloat(formData.change?.replace(/[R$.\s]/g, '').replace(',', '.') || '0');
            const rewardsCredit = selectedRewardsValue === 'yesConvert' ? changeOrRewards : 0;
            const change = selectedRewardsValue === 'noConvert' ? changeOrRewards : 0;

            try {
                const variables = {
                    data: {
                        operation: 'UPDATE',
                        input: {
                            transactionCode: Number(data.transactionCode),
                            action: 'RECEIVE',
                            mainAmount: parseFloat(formData.mainAmount?.replace(/[R$.\s]/g, '').replace(',', '.') || '0'),
                            secondaryAmount: parseFloat(formData.secondaryAmount?.replace(/[R$.\s]/g, '').replace(',', '.') || '0'),
                            proofPayment: proofPayment,
                            change,
                            paymentMethod: formData.paymentMethod,
                            secondaryPaymentMethod: formData.secondaryPaymentMethod,
                            rewardsCredit,
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

    const [combinePaymentMethod, setCombinePaymentMethod] = useState(false);

    const handlePaymentMethodToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setCombinePaymentMethod(e.target.checked);

        const checked = e.target.checked;

        if (!checked && formData.paymentMethod !== 'CASH') {
            setFormData((prevState) => ({
                ...prevState,
                secondaryAmount: '',
                secondaryPaymentMethod: '',
                change: '',
                amount: '',
                mainAmount: '',
                missingValue: '',
            }));
        }

        if (checked && formData.paymentMethod !== 'CASH') {
            setFormData((prevState) => ({
                ...prevState,
                secondaryAmount: '',
                secondaryPaymentMethod: '',
                change: '',
                amount: data.amount,
                mainAmount: '',
                missingValue: '',
            }));
        }

        if (checked || !checked) {
            setFormData((prevState) => ({
                ...prevState,
                paymentMethod: '',
                secondaryAmount: '',
                secondaryPaymentMethod: '',
                change: '',
                amount: '',
                mainAmount: '',
                missingValue: '',
            }));
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getPaymentMethodLabel = (method: any) => {
        switch (method) {
            case 'CASH':
                return 'Dinheiro';
            case 'CARD':
                return 'Cartão';
            case 'BANK_TRANSFER':
                return 'Transferência Bancária';
            case 'PIX':
                return 'Pix';
            case 'REWARDS_CREDIT':
                return  'iFlex Rewards';
            default:
            return '';
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
        handleBack,
        handleContinue,
        handleFinish,
        handleSelectChange,
        handleReversedSelected,
        handlePaymentMethodToggle,
        setCombinePaymentMethod,
        combinePaymentMethod,
        getPaymentMethodLabel,
        handleProofPaymentUpload,
        proofPayment,
        fileName,
        handleDeleteProofPayment,
        handleRadioChange,
        selectedRewardsValue
    };
};
