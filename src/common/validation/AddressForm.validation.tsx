import * as Yup from "yup";

export const addressValidationSchema = Yup.object().shape({
  zipCode: Yup.string().required("required"),
  address: Yup.string().required("required"),
  number: Yup.string().test("numberRequired", "required", function (value) {
    const withoutNumber = this.parent.withoutNumber;

    if (!withoutNumber && (!value || value.trim() === "")) return false;

    return true;
  }),
  city: Yup.string().required("required"),
  district: Yup.string().required("required"),
  state: Yup.string().required("required"),
});
