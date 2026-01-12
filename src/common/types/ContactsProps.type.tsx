import { ProfileDetails } from "@sr/modules/common/types";

export type ContactsDataProps = {
  type?: string;
  description: string;
  email: string;
  phone: string;
  status?: string;
};

export type ContactsProps = {
  label: ContactsDataProps;
  data: ProfileDetails;
};
