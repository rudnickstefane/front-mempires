import { StudentRegisterFormErrors, StudentUpsertFormData } from "../../../../../common/types";

export type StudentRegisterProps = {
    formData: StudentUpsertFormData;
    setFormData: React.Dispatch<React.SetStateAction<StudentUpsertFormData>>;
    errors: StudentRegisterFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<StudentRegisterFormErrors>>;
    closeDrawer: () => void;
}