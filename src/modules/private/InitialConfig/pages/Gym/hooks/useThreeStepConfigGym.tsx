import { StepThreeProps } from '../../../../../../pages/sign-up/gym/types';
import { GymConfigErrorStepThree } from '../../../../../../pages/sign-up/gym/types/gym-errors.types';
import { validateWorkForms } from '../../../../../../utils/validate-gym-configs';

export const useThreeStepConfigGym = (formData: StepThreeProps['formData'], setFormData: StepThreeProps['setFormData'], setErrors: StepThreeProps['setErrors']) => {

    const handleWorkFormChange = (workForm: string) => {
        setFormData(prevState => {
            const newWorkForms = prevState.workForms.includes(workForm)
                ? prevState.workForms.filter(selectedWorkForm => selectedWorkForm !== workForm)
                : [...prevState.workForms, workForm];

            return { ...prevState, workForms: newWorkForms };
        });
    };

    const validateForm = () => {
        const newErrors: GymConfigErrorStepThree = {
            workFormError: validateWorkForms(formData.workForms),
        };

        setErrors(newErrors);
        return !(
            newErrors.workFormError
        );
    };

    return {
        handleWorkFormChange,
        validateForm
    };
};
