import { AddressProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { formatZipCode } from "@sr/utils";
import { GridText } from "../Grids";

export function Address({ label, data }: AddressProps) {
  const fields = [
    {
      label: label.zipCode,
      value: data.address?.zipCode && formatZipCode(data.address?.zipCode),
    },
    {
      label: label.address,
      value: data.address?.address,
    },
    {
      label: label.number,
      value: data.address?.number,
    },
    { label: label.complement, value: data.address?.complement },
    { label: label.district, value: data.address?.district },
    { label: label.city, value: data.address?.city },
    { label: label.state, value: data.address?.state },
  ];

  return (
    <Animated
      variant="container"
      className="grid grid-cols-[max-content,1fr] gap-x-5"
    >
      {fields.map((field, index) => (
        <GridText
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
