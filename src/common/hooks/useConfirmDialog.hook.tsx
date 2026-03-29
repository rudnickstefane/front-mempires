import { useConfirmStore } from "./useConfirmStore.hook";

export const useConfirmDialog = () => {
  const open = useConfirmStore((s) => s.open);

  return open;
};
