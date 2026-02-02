import { ProfileDetails } from "@sr/modules/common/types";

export type ProfileProps = {
  data: {
    profile: ProfileDetails;
    loading: boolean;
  };
};
