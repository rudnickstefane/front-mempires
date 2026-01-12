import { ProfileDetails } from "@sr/modules/common/types";

export type PersonalDataProps = {
  name: string;
  birthDate: string;
  code: string;
  identity: string;
};

export type PersonalProps = {
  label: PersonalDataProps;
  data: ProfileDetails;
};
