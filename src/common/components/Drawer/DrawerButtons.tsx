import { Box, Button, CircularProgress } from "@mui/material";
import { DrawerStepsProps } from "@sr/common/types";
import { ArrowRight2 } from "iconsax-react";

export function DrawerButtons({
  activeStep,
  title,
  onClose,
  handleBack,
  handleNext,
  isValid,
  isLoading,
  isDirty,
}: DrawerStepsProps) {
  const isLastStep = activeStep === title.length - 1;
  const isButtonDisabled = isLastStep
    ? !isValid || !isDirty || isLoading
    : !isValid || isLoading;

  return (
    <Box className="flex flex-row justify-between gap-4 mt-8">
      {/* Botão Cancelar/Voltar */}
      <Button
        variant="outlined"
        onClick={activeStep === 0 ? onClose : handleBack}
        className="w-[204px] !rounded-lg text-neutral-900 border border-neutral-500 py-3 normal-case font-manrope text-base"
      >
        {activeStep === 0 ? "Cancelar" : "Voltar"}
      </Button>

      {/* Botão Continuar/Concluir */}
      <Button
        type={isLastStep ? "submit" : "button"}
        onClick={(e) => {
          if (isLastStep) return;

          e.preventDefault();
          handleNext?.();
        }}
        className={`w-[204px] rounded-lg border py-3 normal-case font-manrope text-base bg-primary text-white ${
          !isValid ? "cursor-not-allowed pointer-events-auto" : ""
        }`}
        endIcon={!isLoading && !isLastStep && <ArrowRight2 size={21} />}
        disabled={isButtonDisabled}
      >
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : isLastStep ? (
          "Concluir"
        ) : (
          "Continuar"
        )}
      </Button>
    </Box>
  );
}
