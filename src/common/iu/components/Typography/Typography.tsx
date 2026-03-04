import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";

export interface TypographyProps extends MuiTypographyProps {
  translateId?: string;
}

export function Typography({
  translateId,
  children,
  ...props
}: Readonly<TypographyProps>) {
  const intl = useIntl();

  // Verifica se o translateId existe no dicionário de traduções
  const isTranslationId = translateId
    ? intl.messages[translateId] !== undefined
    : false;

  return (
    <MuiTypography
      {...props}
      sx={{
        fontFamily: "'Manrope', sans-serif",
        ...props.sx,
      }}
    >
      {translateId ? (
        isTranslationId ? (
          <FormattedMessage id={translateId} />
        ) : (
          // Se não for um ID, renderiza o texto puro para evitar o erro de Missing Translation
          translateId
        )
      ) : null}
      {children}
    </MuiTypography>
  );
}
