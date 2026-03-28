import { memo } from "react";
import { TextFieldComponent } from "./TextFieldComponent";

export const TextField = memo(TextFieldComponent, (prevProps, nextProps) => {
  return (
    prevProps.name === nextProps.name &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.label === nextProps.label &&
    prevProps.type === nextProps.type &&
    prevProps.mask === nextProps.mask
  );
});
