import { VariantType } from "notistack";

export type DrawerProps = {
    closeDrawer: () => void;
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}