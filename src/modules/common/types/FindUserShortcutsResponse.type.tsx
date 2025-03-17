export type FindUserShortcutsResponse = {
  findUserShortcuts: {
    shortcutCode: string;
    name: string;
    path: string;
    icon: string;
    colorPrimary?: string;
    colorSecond?: string;
  }
};
