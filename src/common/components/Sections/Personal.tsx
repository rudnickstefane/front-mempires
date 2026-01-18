import { PersonalProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion/Animated";
import { formatDate, formatIdentity } from "@sr/utils";
import { GridText } from "../Grids";

export function Personal({ label, data }: PersonalProps) {
  const fields = [
    { label: label.code, value: data?.code && formatIdentity(data?.code) },
    { label: label.name, value: data?.name },
    {
      label: label.birthDate,
      value: data?.birthDate && formatDate(data?.birthDate),
    },
    {
      label: label.identity,
      value: data?.identity,
      description: "(CNH, RG ou RNE)",
    },
    { label: label.gender, value: data?.gender },
  ];

  return (
    <Animated
      variant="container"
      className="grid grid-cols-[max-content,1fr] gap-x-10"
    >
      {fields.map((field, index) => (
        <GridText
          key={field.label || index}
          label={field.label}
          value={field.value}
          description={field.description}
          variant="itemLeft"
          isChild
        />
      ))}
    </Animated>
  );
}
