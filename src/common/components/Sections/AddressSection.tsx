import { AddressProps } from "@sr/common/types";
import { formatZipCode } from "@sr/utils";
import { GridText } from "../Grids";

export function AddressSection({ label, data }: AddressProps) {
  return (
    <>
      <GridText
        label={label.zipCode}
        value={data.address?.zipCode && formatZipCode(data.address?.zipCode)}
      />
      <GridText label={label.address} value={data.address?.address} />
      <GridText label={label.number} value={data.address?.number} />
      <GridText label={label.complement} value={data.address?.complement} />
      <GridText label={label.district} value={data.address?.district} />
      <GridText label={label.city} value={data.address?.city} />
      <GridText label={label.state} value={data.address?.state} />
    </>
  );
}
