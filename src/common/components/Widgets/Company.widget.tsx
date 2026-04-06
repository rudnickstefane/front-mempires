import { Animated } from "@sr/common/ui/motion/Animated";
import { FormatCode } from "@sr/modules/common/utils/FormatCodeAndIdentity.util";
import { formatText } from "@sr/utils";
import { PartnerProps } from "../../../modules/private/Partners/types";
import { CardText } from "../Card";

export function CompanyWidget({ company }: PartnerProps) {
  const fields = [
    {
      label: "company.businessName",
      value: formatText(company.businessName),
    },
    {
      label: "company.fantasyName",
      value: formatText(company.fantasyName),
    },
    {
      label: "company.code",
      value: FormatCode(company.code),
    },
    {
      label: "company.stateRegistration",
      value: company.stateRegistration,
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
