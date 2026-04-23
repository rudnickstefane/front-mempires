export type TabOption<T> = {
  id: T;
  label: string;
};

export type UnderlineTabsProps<T> = {
  options: TabOption<T>[];
  activeTab: T;
  onChange: (id: T) => void;
};
