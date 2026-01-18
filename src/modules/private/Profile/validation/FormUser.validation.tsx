import {
  addressValidationSchema,
  contactsValidationSchema,
  userFormValidationSchema,
} from "@sr/common/validation";
import * as Yup from "yup";

export const formUserValidationSchema = Yup.object().shape({
  details: userFormValidationSchema,
  address: addressValidationSchema,
  contact: contactsValidationSchema,
});
