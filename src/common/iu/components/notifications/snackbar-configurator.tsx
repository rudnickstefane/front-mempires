import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { _setSnackbarRef } from "./notifier";

export const SnackbarConfigurator: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    _setSnackbarRef(enqueueSnackbar);
  }, [enqueueSnackbar]);

  return null;
};
