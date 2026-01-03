import { initialSignInValues } from "@sr/common/constants";
import { notify } from "@sr/common/iu/components/notifications";
import { storage } from "@sr/common/storage/Storage";
import { CreateAccessTokenResponse, SignInFormValues } from "@sr/common/types";
import { signInFormValidationSchema } from "@sr/common/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MutationCreateToken } from "../graphql";
import { GetErrorMessage } from "../utils";
import { useBackendForFrontend } from "./useBackendForFrontend";

export const useSignInFormHook = () => {
  const navigate = useNavigate();
  const { request } = useBackendForFrontend();
  const [attemptCount, setAttemptCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handlerOnSubmit = async (values: SignInFormValues) => {
    try {
      const response: CreateAccessTokenResponse = await request(
        MutationCreateToken,
        values
      );

      storage.set({
        token: response.createAccessToken.token,
        profileCode: response.createAccessToken.user.profileCode,
      });

      navigate("/portal");
      notify.success("Olá, seja muito bem-vindo!");
    } catch (error: unknown) {
      setAttemptCount((prev) => prev + 1);
      const msg =
        attemptCount >= 5
          ? "Erro ao autenticar. Entre em contato com nosso suporte."
          : GetErrorMessage(error, "Ops! Algo deu errado ao autenticar-se.");

      notify.error(msg);
    }
  };

  const formData = useFormik<SignInFormValues>({
    initialValues: initialSignInValues,
    validationSchema: signInFormValidationSchema,
    onSubmit: handlerOnSubmit,
  });

  return {
    formData,
    showPassword,
    handleClickShowPassword: () => setShowPassword(!showPassword),
    isLoading: formData.isSubmitting,
  };
};
