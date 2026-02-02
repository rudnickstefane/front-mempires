import { PersonalProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion/Animated";
import {
  formatDate,
  formatDocument,
  formatGender,
  formatIdentity,
} from "@sr/utils";
import { CardText } from "../../../../../common/components/Card";

export function Personal({ data }: PersonalProps) {
  const fields = [
    { label: "personal.code", value: data?.code && formatIdentity(data?.code) },
    { label: "name", value: data?.name },
    {
      label: "birthDate",
      value: data?.birthDate && formatDate(data?.birthDate),
    },
    {
      label: "identity",
      value: data?.identity && formatDocument(data?.identity),
      description: "(RG, CIN, CNH ou RNE)",
    },
    { label: "gender", value: data?.gender && formatGender(data?.gender) },
  ];

  return (
    <Animated
      variant="container"
      className="grid grid-cols-[max-content,1fr] gap-x-5"
    >
      {fields.map((field, index) => (
        <CardText
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
