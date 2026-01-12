import { Box } from "@mui/material";
import { ReactNode } from "react";
import { DrawerContainer } from "../Drawer";

interface DrawerContentType {
  header: {
    title: string;
    headerStep: string;
  };
  steps: string[];
  activeStep: number;
  content: ReactNode;
  handleNext?: () => Promise<void>;
  handleBack?: () => void;
  onStepClick?: (step: number) => void;
}

interface ContainerProps {
  header?: ReactNode;
  children: ReactNode;
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
  drawerContent?: DrawerContentType;
  content?: ReactNode;
}

export function ModuleViewport(props: Readonly<ContainerProps>) {
  const { isDrawerOpen, onCloseDrawer, drawerContent, children, header } =
    props;

  return (
    <>
      <DrawerContainer
        isOpen={!!isDrawerOpen}
        onClose={onCloseDrawer || (() => {})}
        title={drawerContent?.header?.title || ""}
        headerStep={drawerContent?.header?.headerStep || ""}
        steps={drawerContent?.steps || []}
        activeStep={drawerContent?.activeStep || 0}
        handleBack={drawerContent?.handleBack}
        handleNext={drawerContent?.handleNext}
        onStepClick={drawerContent?.onStepClick}
      >
        {drawerContent?.content}
      </DrawerContainer>

      <Box className="overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]">
        {header && <Box className="mb-5">{header}</Box>}

        <Box className="flex flex-row w-full">
          <Box className="bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]">
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
