import { ReviewsForm, ReviewsFormErrors } from "../../../../../common/types";

export type TicketsProps = {
    formData: ReviewsForm;
    errors: ReviewsFormErrors;
    closeDrawer: () => void;
}