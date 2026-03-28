import * as Check from "@sr/common/validation";
import * as Yup from "yup";

export const formUserValidationSchema = Yup.object().shape({
  details: Check.userFormValidationSchema,
  address: Check.addressValidationSchema,
  contact: Check.contactValidationSchema,
});
