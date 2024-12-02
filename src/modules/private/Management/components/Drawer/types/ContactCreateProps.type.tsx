import { ContactCreateFormData, ContactCreateFormErrors } from "../../../../../common/types";

export type ContactCreateProps = {
    formData: ContactCreateFormData;
    setFormData: React.Dispatch<React.SetStateAction<ContactCreateFormData>>;
    errors: ContactCreateFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<ContactCreateFormErrors>>;
    closeDrawer: () => void;
}