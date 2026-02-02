import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

export interface TypographyProps extends MuiTypographyProps {
  translateId?: string;
}

export function Typography({
  translateId,
  children,
  ...props
}: Readonly<TypographyProps>) {
  return (
    <MuiTypography {...props}>
      {translateId && <FormattedMessage id={translateId} />}
      {children}
    </MuiTypography>
  );
}
