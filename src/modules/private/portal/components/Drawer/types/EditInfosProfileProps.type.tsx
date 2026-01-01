import { EditProfileFormData, EditProfileFormErrors } from "../../../../../common/types";

export type EditInfosProfileProps = {
    formData: EditProfileFormData;
    setFormData: React.Dispatch<React.SetStateAction<EditProfileFormData>>;
    errors: EditProfileFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<EditProfileFormErrors>>;
    closeDrawer: () => void;
}