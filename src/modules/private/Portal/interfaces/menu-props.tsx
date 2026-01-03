/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MenuProps {
  isMenuCollapsed: boolean;
  toggleMenu: () => void;
  isMenuLoading: boolean;
  responseMenus: any;
  menuExcludedPaths: string[];
  expandedMenus: number[];
  toggleSubMenu: (menuCode: number) => void;
  selectedResource: any;
  setSelectedResource: (data: any) => void;
  setExpandedMenus: (menus: number[]) => void;
  openComponent: (path: any) => void;
  setActiveComponent: (path: any) => void;
}
