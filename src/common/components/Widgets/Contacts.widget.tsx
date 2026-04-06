import { ContactsWidgetProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { formatPhoneNumber } from "@sr/utils";
import { CardBox, CardText } from "../Card";
import { Show } from "../Show";

export function ContactsWidget({ cardBox, data }: ContactsWidgetProps) {
  const contacts = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <Animated
      variant="container"
      className={
        cardBox
          ? "grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4 w-full"
          : "grid grid-cols-[max-content,1fr] gap-x-5"
      }
    >
      {contacts.map((item, index) => {
        const fields = [
          { label: "description", value: item.description },
          {
            label: "phone",
            value: item.phone ? formatPhoneNumber(item.phone) : "---",
          },
          { label: "email", value: item.email },
        ];

        return (
          <>
            <Show hidden={!cardBox}>
              <Animated
                key={index}
                variant="itemScale"
                isChild
                className="flex items-center border-0 rounded-xl bg-neutral-100 text-left group transition-all duration-300"
              >
                <CardBox key={item.id || index}>
                  {fields.map((field, fIdx) => (
                    <CardText
                      key={`${index}-${fIdx}`}
                      label={field.label}
                      value={field.value}
                      isBox
                      noAnimate
                    />
                  ))}
                </CardBox>
              </Animated>
            </Show>

            <Show hidden={cardBox} isSimple>
              {fields.map((field, fIdx) => (
                <CardText
                  key={`${index}-${fIdx}`}
                  label={field.label}
                  value={field.value}
                  variant="itemLeft"
                  isChild
                />
              ))}
            </Show>
          </>
        );
      })}
    </Animated>
  );
}
