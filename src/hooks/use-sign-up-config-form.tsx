import { useState } from 'react';
import { GymConfigErrorStepOne, GymConfigErrorStepTwo } from '../pages/sign-up/gym/types';
import { GymConfigErrorStepThree } from '../pages/sign-up/gym/types/gym-errors.types';
import { GymStepOneFormsConfig, GymStepOthersFormsConfig, GymStepThreeFormsConfig, GymStepTwoFormsConfig, PlansType } from '../pages/sign-up/gym/types/gym-forms-config.types';

const initialPlans: PlansType[] = [
    { label: 'Mensal', value: 1, description: 'Pagamento por mês.' },
    { label: 'Bimestral', value: 2, description: 'Pagamento a cada 2 meses.' },
    { label: 'Trimestral', value: 3, description: 'Pagamento a cada 3 meses.' },
    { label: 'Semestral', value: 6, description: 'Pagamento a cada 6 meses.' },
    { label: 'Anual', value: 12, description: 'Pagamento a cada 12 meses.' },
];

export const useGymConfigForms = () => {
    const [step, setStep] = useState(1);

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
        neighborhoodError: '',
        cepError: '',
        cityError: '',
        stateError: '',
    });

    const [stepTwoFormData, setStepTwoFormData] = useState<GymStepTwoFormsConfig>({
        address: '',
        number: '',
        complement: '',
        cep: '',
        neighborhood: '',
        city: '',
        state: '',
    });

    const [stepThreeErrors, setStepThreeErrors] = useState<GymConfigErrorStepThree>({
        workFormError: '',
        plansError: '',
    });

    const [stepThreeFormData, setStepThreeFormData] = useState<GymStepThreeFormsConfig>({
        workForms: ['Mensalidades'],
        plans: initialPlans
    });

    const handleContinue = () => {
        setStep((prevStep) => prevStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        step,
        setStep,
        formData,
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
        stepThreeFormData,
        setStepThreeFormData,
        handleContinue,
        handleBack,
    };
};
