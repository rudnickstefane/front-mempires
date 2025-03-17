import { VariantType } from "notistack";

export type DrawerData = { [key: string]: unknown }

export type DrawerProps = {
    closeDrawer: () => void;
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    initialStep?: number
    refresh?: () => void;
    refreshInternal?: () => void;
    onBack?: () => void;
}