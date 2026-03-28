import { Box } from "@mui/material";
import { listContactType } from "@sr/common/constants";
import { Button } from "@sr/common/iu/components/Button";
import { Typography } from "@sr/common/iu/components/Typography";
import { ContactItemProps } from "@sr/common/types";
import { CallCalling, DirectboxNotif, Edit, Trash } from "iconsax-react";
import { Show } from "../Show";

export const ContactItem = ({
  contact,
  isEditing,
  onEdit,
  onRemove,
}: ContactItemProps) => {
  const typeLabel =
    listContactType.types.find((t) => t.value === contact.type)?.label ||
    contact.type;

  return (
    <Box
      className={`flex flex-row justify-between p-4 rounded-lg w-full transition-all ${isEditing ? "bg-primary-50 ring-1 ring-primary-200" : "bg-neutral-100"}`}
    >
      <Box>
        <Typography
          className="text-lg font-bold text-neutral-900"
          translateId={contact.description}
        />
        <Box className="flex flex-col gap-3">
          <Typography
            className="text-sm text-gray-600"
            translateId={`Tipo: ${typeLabel}`}
          />
          <Box className="flex flex-col gap-2">
            <Show hidden={!contact.phone}>
              <Box className="flex flex-row gap-2">
                <CallCalling size={20} variant="Linear" />
                <Typography
                  className="text-sm text-gray-600"
                  translateId={contact.phone}
                />
              </Box>
            </Show>
            <Box className="flex flex-row gap-2">
              <DirectboxNotif size={20} variant="Linear" />
              <Typography
                className="text-sm text-gray-600"
                translateId={contact.email}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="flex gap-1 h-fit">
        <Button
          className="min-w-8 h-8 text-neutral-900 p-0 hover:bg-neutral-200 rounded-lg"
          onClick={onEdit}
        >
          <Edit size={22} variant={isEditing ? "Bold" : "Linear"} />
        </Button>
        <Button
          disabled={isEditing}
          className={`min-w-8 h-8 p-0 rounded-lg transition-all ${
            isEditing
              ? "text-neutral-400 opacity-50 cursor-not-allowed"
              : "text-neutral-900 hover:bg-neutral-200"
          }`}
          onClick={onRemove}
        >
          <Trash size={22} variant="Linear" />
        </Button>
      </Box>
    </Box>
  );
};
