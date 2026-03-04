import * as Yup from "yup";

export const formChangePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("required"),
  newPassword: Yup.string()
    .required("required")
    .min(8, "Mínimo 8 caracteres")
    .matches(/[A-Z]/, "Pelo menos 1 letra maiúscula")
    .matches(/[a-z]/, "Pelo menos 1 letra minúscula")
    .matches(/[0-9]/, "Pelo menos 1 número")
    .matches(/[^A-Za-z0-9]/, "Pelo menos 1 caractere especial")
    .test(
      "no-repeats",
      "Não são permitidos caracteres repetidos (ex: aa, 11)",
      (val) => !/(.)\1/.test(val || ""),
    )
    .test(
      "no-sequences",
      "Não são permitidos sequenciais (ex: 123, abc)",
      (val) => {
        if (!val) return true;
        const s = val.toLowerCase();
        for (let i = 0; i < s.length - 2; i++) {
          const char1 = s.charCodeAt(i);
          const char2 = s.charCodeAt(i + 1);
          const char3 = s.charCodeAt(i + 2);
          if (char2 === char1 + 1 && char3 === char2 + 1) return false;
        }
        return true;
      },
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "As senhas não coincidem")
    .required("required"),
});
