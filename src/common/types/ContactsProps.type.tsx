import { ProfileDetails } from "@sr/modules/common/types";
import { ContactTypeEnum, ValidationEnum } from "../enums";

export type ContactsProps = {
  id?: number;
  detailCode?: number;
  profileCode?: number;
  type?: ContactTypeEnum;
  description: string;
  email: string;
  validationEmail?: ValidationEnum;
  phone: string;
};

export type ContactsDataProps = {
  data: ProfileDetails;
};

export type ContactsFormProps = {
  isSimple?: boolean;
};
