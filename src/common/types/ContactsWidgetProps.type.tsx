import { ContactsProps } from "./ContactsProps.type";

export type ContactsWidgetProps = {
  cardBox?: boolean;
  data: ContactsProps | ContactsProps[];
};
