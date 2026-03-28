import * as Check from "@sr/common/validation";
import * as Yup from "yup";

export const formPartnerValidationSchema = Yup.object()
  .shape({
    fee: Yup.string().required("required"),
    rewardsRate: Yup.string().required("required"),
    segment: Yup.string().required("required"),
    entity: Yup.string().required("required"),
    company: Check.companyFormValidationSchema,
    details: Check.companyDetailsFormValidationSchema,
    address: Check.addressValidationSchema,
  })
  .concat(Check.contactsValidationSchema);
