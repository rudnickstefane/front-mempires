import { enqueueSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GymConfigErrorStepOne, GymConfigErrorStepTwo } from '../../../../../../pages/sign-up/gym/types';
import { GymConfigErrorStepFour, GymConfigErrorStepThree } from '../../../../../../pages/sign-up/gym/types/gym-errors.types';
import { GymStepOneFormsConfig, GymStepOthersFormsConfig, GymStepThreeFormsConfig, GymStepTwoFormsConfig } from '../../../../../../pages/sign-up/gym/types/gym-forms-config.types';
import { validateSegmentsForm, validateServicesForm } from '../../../../../../utils/validate-gym-configs';
import { useAuthorization } from '../../../../../common/hooks';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { InitialConfigureResponse } from '../../../../../common/types';
import { GetErrorMessage } from '../../../../../common/utils';
import { MutationInitialConfigure } from '../graphql';
import { InitialConfigGymVariables } from '../utils';

export const useSignUpConfigGym = () => {
    const { request } = useBackendForFrontend();
    const navigate = useNavigate();
    const name = localStorage.getItem('@iflexfit:name');
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [gymConfiguredData, setGymConfiguredData] = useState<{
        id: string;
        profileCode: string;
        companyCode: number;
        createdAt: string;
        updatedAt: string;
        status: string;
    } | null>(null);
    
    const isAuthorized = useAuthorization(true);

    const [formData, setFormData] = useState<GymStepOthersFormsConfig>({
        selectedModalities: [],
        selectedServices: [],
        selectedSegments: [],
    });

    const [stepOneErrors, setStepOneErrors] = useState<GymConfigErrorStepOne>({
        startTimeMondayToFridayError: '',
        endTimeMondayToFridayError: '',
        startTimeSaturdayError: '',
        endTimeSaturdayError: '',
        startTimeSundayError: '',
        endTimeSundayError: '',
        dayError: '',
        timeZoneError: '',
    });

    const [stepOneFormData, setStepOneFormData] = useState<GymStepOneFormsConfig>({
        startTimeMondayToFriday: '',
        endTimeMondayToFriday: '',
        startTimeSaturday: '',
        endTimeSaturday: '',
        startTimeSunday: '',
        endTimeSunday: '',
        timeZone: '',
        selectedDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        isPersonalizable: false,
        is24Hours: false,
    });

    const [stepTwoErrors, setStepTwoErrors] = useState<GymConfigErrorStepTwo>({
        addressError: '',
        numberError: '',
        complementError: '',
        districtError: '',
        zipCodeError: '',
        cityError: '',
        stateError: '',
    });

    const [stepTwoFormData, setStepTwoFormData] = useState<GymStepTwoFormsConfig>({
        address: '',
        number: '',
        complement: '',
        zipCode: '',
        district: '',
        city: '',
        state: '',
    });

    const [stepThreeErrors, setStepThreeErrors] = useState<GymConfigErrorStepThree>({
        workFormError: '',
        plansError: '',
    });

    const [stepFourErrors, setStepFourErrors] = useState<GymConfigErrorStepFour>({
        modalitiesError: '',
        servicesError: '',
        segmentsError: ''
    });

    const [stepThreeFormData, setStepThreeFormData] = useState<GymStepThreeFormsConfig>({
        workForms: ['Mensalidades']
    });

    const handleContinue = () => {
        setStep((prevStep) => prevStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const allFormData = useMemo(() => {
        return {
            companyCode: companyCode,
            ...formData,
            ...stepOneFormData,
            ...stepTwoFormData,
            ...stepThreeFormData,
        };
    }, [formData, stepOneFormData, stepTwoFormData, stepThreeFormData, companyCode]);

    const validateForm = () => {
        const newErrors: GymConfigErrorStepFour = {
            servicesError: validateServicesForm(formData.selectedServices),
            segmentsError: validateSegmentsForm(formData.selectedSegments),
        };

        setStepFourErrors(newErrors);
        return !(
            newErrors.servicesError,
            newErrors.segmentsError
        );
    };

    const handleFinish = async () => {
        setIsLoading(true);

        if (validateForm()) {
            try {
                const variables = InitialConfigGymVariables(allFormData);
                const response: InitialConfigureResponse = await request(MutationInitialConfigure, variables);

                const gymConfigured = response.initialConfigure;
                setGymConfiguredData(gymConfigured);

                setStep((prevStep) => prevStep + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao configurar sua academia. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao configurar sua academia. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }

        setIsLoading(false);
    };

    const handleAccess = () => {
        if (gymConfiguredData) {
            localStorage.setItem('@iflexfit:status', 'ACTIVE');
            navigate('/gestao');
        }
    };
    

    return {
        step,
        name,
        setStep,
        formData,
        isLoading,
        setFormData,
        stepOneErrors,
        setStepOneErrors,
        stepOneFormData,
        setStepOneFormData,
        stepTwoErrors,
        setStepTwoErrors,
        stepTwoFormData,
        setStepTwoFormData,
        stepThreeErrors,
        setStepThreeErrors,
        stepFourErrors,
        setStepFourErrors,
        stepThreeFormData,
        setStepThreeFormData,
        handleContinue,
        handleFinish,
        handleAccess,
        handleBack,
        isAuthorized,
    };
};
