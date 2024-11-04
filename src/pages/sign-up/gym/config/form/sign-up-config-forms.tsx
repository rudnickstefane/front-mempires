import { useGymConfigForms } from '../../../../../hooks/use-sign-up-config-form';
import { StepHeader, StepIcons, StepOne, StepThree, StepTwo } from '../step';
import { StepFinished } from '../step/sign-up-gym-config-step-finish';
import { StepFive } from '../step/sign-up-gym-config-step-five';
import { StepFour } from '../step/sign-up-gym-config-step-four';

export const GymConfigForm = () => {
    const {
        step,
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
    } = useGymConfigForms();

    return (
        <div className='flex flex-col items-center justify-center'>
            <StepHeader title="Configurações Iniciais" description='Essas são as principais configurações. Você poderá alterá-las futuramente.' />
            <StepIcons currentStep={step} />
            {step === 1 && (
                <StepOne
                    formData={stepOneFormData}
                    setFormData={setStepOneFormData}
                    errors={stepOneErrors}
                    setErrors={setStepOneErrors}
                    handleContinue={handleContinue}
                />
            )}
            {step === 2 && (
                <StepTwo
                    formData={stepTwoFormData}
                    setFormData={setStepTwoFormData}
                    errors={stepTwoErrors}
                    setErrors={setStepTwoErrors}
                    handleContinue={handleContinue}
                    handleBack={handleBack}
                />
            )}
            {step === 3 && (
                <StepThree
                    formData={stepThreeFormData}
                    setFormData={setStepThreeFormData}
                    errors={stepThreeErrors}
                    setErrors={setStepThreeErrors}
                    handleContinue={handleContinue}
                    handleBack={handleBack}
                />
            )}
            {step === 4 && (
                <StepFour
                    formData={formData}
                    setFormData={setFormData}
                    handleContinue={handleContinue}
                    handleBack={handleBack}
                />
            )}
            {step === 5 && (
                <StepFive
                    formData={formData}
                    setFormData={setFormData}
                    handleContinue={handleContinue}
                    handleBack={handleBack}
                />
            )}
            {step === 6 && (
                <StepFinished
                    formData={formData}
                    setFormData={setFormData}
                    handleContinue={handleContinue}
                    handleBack={handleBack}
                />
            )}
        </div>
    );
};
