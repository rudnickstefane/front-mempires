export type DialogConfirmType = "ACTIVE" | "INACTIVE" | "DELETE";

export type DialogConfigValue = {
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  alertVariant: "info" | "warning" | "error" | "success";
  buttonColor: string;
};
