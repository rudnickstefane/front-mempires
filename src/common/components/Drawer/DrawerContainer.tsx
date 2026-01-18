import { Box, Drawer } from "@mui/material";
import { DrawerContainerProps } from "@sr/common/types";
import { SteppersWithForms } from "../Stepper";
import { DrawerHeader } from "./DrawerHeader";

export function DrawerContainer(props: Readonly<DrawerContainerProps>) {
  const {
    isOpen,
    onClose,
    title,
    headerStep,
    steps,
    activeStep,
    onStepClick,
    children,
  } = props;

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      disableEnforceFocus
      variant="temporary"
      slotProps={{
        paper: {
          className: "w-[60%] p-8",
        },
      }}
    >
      <DrawerHeader title={title} headerStep={headerStep} onClick={onClose} />
      <Box className="w-full flex flex-col justify-start items-center gap-4 mt-8">
        <Box className="flex w-full">
          <SteppersWithForms
            titleSteps={steps}
            activeStep={activeStep}
            onStepClick={onStepClick}
          />
          <Box className="flex flex-col w-full md:pr-0 pr-2 mt-2">
            {children}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
