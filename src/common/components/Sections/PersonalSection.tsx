import { PersonalProps } from "@sr/common/types";
import { formatDate, formatIdentity } from "@sr/utils";
import { GridText } from "../Grids";

export function PersonalSection({ label, data }: PersonalProps) {
  return (
    <>
      <GridText label={label.name} value={data?.name} />
      <GridText
        label={label.birthDate}
        value={data?.birthDate && formatDate(data?.birthDate)}
      />
      <GridText
        label={label.code}
        value={data?.code && formatIdentity(data?.code)}
      />
    </>
  );
}
