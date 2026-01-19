import { ProfileDetails } from "@sr/modules/common/types";

export type ContactsDataProps = {
  id: number;
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
