import { SupplierRegisterFormData, SupplierRegisterFormErrors } from "../../../../../common/types";

export type SupplierRegisterProps = {
    formData: SupplierRegisterFormData;
    setFormData: React.Dispatch<React.SetStateAction<SupplierRegisterFormData>>;
    errors: SupplierRegisterFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<SupplierRegisterFormErrors>>;
    closeDrawer: () => void;
}