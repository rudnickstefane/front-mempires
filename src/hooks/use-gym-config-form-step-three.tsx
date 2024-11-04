import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { StepThreeProps } from '../pages/sign-up/gym/types';
import { GymConfigErrorStepThree } from '../pages/sign-up/gym/types/gym-errors.types';
import { PlansType } from '../pages/sign-up/gym/types/gym-plans.types';
import { validatePlans, validateWorkForms } from '../utils/validate-gym-configs';

const generatePeriodLabel = (months: number): string => {
    if (months === 1) return 'Mensal';
    if (months === 2) return 'Bimestral';
    if (months === 3) return 'Trimestral';
    if (months === 4) return 'Quadrimestral';
    if (months === 6) return 'Semestral';
    if (months === 12) return 'Anual';
    if (months === 24) return 'Bienal';
    return `${months} Meses`;
};

const generatePeriodDescription = (months: number): string => {
    if (months === 1) return 'Pagamento por mês.';
    if (months === 2) return 'Pagamento a cada 2 meses.';
    if (months === 3) return 'Pagamento a cada 3 meses.';
    if (months === 4) return 'Pagamento a cada 4 meses.';
    if (months === 6) return 'Pagamento a cada 6 meses.';
    if (months === 12) return 'Pagamento a cada 12 meses.';
    if (months === 24) return 'Pagamento a cada 24 meses.';
    return `Pagamento a cada ${months} meses.`;
};

export const useGymConfigFormStepThree = (formData: StepThreeProps['formData'], setFormData: StepThreeProps['setFormData'], setErrors: StepThreeProps['setErrors']) => {

    const [plans, setPlans] = useState<PlansType[]>(formData.plans || []);
    const [selectedPlans, setSelectedPlans] = useState<number | string>('');

    const handlePlanSelect = (event: SelectChangeEvent<number | string>) => {
        const value = event.target.value as number;
        const existingPeriod = plans.find(period => period.value === value);

        if (!existingPeriod) {
            const newPlan = { label: generatePeriodLabel(value), value, description: generatePeriodDescription(value) };
            const updatedPlans = [...plans, newPlan].sort((a, b) => a.value - b.value);
            setPlans(updatedPlans);

            setFormData(prevState => ({ ...prevState, plans: updatedPlans }));
        }

        setSelectedPlans('');
    };

    const handleRemovePlans = (value: number) => {
        const updatedPlans = plans.filter(plan => plan.value !== value);
        setPlans(updatedPlans);

        setFormData(prevState => ({ ...prevState, plans: updatedPlans }));
    };


    const handleWorkFormChange = (workForm: string) => {
        setFormData(prevState => {
            const newWorkForms = prevState.workForms.includes(workForm)
                ? prevState.workForms.filter(selectedWorkForm => selectedWorkForm !== workForm)
                : [...prevState.workForms, workForm];

            return { ...prevState, workForms: newWorkForms };
        });
    };

    const validateForm = () => {
        const plans = formData.plans ? formData.plans.map(plan => plan.label) : [];

        const newErrors: GymConfigErrorStepThree = {
            workFormError: validateWorkForms(formData.workForms),
            plansError: validatePlans(plans)
        };

        setErrors(newErrors);
        return !(
            newErrors.workFormError ||
            newErrors.plansError
        );
    };

    return {
        plans,
        selectedPlans,
        handlePlanSelect,
        handleRemovePlans,
        handleWorkFormChange,
        validateForm
    };
};
