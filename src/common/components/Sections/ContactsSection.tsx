import { Box } from "@mui/material";
import { ContactsProps } from "@sr/common/types";
import { formatPhoneNumber } from "@sr/utils";
import { GridBox, GridText } from "../Grids";

export function ContactsSection({ label, data }: ContactsProps) {
  const contacts = data?.contact
    ? Array.isArray(data.contact)
      ? data.contact
      : [data.contact]
    : [];

  return (
    <Box className="flex flex-row flex-wrap gap-5 mt-4 w-full">
      {contacts.map((item, index) => (
        <GridBox key={item.id || index}>
          <GridText label={label.description} value={item.description} isBox />
          <GridText
            label={label.phone}
            value={item.phone && formatPhoneNumber(item.phone)}
            isBox
          />
          <GridText label={label.email} value={item.email} isBox />
        </GridBox>
      ))}
    </Box>
  );
}
