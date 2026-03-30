import { FormikValues, useFormik } from "formik";
import { useEffect } from "react";

export function useReactTableFilter<T extends FormikValues>({
  initialValues,
  onChange,
  debounce = 500,
}: {
  initialValues: T;
  onChange: (values: T) => void;
  debounce?: number;
}) {
  const formik = useFormik<T>({
    initialValues,
    onSubmit: () => {},
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(formik.values);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [formik.values, debounce, onChange]);

  return formik;
}
