import { ContactsProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { formatPhoneNumber } from "@sr/utils";
import { GridText } from "../Grids";

export function Contacts({ label, data }: ContactsProps) {
  const contacts = data?.contact
    ? Array.isArray(data.contact)
      ? data.contact
      : [data.contact]
    : [];

  return (
    <Animated
      variant="container"
      className="grid grid-cols-[max-content,1fr] gap-x-5"
    >
      {contacts.map((item, index) => {
        const fields = [
          { label: label.description, value: item.description },
          {
            label: label.phone,
            value: item.phone && formatPhoneNumber(item.phone),
          },
          { label: label.email, value: item.email },
        ];

        return (
          <>
            {fields.map((field, fIdx) => (
              <GridText
                key={fIdx || index}
                label={field.label}
                value={field.value}
                variant="itemLeft"
                isChild
              />
            ))}
          </>
        );
      })}
    </Animated>
  );
}
