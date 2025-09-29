type MenuItemType = {
  name: string;
  link?: string;
  subItems?: MenuItemType[];
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
  isMegaMenu?: boolean;
  sections?: Section[];
  title?: string;
  subtitle?: string;
  items?: MenuItemType[];
  sponsor?: Sponsor;
}