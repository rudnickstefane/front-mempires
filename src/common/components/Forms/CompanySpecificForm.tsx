/* eslint-disable @typescript-eslint/no-explicit-any */
import { listEntity, listSegment } from "@sr/common/constants";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { formatText } from "@sr/utils";

interface SpecificFieldsProps {
  type: "partner" | "brand" | "establishment" | "client" | "affiliate";
  setFieldValue: (field: string, value: any) => void;
}

export function CompanySpecificFields({
  type,
  setFieldValue,
}: SpecificFieldsProps) {
  const isPartner = type === "partner";
  const isBrand = type === "brand" || type === "establishment";
  const isClientOrAffiliate = type === "client" || type === "affiliate";

  if (isBrand) {
    return (
      <TextField
        name="name"
        label="company.name"
        fullWidth
        information="Personalize o nome da bandeira como desejar! Se não preencher, não se preocupe: utilizaremos o nome fantasia."
        onChange={(e) => setFieldValue("name", formatText(e.target.value))}
      />
    );
  }

  return (
    <>
      {(isPartner || isClientOrAffiliate) && (
        <TextField
          required
          name="segment"
          label="segment"
          fullWidth
          options={listSegment.segments}
        />
      )}

      {isPartner && (
        <>
          <TextField
            required
            name="entity"
            label="entity"
            fullWidth
            options={listEntity.entities}
          />

          <TextField
            required
            fullWidth
            name="details.abbreviation"
            label="abbreviation"
            maxLength={20}
          />
        </>
      )}

      {(isPartner || isClientOrAffiliate) && (
        <>
          <TextField
            required
            datePicker
            name="details.effectiveStart"
            label="Início da vigência"
            onChangeDate={(newDate) =>
              setFieldValue("details.effectiveStart", newDate)
            }
          />

          <TextField
            required
            datePicker
            name="details.effectiveEnd"
            label="Fim da vigência"
            onChangeDate={(newDate) =>
              setFieldValue("details.effectiveEnd", newDate)
            }
          />
        </>
      )}

      {isPartner && (
        <>
          <TextField
            required
            name="fee"
            placeholder="0.00"
            label="Taxa administrativa (%)"
            mask="0.00"
            fullWidth
          />

          <TextField
            required
            name="rewardsRate"
            placeholder="0.00"
            label="Taxa de rewards (%)"
            mask="0.00"
            fullWidth
          />
        </>
      )}
    </>
  );
}
