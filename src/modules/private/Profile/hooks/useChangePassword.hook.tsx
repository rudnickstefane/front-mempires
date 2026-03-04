import { useFormik } from "formik";
import { useState } from "react";
import * as Hook from "../hooks";
import { ChangePasswordProps } from "../types";
import { formChangePasswordValidationSchema } from "../validation";

export const useChangePasswordHook = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: updatePassword, isPending } = Hook.useUpdatePassword();

  const handlerOnSubmit = async (values: ChangePasswordProps) => {
    const payload = {
      data: {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      },
    };

    await updatePassword(payload, {
      onSuccess: () => {
        formData.resetForm();
      },
    });
  };

  const formData = useFormik<ChangePasswordProps>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: formChangePasswordValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handlerOnSubmit,
  });

  const isButtonEnabled =
    !!formData.values.oldPassword &&
    !!formData.values.newPassword &&
    !!formData.values.confirmPassword &&
    formData.isValid &&
    !isPending;

  return {
    formData,
    showPassword,
    isPending,
    isButtonEnabled,
    newPasswordValue: formData.values.newPassword,
    handleClickShowPassword: () => setShowPassword(!showPassword),
  };
};
