import { useSnackbar } from "notistack";
import { useState } from "react";
import { FindProfileDetailsResponse } from "../../../../../common/types";
import { EditProfileDrawer } from "../../../components/Drawer";
import { EditProfileDrawerProps } from "../../../components/Drawer/types";

type ProfileGymManagementProps = {
  data: FindProfileDetailsResponse | undefined;
  refresh: () => Promise<void>;
};

export const useProfileGymManagement = ({
  data,
  refresh,
}: ProfileGymManagementProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeDrawerStep, setActiveDrawerStep] = useState(0);

  {
    /* Drawers */
  }
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<
    EditProfileDrawerProps[keyof EditProfileDrawerProps] | null
  >(null);

  const renderDrawerContent = () => {
    switch (drawerType) {
      case "EditInfos":
        return (
          <EditProfileDrawer
            closeDrawer={closeDrawer}
            enqueueSnackbar={enqueueSnackbar}
            data={data}
            initialStep={activeDrawerStep}
            refresh={refresh}
          />
        );

      default:
        break;
    }
  };

  const closeDrawer = () => {
    setDrawerType(null);
    setIsDrawerOpen(false);
  };

  const openDrawer = (
    type: EditProfileDrawerProps[keyof EditProfileDrawerProps],
    initialStep: number = 0
  ) => {
    setDrawerType(type);
    setIsDrawerOpen(true);
    setActiveDrawerStep(initialStep);
  };

  return {
    renderDrawerContent,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  };
};
