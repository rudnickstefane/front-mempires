import { ContactsProps } from "./ContactsProps.type";

export type ContactItemProps = {
  contact: ContactsProps;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onRemove: () => void;
};
