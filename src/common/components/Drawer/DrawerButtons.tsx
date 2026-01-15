import { Box, Button } from "@mui/material";
import { DrawerStepsProps } from "@sr/common/types";
import { ArrowRight2 } from "iconsax-react";

export function DrawerButtons({
  activeStep,
  title,
  onClose,
  handleBack,
  handleNext,
}: DrawerStepsProps) {
  const isLastStep = activeStep === title.length - 1;

  return (
    <Box className="flex flex-row justify-between gap-4 mt-8">
      {/* Botão Cancelar/Voltar */}
      <Button
        variant="outlined"
        onClick={activeStep === 0 ? onClose : handleBack}
        className="w-[204px] h-[44px] !rounded-lg !text-neutral-900 border !border-neutral-500 px-5 !normal-case !font-poppins !text-base"
      >
        {activeStep === 0 ? "Cancelar" : "Voltar"}
      </Button>

      {/* Botão Continuar/Concluir */}
      <Button
        onClick={handleNext}
        className="w-[204px] h-[44px] !rounded-lg border px-5 !normal-case !font-poppins !text-base !bg-primary !text-white"
        endIcon={!isLastStep && <ArrowRight2 size={21} />}
      >
        {isLastStep ? "Concluir" : "Continuar"}
      </Button>
    </Box>
  );
}
