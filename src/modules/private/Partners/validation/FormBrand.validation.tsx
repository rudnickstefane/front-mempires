import * as Check from "@sr/common/validation";
import * as Yup from "yup";

export const formBrandValidationSchema = Yup.object()
  .shape({
    // brandClientPolicy: Yup.string().required("required"),
    company: Check.companyFormValidationSchema,
    address: Check.addressValidationSchema,
  })
  .concat(Check.contactsValidationSchema);
