export type FindMenusResponse = {
  findMenus: {
    id: number;
    menuCode: string;
    mainMenuCode: number;
    name: string;
    description: string;
    path: string;
    icon: string;
    SubMenus: FindMenusResponse[];
  }[];
};
