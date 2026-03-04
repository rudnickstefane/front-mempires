/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { HashLink } from "react-router-hash-link";

export interface ButtonProps extends MuiButtonProps {
  translateId?: string;
  loading?: boolean;
  to?: string;
  smooth?: boolean;
}

export function Button({
  translateId,
  children,
  loading,
  disabled,
  to,
  smooth = true,
  ...props
}: Readonly<ButtonProps>) {
  const intl = useIntl();
  const extraProps: any = {};

  if (to) {
    extraProps.component = HashLink;
    extraProps.to = to;
    extraProps.smooth = smooth;
  }

  // Verifica se o translateId passado é realmente uma chave existente no JSON
  const isTranslationId = translateId
    ? intl.messages[translateId] !== undefined
    : false;

  return (
    <MuiButton
      {...props}
      {...extraProps}
      disabled={disabled || loading}
      sx={{
        fontFamily: "'Manrope', sans-serif",
        textTransform: "none",
        borderRadius: "0.5rem",
        ...props.sx,
      }}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <>
          {translateId ? (
            isTranslationId ? (
              <FormattedMessage id={translateId} />
            ) : (
              // Se não for uma chave de tradução, renderiza o texto puro
              translateId
            )
          ) : null}
          {children}
        </>
      )}
    </MuiButton>
  );
}
