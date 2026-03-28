import * as Yup from "yup";

export const companyFormValidationSchema = Yup.object()
  .shape({
    code: Yup.string().required("required"),
  })
  .nullable();
