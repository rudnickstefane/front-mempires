import { AddressDataProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { formatZipCode } from "@sr/utils";
import { CardText } from "../../../../../common/components/Card";

export function Address({ data }: AddressDataProps) {
  const fields = [
    {
      label: "zipCode",
      value: data.address?.zipCode && formatZipCode(data.address?.zipCode),
    },
    {
      label: "address",
      value: data.address?.address,
    },
    {
      label: "number",
      value: data.address?.number,
    },
    { label: "complement", value: data.address?.complement },
    { label: "district", value: data.address?.district },
    { label: "city", value: data.address?.city },
    { label: "state", value: data.address?.state },
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
          variant="itemLeft"
          isChild
        />
      ))}
    </Animated>
  );
}
