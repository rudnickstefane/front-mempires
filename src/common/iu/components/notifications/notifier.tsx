import { EnqueueSnackbar, SnackbarKey, VariantType } from "notistack";

let snackbarRef: EnqueueSnackbar;

// Função interna para o componente configurar a referência
export const _setSnackbarRef = (ref: EnqueueSnackbar) => {
  snackbarRef = ref;
};

export const notify = {
  success: (msg: string): SnackbarKey =>
    snackbarRef(msg, { variant: "success" }),
  error: (msg: string): SnackbarKey => snackbarRef(msg, { variant: "error" }),
  info: (msg: string): SnackbarKey => snackbarRef(msg, { variant: "info" }),
  warning: (msg: string): SnackbarKey =>
    snackbarRef(msg, { variant: "warning" }),
  custom: (msg: string, variant: VariantType): SnackbarKey =>
    snackbarRef(msg, { variant }),
};
