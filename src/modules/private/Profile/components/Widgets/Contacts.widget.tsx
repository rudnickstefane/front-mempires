import { ContactsProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { formatPhoneNumber } from "@sr/utils";
import { CardText } from "../../../../../common/components/Card";

export function Contacts({ data }: ContactsProps) {
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
          { label: "description", value: item.description },
          {
            label: "phone",
            value: item.phone && formatPhoneNumber(item.phone),
          },
          { label: "email", value: item.email },
        ];

        return (
          <>
            {fields.map((field, fIdx) => (
              <CardText
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
