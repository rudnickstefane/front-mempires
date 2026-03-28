import * as Yup from "yup";

export const companyDetailsFormValidationSchema = Yup.object()
  .shape({
    abbreviation: Yup.string().required("required"),
    effectiveStart: Yup.string().required("required"),
    effectiveEnd: Yup.string().required("required"),
  })
  .nullable();
