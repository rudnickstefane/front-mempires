import { ProfileDetails } from "@sr/modules/common/types";

export type ContactsDataProps = {
  type?: string;
  description: string;
  email: string;
  phone: string;
  validationEmail?: string;
};

export type ContactsProps = {
  data: ProfileDetails;
};
