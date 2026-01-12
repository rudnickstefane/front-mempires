import * as Yup from "yup";

export const userFormValidationSchema = Yup.object()
  .shape({
    name: Yup.string().required("required"),
    birthDate: Yup.string().required("required"),
    code: Yup.string().required("required"),
  })
  .nullable();
