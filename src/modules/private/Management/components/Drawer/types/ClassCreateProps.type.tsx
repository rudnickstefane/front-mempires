import { ClassCreateFormData, ClassCreateFormErrors } from "../../../../../common/types";

export type ClassCreateProps = {
    formData: ClassCreateFormData;
    setFormData: React.Dispatch<React.SetStateAction<ClassCreateFormData>>;
    errors: ClassCreateFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<ClassCreateFormErrors>>;
    closeDrawer: () => void;
}