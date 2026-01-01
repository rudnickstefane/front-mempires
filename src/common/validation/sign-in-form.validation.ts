import * as Yup from "yup";

export const signInFormValidationSchema = Yup.object()
  .shape({
    login: Yup.string().required("required"),
    password: Yup.string().required("required"),
  })
  .nullable();
