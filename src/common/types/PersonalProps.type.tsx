import { ProfileDetails } from "@sr/modules/common/types";

export type PersonalDataProps = {
  name: string;
  birthDate: string;
  code: string;
  identity: string;
  gender: string;
};

export type PersonalProps = {
  label: PersonalDataProps;
  data: ProfileDetails;
};
