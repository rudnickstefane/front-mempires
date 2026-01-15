import { ProfileDetails } from "@sr/modules/common/types";

export type ProfileProps = {
  data: {
    profile: ProfileDetails;
    loading: boolean;
  };
  label?: {
    code: string;
  };
  refresh?: () => Promise<void>;
};
