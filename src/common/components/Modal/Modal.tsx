import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
} from "@mui/material";
import { useModal } from "./hooks";

export interface ModalProps extends Omit<DialogProps, "open" | "onClose"> {
  header?: React.ReactNode;
  buttonsActions?: React.ReactNode;
  blockOnClose?: boolean;
}

export function Modal({
  header,
  children,
  blockOnClose,
  buttonsActions,
  ...props
}: ModalProps) {
  const { open, closeModal } = useModal();

  return (
    <Dialog
      {...props}
      open={open}
      onClose={blockOnClose ? undefined : closeModal}
      slotProps={{
        paper: {
          className: "!rounded-2xl !shadow-2xl ",
        },
        backdrop: {
          className: "backdrop-blur-sm bg-black/80",
        },
      }}
    >
      <DialogContent className="!p-6">
        {header && <Box>{header}</Box>}
        <Box className="!mt-3 p-2">{children}</Box>
        {buttonsActions ? (
          <DialogActions>{buttonsActions}</DialogActions>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
