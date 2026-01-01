import { FormikProps, FormikProvider } from "formik";
import { FormHTMLAttributes, ReactNode } from "react";

// Usamos <T> para representar o tipo dos valores do formulário (ex: SignInFormValues)
interface FormContainerProps<T extends object>
  extends FormHTMLAttributes<HTMLFormElement> {
  value: FormikProps<T>;
  children: ReactNode;
  className?: string;
}

export function FormController<T extends object>({
  value,
  children,
  className = "w-full h-full flex flex-col justify-start",
  ...props
}: FormContainerProps<T>) {
  return (
    <FormikProvider value={value}>
      <form
        onSubmit={value.handleSubmit}
        className={className}
        noValidate
        {...props}
      >
        {children}
      </form>
    </FormikProvider>
  );
}
