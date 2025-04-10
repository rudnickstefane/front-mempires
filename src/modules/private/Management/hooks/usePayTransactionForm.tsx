import { useState } from 'react';
import { MutationCreatePaymentPreference } from '../../../common/graphql';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, PreferenceData } from '../../../common/types';
import { GetErrorMessage } from '../../../common/utils';

export const usePayTransactionForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const [preferenceCode, setPreferenceCode] = useState<PreferenceData | null>(null);

    const dynamicSteps = ['Informações', 'Pagamento'];

    const handleContinue = async () => {
        setIsLoading(true);
        try {
            const variables = {
                transactionCode: data.transactionCode,
                title: data.description,
                amount: Number(String(data.amount).replace(/\./g, '').replace(',', '.')),
                quantity: 1,
            }

            const response: PreferenceData = await request(MutationCreatePaymentPreference, variables);
            setPreferenceCode(response);

            setActiveStep((prevStep) => prevStep + 1);
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao seguir com pagamento. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao seguir com o pagamento. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFinish = async () => {
        closeDrawer();
    };

    return {
        isLoading,
        preferenceCode,
        activeStep,
        dynamicSteps,
        handleBack,
        handleContinue,
        handleFinish,
    };
};
