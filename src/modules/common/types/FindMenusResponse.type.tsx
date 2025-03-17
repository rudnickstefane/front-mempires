export type SubMenusDataType = {
  subMenuCode: number;
  menuCode: number;
  name: string;
  description: string;
  path: string;
  icon: string;
};

export type FindMenusResponse = {
  findMenus: {
    menuCode: number;
    name: string;
    description: string;
    path: string;
    icon: string;
    SubMenus: SubMenusDataType[];
  }[];
};
