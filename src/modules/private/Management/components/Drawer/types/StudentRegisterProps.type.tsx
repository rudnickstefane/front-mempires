import { StudentRegisterFormData, StudentRegisterFormErrors } from "../../../../../common/types";

export type StudentRegisterProps = {
    formData: StudentRegisterFormData;
    setFormData: React.Dispatch<React.SetStateAction<StudentRegisterFormData>>;
    errors: StudentRegisterFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<StudentRegisterFormErrors>>;
    closeDrawer: () => void;
}