import { AddressProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { formatZipCode } from "@sr/utils";
import { CardText } from "../Card";

export function AddressWidget({ ...props }: AddressProps) {
  const fields = [
    {
      label: "zipCode",
      value: props?.zipCode && formatZipCode(props?.zipCode),
    },
    {
      label: "address",
      value: props?.address,
    },
    {
      label: "number",
      value: props?.number,
    },
    { label: "complement", value: props?.complement },
    { label: "district", value: props?.district },
    { label: "city", value: props?.city },
    { label: "state", value: props?.state },
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
