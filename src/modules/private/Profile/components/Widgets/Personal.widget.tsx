import { Animated } from "@sr/common/ui/motion/Animated";
import {
  formatDate,
  formatDocument,
  formatGender,
  formatIdentity,
} from "@sr/utils";
import { CardText } from "../../../../../common/components/Card";
import { ProfileWidgetProps } from "../../types";

export function PersonalWidget({ data }: ProfileWidgetProps) {
  const fields = [
    {
      label: "personal.code",
      value: data?.profile?.code && formatIdentity(data?.profile?.code),
    },
    { label: "name", value: data?.profile?.name },
    {
      label: "birthDate",
      value: data?.profile?.birthDate && formatDate(data?.profile?.birthDate),
    },
    {
      label: "identity",
      value: data?.profile?.identity && formatDocument(data?.profile?.identity),
      description: "(RG, CIN, CNH ou RNE)",
    },
    {
      label: "gender",
      value: data?.profile?.gender && formatGender(data?.profile?.gender),
    },
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
