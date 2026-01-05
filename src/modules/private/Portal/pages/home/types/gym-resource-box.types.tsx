import { ElementType } from "react";

export type ResourceBoxProps = {
  icon: ElementType;
  type?: string;
  menu?: string;
  name: string;
  subName?: string;
  description?: string;
  sidebarCollapsed?: boolean;
  hasSubMenu?: boolean;
  isExpanded?: boolean;
  hasPermission?: boolean;
  onClick?: () => void;
};
