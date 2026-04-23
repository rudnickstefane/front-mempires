import { Slash, TickCircle, Trash } from "iconsax-react";
import { DialogConfigValue, DialogConfirmType } from "../types";

export const dialogConfirmConfig: Record<DialogConfirmType, DialogConfigValue> =
  {
    ACTIVE: {
      icon: <TickCircle variant="Bulk" size={48} />,
      iconBgColor: "bg-success-100",
      iconColor: "text-success-700",
      alertVariant: "warning",
      buttonColor: "bg-primary",
    },
    INACTIVE: {
      icon: <Slash variant="Bulk" size={48} />,
      iconBgColor: "bg-neutral-200",
      iconColor: "text-neutral-700",
      alertVariant: "warning",
      buttonColor: "bg-primary",
    },
    DELETE: {
      icon: <Trash variant="Bulk" size={48} />,
      iconBgColor: "bg-danger-100",
      iconColor: "text-danger-700",
      alertVariant: "warning",
      buttonColor: "bg-danger-600",
    },
  };
