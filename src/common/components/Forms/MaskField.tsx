/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

export interface MaskInputProps {
  mask: string;
  definitions?: any;
}

export const MaskField = forwardRef<HTMLElement, MaskInputProps>(
  function TextMaskCustom(props) {
    const { mask, definitions, ...other } = props;
    return <IMaskInput {...other} mask={mask} definitions={definitions} />;
  }
);
