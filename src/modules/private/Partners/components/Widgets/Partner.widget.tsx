import { listEntity } from "@sr/common/constants";
import { listSegment } from "@sr/common/constants/ListSegment.const";
import { Animated } from "@sr/common/ui/motion/Animated";
import { formatDate } from "@sr/utils";
import { CardText } from "../../../../../common/components/Card";
import { PartnerProps } from "../../types";

export function PartnerWidget({
  segment,
  entity,
  details,
  fee,
  rewardsRate,
}: PartnerProps) {
  const fields = [
    {
      label: "segment",
      value: listSegment.segments.find((item) => item.value === segment)?.label,
    },
    {
      label: "entity",
      value: listEntity.entities.find((item) => item.value === entity)?.label,
    },
    { label: "abbreviation", value: details.abbreviation },
    {
      label: "effectiveStart",
      value: details?.effectiveStart && formatDate(details?.effectiveStart),
    },
    {
      label: "effectiveEnd",
      value: details?.effectiveEnd && formatDate(details?.effectiveEnd),
    },
    {
      label: "partner.fee",
      value: `${Number(fee).toFixed(2)}%`,
    },
    {
      label: "partner.rewardsRate",
      value: `${Number(rewardsRate).toFixed(2)}%`,
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
          variant="itemLeft"
          isChild
        />
      ))}
    </Animated>
  );
}
