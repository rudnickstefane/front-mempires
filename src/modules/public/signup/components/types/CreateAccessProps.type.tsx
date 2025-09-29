import { CreateAccessFormData } from "./CreateAccessFormData.type";
import { CreateAccessFormErrors } from "./CreateAccessFormErrors.type";

export type CreateAccessProps = {
    formData: CreateAccessFormData;
    setFormData: React.Dispatch<React.SetStateAction<CreateAccessFormData>>;
    errors: CreateAccessFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<CreateAccessFormErrors>>;
    closeDrawer: () => void;
}