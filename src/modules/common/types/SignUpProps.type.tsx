import { VariantType } from "notistack";

export type SignUpProps = {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}