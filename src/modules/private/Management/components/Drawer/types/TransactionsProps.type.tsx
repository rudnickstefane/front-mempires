import { TransactionFormData, TransactionFormErrors } from "../../../../../common/types";

export type TransactionsProps = {
    formData: TransactionFormData;
    setFormData: React.Dispatch<React.SetStateAction<TransactionFormData>>;
    errors: TransactionFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<TransactionFormErrors>>;
    closeDrawer: () => void;
}