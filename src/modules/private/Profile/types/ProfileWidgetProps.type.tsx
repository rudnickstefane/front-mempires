import { ProfileProps } from "@sr/common/types";

export type ProfileWidgetProps = {
  data: {
    profile: ProfileProps;
    loading: boolean;
  };
  openDrawer?: (index: number) => void;
};
