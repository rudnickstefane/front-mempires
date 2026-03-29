import { useDrawerStore } from "@sr/common/hooks";
import { DrawerContainer } from "./DrawerContainer";

export function Drawer() {
  const {
    isOpen,
    closeDrawer,
    title,
    steps,
    activeStep,
    component: Component,
    componentProps,
    setActiveStep,
  } = useDrawerStore();

  if (!Component) return null;

  const headerStepLabel =
    steps.length > 0 ? `Etapa ${activeStep + 1} de ${steps.length}` : "";

  return (
    <DrawerContainer
      isOpen={isOpen}
      onClose={closeDrawer}
      title={title || ""}
      headerStep={headerStepLabel}
      steps={steps}
      activeStep={activeStep}
      onStepClick={setActiveStep}
    >
      <Component {...componentProps} />
    </DrawerContainer>
  );
}
