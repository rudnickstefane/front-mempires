/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

export const contactsValidationSchema = Yup.object().shape({
  _tempType: Yup.string().when("contacts", {
    is: (val: any[]) => val && val.length > 0,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("required"),
  }),

  _tempDescription: Yup.string().when("contacts", {
    is: (val: any[]) => val && val.length > 0,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("required"),
  }),

  _tempEmail: Yup.string()
    .email("invalid-email")
    .when("contacts", {
      is: (val: any[]) => val && val.length > 0,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required("required"),
    }),
  contacts: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required("required"),
        type: Yup.string().required("required"),
        email: Yup.string().email("invalid-email").required("required"),
        phone: Yup.string().nullable(),
      }),
    )
    .min(1, "Adicione pelo menos um contato"),
});
