import { Box } from "@mui/material";
import { ContactsProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { formatPhoneNumber } from "@sr/utils";
import { GridBox, GridText } from "../Grids";

export function Contacts({ label, data }: ContactsProps) {
  const contacts = data?.contact
    ? Array.isArray(data.contact)
      ? data.contact
      : [data.contact]
    : [];

  return (
    <Box className="flex flex-row flex-wrap gap-5 mt-4 w-full">
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
          <Animated variant="itemScale" isChild>
            <GridBox key={item.id || index}>
              {fields.map((field, fIdx) => (
                <GridText
                  key={fIdx}
                  label={field.label}
                  value={field.value}
                  isBox
                  noAnimate
                />
              ))}
            </GridBox>
          </Animated>
        );
      })}
    </Box>
  );
}
