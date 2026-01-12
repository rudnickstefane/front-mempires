import { CompanyProps, ContactsDataProps } from "@sr/common/types";
import { PartnerProps } from "../../Partners/types";

export interface DrawerFormPartnerProps {
  company: CompanyProps;
  partner: PartnerProps;
  contact: ContactsDataProps[];
}
