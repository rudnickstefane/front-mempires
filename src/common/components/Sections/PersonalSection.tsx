import { Box } from "@mui/material";
import { PersonalProps } from "@sr/common/types";
import { formatDate, formatIdentity } from "@sr/utils";
import { GridText } from "../Grids";

export function PersonalSection({ label, data }: PersonalProps) {
  return (
    <Box className="grid grid-cols-[max-content,1fr] gap-x-5">
      <GridText
        label={label.code}
        value={data?.code && formatIdentity(data?.code)}
      />
      <GridText label={label.name} value={data?.name} />
      <GridText
        label={label.birthDate}
        value={data?.birthDate && formatDate(data?.birthDate)}
      />
      <GridText
        label={label.identity}
        value={data?.identity}
        description="(CNH, RG ou RNE)"
      />
      <GridText label={label.gender} value={data?.gender} />
    </Box>
  );
}
