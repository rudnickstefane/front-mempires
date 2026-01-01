import { ReviewsForm, ReviewsFormErrors } from "../../../../../common/types";

export type ReviewsProps = {
    formData: ReviewsForm;
    errors: ReviewsFormErrors;
    closeDrawer: () => void;
}