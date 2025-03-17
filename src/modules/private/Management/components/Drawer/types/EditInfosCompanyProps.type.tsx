import { EditCompanyFormData, EditCompanyFormErrors } from "../../../../../common/types";

export type EditInfosCompanyProps = {
    formData: EditCompanyFormData;
    setFormData: React.Dispatch<React.SetStateAction<EditCompanyFormData>>;
    errors: EditCompanyFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<EditCompanyFormErrors>>;
    closeDrawer: () => void;
}