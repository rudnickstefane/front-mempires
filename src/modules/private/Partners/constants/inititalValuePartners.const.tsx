import { DrawerFormPartnerProps } from "../../Portal/types";

export const initialValuePartners: DrawerFormPartnerProps = {
  contact: [],
  company: {
    businessName: "",
    establishmentIdentity: "",
    location: "",
  },
  partner: {
    code: "",
    defaultTax: "00.00",
    effectiveSince: "",
    effectiveUntil: "",
    shortName: "",
  },
};
