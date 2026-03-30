export type ReactTableFilterConfig =
  | {
      type: "search";
      name: string;
      placeholder?: string;
    }
  | {
      type: "checkbox";
      name: string;
      label: string;
    };
