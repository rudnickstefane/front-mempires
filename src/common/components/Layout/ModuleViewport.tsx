import { Box } from "@mui/material";
import { DrawerContainer } from "../Drawer";

interface DrawerContentType {
  header: {
    title: string;
    headerStep: string;
  };
  steps: string[];
  activeStep: number;
  content: React.ReactNode;
  onStepClick?: (step: number) => void;
}

interface ContainerProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
  drawerContent?: DrawerContentType;
  content?: React.ReactNode;
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
        onStepClick={drawerContent?.onStepClick}
      >
        {drawerContent?.content}
      </DrawerContainer>

      <Box className="overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem] bg-[#F6FAFD]">
        {header && <Box className="mb-5">{header}</Box>}

        <Box className="flex flex-row w-full">
          <Box className="w-full">{children}</Box>
        </Box>
      </Box>
    </>
  );
}
