import { GymConfigErrorStepFour, GymConfigErrorStepOne, GymConfigErrorStepThree, GymConfigErrorStepTwo } from "./gym-errors.types";
import { GymStepOneFormsConfig, GymStepOthersFormsConfig, GymStepThreeFormsConfig, GymStepTwoFormsConfig } from "./gym-forms-config.types";

export type StepOneProps = {
    formData: GymStepOneFormsConfig;
    setFormData: React.Dispatch<React.SetStateAction<GymStepOneFormsConfig>>;
    errors: GymConfigErrorStepOne;
    setErrors: React.Dispatch<React.SetStateAction<GymConfigErrorStepOne>>;
    handleContinue: () => void;
}

export type StepTwoProps = {
    formData: GymStepTwoFormsConfig;
    setFormData: React.Dispatch<React.SetStateAction<GymStepTwoFormsConfig>>;
    errors: GymConfigErrorStepTwo;
    setErrors: React.Dispatch<React.SetStateAction<GymConfigErrorStepTwo>>;
    handleContinue: () => void;
    handleBack: () => void;
}

export type StepThreeProps = {
    formData: GymStepThreeFormsConfig;
    setFormData: React.Dispatch<React.SetStateAction<GymStepThreeFormsConfig>>;
    errors: GymConfigErrorStepThree;
    setErrors: React.Dispatch<React.SetStateAction<GymConfigErrorStepThree>>;
    handleContinue: () => void;
    handleBack: () => void;
}

export type StepFourProps = {
    formData: GymStepOthersFormsConfig;
    setFormData: React.Dispatch<React.SetStateAction<GymStepOthersFormsConfig>>;
    errors: GymConfigErrorStepFour;
    setErrors: React.Dispatch<React.SetStateAction<GymConfigErrorStepFour>>;
    handleContinue: () => void;
    handleBack: () => void;
}

export type StepFiveProps = {
    formData: GymStepOthersFormsConfig;
    setFormData: React.Dispatch<React.SetStateAction<GymStepOthersFormsConfig>>;
    errors: GymConfigErrorStepFour;
    setErrors: React.Dispatch<React.SetStateAction<GymConfigErrorStepFour>>;
    handleFinish: () => void;
    handleBack: () => void;
    isLoading: boolean;
}

export type StepFinishProps = {
    handleAccess: () => void;
}