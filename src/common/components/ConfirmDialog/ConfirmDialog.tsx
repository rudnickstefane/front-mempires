import { Box, Dialog, DialogContent } from "@mui/material";
import { Button } from "@sr/common/iu/components/Button";
import { Typography } from "@sr/common/iu/components/Typography";
import { ConfirmDialogProps } from "@sr/common/types";
import { Alert } from "@sr/common/ui/Alert";

export function ConfirmDialog({
  isOpen,
  title,
  subtitle,
  buttonText,
  buttonCancel = "Cancelar",
  buttonColor = "primary",
  icon,
  iconBgColor,
  iconColor,
  alertVariant = "warning",
  isLoading = false,
  confirmDialog,
  closeModal,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          className: "p-12 rounded-2xl",
        },
      }}
    >
      <DialogContent className="flex flex-col items-center gap-8 p-0">
        <Box
          className={`p-4 rounded-3xl flex items-center ${iconColor} ${iconBgColor}`}
        >
          {icon}
        </Box>

        <Box className="flex flex-col gap-4">
          <Typography
            className="text-base font-bold text-neutral-800 text-center"
            translateId={title}
          />

          {subtitle && (
            <Alert variant={alertVariant} title="Atenção" message={subtitle} />
          )}
        </Box>

        <Box className="flex justify-between w-full">
          <Button
            variant="outlined"
            onClick={closeModal}
            disabled={isLoading}
            className="w-[204px] rounded-lg text-neutral-900 border border-neutral-500 py-3 normal-case font-manrope text-base"
          >
            {buttonCancel}
          </Button>
          <Button
            type="button"
            onClick={confirmDialog}
            loading={isLoading}
            className={`w-[204px] rounded-lg py-3 normal-case font-manrope text-base ${buttonColor} text-white`}
          >
            {buttonText}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
