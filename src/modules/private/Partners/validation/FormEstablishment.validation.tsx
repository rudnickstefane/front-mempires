import * as Check from "@sr/common/validation";
import * as Yup from "yup";

export const formEstablishmentValidationSchema = Yup.object()
  .shape({
    brandCode: Yup.string().required("required"),
    company: Check.companyFormValidationSchema,
    address: Check.addressValidationSchema,
  })
  .concat(Check.contactsValidationSchema);
