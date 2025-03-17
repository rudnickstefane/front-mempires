export type FindShortcutsResponse = {
  findShortcuts: Array<{
    shortcutCode: number;
    name: string;
    groupCode: string;
  }>;
};