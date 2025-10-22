type MenuItemType = {
  name: string;
  link?: string;
  subItems?: MenuItemType[];
  target?: boolean;
}

type Section = {
  title: string;
  subtitle?: string;
  description?: string;
  items: MenuItemType[];
}

type Sponsor = {
  content: string;
}

export type Menu = {
  key: string;
  label: string;
  link?: string;
  isMegaMenu?: boolean;
  sections?: Section[];
  title?: string;
  subtitle?: string;
  items?: MenuItemType[];
  sponsor?: Sponsor;
}