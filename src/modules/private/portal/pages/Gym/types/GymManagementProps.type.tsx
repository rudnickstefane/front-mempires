import { VariantType } from "notistack";

export type GymManagementProps = {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}