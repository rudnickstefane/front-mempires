import { addressValidationSchema } from "@sr/common/validation/AddressForm.validation";
import { userFormValidationSchema } from "@sr/common/validation/UserForm.validation";
import * as Yup from "yup";

export const formUserValidationSchema = Yup.object().shape({
  details: userFormValidationSchema,
  address: addressValidationSchema,
});
