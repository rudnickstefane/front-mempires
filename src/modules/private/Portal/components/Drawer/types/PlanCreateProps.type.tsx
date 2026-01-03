import { PlanCreateFormData, PlanCreateFormErrors } from "../../../../../common/types";

export type PlanCreateProps = {
    formData: PlanCreateFormData;
    setFormData: React.Dispatch<React.SetStateAction<PlanCreateFormData>>;
    errors: PlanCreateFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<PlanCreateFormErrors>>;
    closeDrawer: () => void;
}