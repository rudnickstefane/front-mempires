import { VisitRegisterFormData, VisitRegisterFormErrors } from "../../../../../common/types";

export type VisitRegisterProps = {
    formData: VisitRegisterFormData;
    setFormData: React.Dispatch<React.SetStateAction<VisitRegisterFormData>>;
    errors: VisitRegisterFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<VisitRegisterFormErrors>>;
    closeDrawer: () => void;
}