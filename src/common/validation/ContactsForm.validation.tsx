import * as Yup from "yup";

export const contactsValidationSchema = Yup.object().shape({
  description: Yup.string().required("required"),
  phone: Yup.string().test("numberRequired", "required", function (value) {
    const withoutNumber = this.parent.withoutNumber;

    if (!withoutNumber && (!value || value.trim() === "")) return false;

    return true;
  }),
  email: Yup.string().required("required"),
});
