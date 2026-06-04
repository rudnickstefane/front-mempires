import { BrandClientPolicyEnum } from "@sr/common/enums";
import * as Check from "@sr/common/validation";
import * as Yup from "yup";

export const formBrandValidationSchema = Yup.object()
  .shape({
    brandClientPolicy: Yup.string().required("required"),
    clients: Yup.array()
      .ensure()
      .when("brandClientPolicy", {
        is: BrandClientPolicyEnum.EXCLUSIVE,
        then: (schema) =>
          schema
            .min(1, "Selecione ao menos um convênio para continuar.")
            .required(),
        otherwise: (schema) => schema.notRequired(),
      }),
    company: Check.companyFormValidationSchema,
    address: Check.addressValidationSchema,
  })
  .concat(Check.contactsValidationSchema);
