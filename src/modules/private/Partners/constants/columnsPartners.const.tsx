/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomizedSwitch } from "@sr/common/components/Switch";
import { entityBadges, segmentBadges } from "@sr/common/constants";
import { Typography } from "@sr/common/iu/components/Typography";
import { FormatCode } from "@sr/modules/common/utils/FormatCodeAndIdentity.util";
import { createColumnHelper } from "@tanstack/react-table";
import { PartnerProps } from "../types";
import { PartnerActions } from "./actionsTablePartners.const";

const columnHelper = createColumnHelper<PartnerProps>();

export const columnsPartners = (
  onToggleStatus: (code: string, name: string, isActive: boolean) => void,
  onEdit: (partner: any) => void,
  onDelete: (code: string, name: string) => void,
) => [
  columnHelper.accessor("details.status", {
    header: () => <Typography className="text-sm font-bold">Ativo</Typography>,
    cell: (info) => {
      const status = info.getValue();
      const isActive = status === "ACTIVE";
      const { partnerCode, company } = info.row.original;

      return (
        <CustomizedSwitch
          isTable
          checked={isActive}
          onChange={() => {
            onToggleStatus(partnerCode || "", company.fantasyName, isActive);
          }}
        />
      );
    },
  }),
  columnHelper.accessor("company.fantasyName", {
    header: () => (
      <Typography className="text-sm font-bold">Nome fantasia</Typography>
    ),
    cell: (info) => (
      <Typography className="text-sm">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("company.code", {
    header: () => <Typography className="text-sm font-bold">CNPJ</Typography>,
    cell: (info) => (
      <Typography className="text-sm">
        {info.getValue() ? FormatCode(info.getValue()) : "-"}
      </Typography>
    ),
  }),
  columnHelper.accessor("storeCount", {
    header: () => <Typography className="text-sm font-bold">Lojas</Typography>,
    cell: (info) => (
      <Typography className="text-sm">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("segment", {
    header: () => (
      <Typography className="text-sm font-bold">Segmento</Typography>
    ),
    cell: (info) => {
      const val = info.getValue() as string;
      const config = segmentBadges[val] || { label: val };

      return (
        <Typography
          className="px-3 py-1 rounded-full bg-gray-100 text-xs inline-block text-center"
          translateId={config.label}
        />
      );
    },
  }),
  columnHelper.accessor("entity", {
    header: () => (
      <Typography className="text-sm font-bold">Organização</Typography>
    ),
    cell: (info) => {
      const val = info.getValue() as string;
      const config = entityBadges[val] || {
        label: val,
      };

      return (
        <Typography
          className="px-3 py-1 rounded-full bg-gray-100 text-xs inline-block text-center"
          translateId={config.label}
        />
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => (
      <PartnerActions
        partner={info.row.original}
        onEdit={() => onEdit(info.row.original)}
        onDelete={() =>
          onDelete(
            info.row.original.partnerCode || "",
            info.row.original.company.fantasyName,
          )
        }
      />
    ),
  }),
];
